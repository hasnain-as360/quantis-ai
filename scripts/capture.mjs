// Spins up a dedicated Vite server, records the chrome-less `?record=1`
// export view with a real (headless) browser, and saves the raw capture.
// Run `npm run export-video` to also encode it straight to MP4.
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOTAL_DURATION as TD_PROBLEM_SOLUTION } from '../src/data/beats.js'
import { TOTAL_DURATION as TD_CHAOS_LAUNCH } from '../src/reel2/beats.js'
import { TOTAL_DURATION as TD_EXPLAINER } from '../src/reel3/beats.js'

// Kept as a plain lookup (not the JSX-importing src/reels.js registry) so
// this stays a vanilla Node script — no JSX transform available here.
const REELS = {
  'precision-explainer': { duration: TD_EXPLAINER, width: 1920, height: 1080 },
  'chaos-to-launch': { duration: TD_CHAOS_LAUNCH, width: 1080, height: 1920 },
  'problem-solution': { duration: TD_PROBLEM_SOLUTION, width: 1080, height: 1920 },
}
const REEL = process.argv.find((a) => a.startsWith('--reel='))?.split('=')[1] || 'precision-explainer'
const reelInfo = REELS[REEL]
if (!reelInfo) {
  console.error(`Unknown --reel="${REEL}". Known reels: ${Object.keys(REELS).join(', ')}`)
  process.exit(1)
}
const TOTAL_DURATION = reelInfo.duration

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const PORT = 5183 // dedicated port so this never collides with `npm run dev`
const URL = `http://localhost:${PORT}/?record=1&reel=${REEL}`
const WIDTH = reelInfo.width
const HEIGHT = reelInfo.height
const OUT_DIR = path.join(root, 'capture')
const RAW_DIR = path.join(OUT_DIR, '_raw')

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url)
        if (res.status < 500) return resolve()
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) return reject(new Error(`Dev server never came up on ${url}`))
      setTimeout(tick, 300)
    }
    tick()
  })
}

// `child.kill()` on Windows only signals the `cmd.exe` wrapper created by
// `shell: true`, not the actual vite/node process it launched underneath —
// the real server survives and keeps the port bound for the next run. Kill
// the whole process tree explicitly on win32; plain kill is fine elsewhere.
function killTree(child) {
  if (process.platform === 'win32' && child.pid) {
    spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' })
  } else {
    child.kill()
  }
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true })

  console.log(`Starting a dedicated Vite server on port ${PORT}...`)
  const vite = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'ignore', 'inherit'],
    shell: true,
  })

  try {
    await waitForServer(`http://localhost:${PORT}`)

    // Headless Chrome throttles timers (setTimeout/rAF) on pages it
    // considers backgrounded/occluded to save power — and our whole beat
    // sequencer is setTimeout-driven, so under that throttling every beat
    // fires late and the capture runs far longer than its real 12s. These
    // three flags are the standard fix for automation contexts.
    const browser = await chromium.launch({
      args: [
        '--no-sandbox',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
      ],
    })

    // Vite transforms/optimizes its whole dependency graph (react,
    // framer-motion, lucide-react...) lazily on first request, which can
    // take several seconds — and recordVideo starts capturing the instant
    // the context is created, so that cold-compile tax would otherwise land
    // inside the recorded file as dead air. Burn it here first, on a
    // throwaway page with no recording attached; Vite's transform cache is
    // keyed to the server process, so the real navigation right after this
    // reuses it and starts fast.
    console.log('Warming the dev server (first-request compile)...')
    const warmupPage = await browser.newPage()
    await warmupPage.goto(URL, { waitUntil: 'load' })
    await warmupPage.waitForSelector('[data-reel-status]', { timeout: 30000 })
    await warmupPage.close()

    console.log(`Recording ${URL} at ${WIDTH}x${HEIGHT}...`)
    const t0 = Date.now()
    const context = await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      recordVideo: { dir: RAW_DIR, size: { width: WIDTH, height: HEIGHT } },
    })
    const page = await context.newPage()

    const errors = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })

    await page.goto(URL, { waitUntil: 'load' })
    console.log(`  loaded in ${Date.now() - t0}ms`)
    // Wait for the app's own "sequence finished" signal rather than a
    // guessed wall-clock delay — robust against cold-start/compile jitter.
    // Timeout scales with the reel's own content length (plus generous
    // headroom for capture overhead) rather than a flat 30s, which a long
    // reel like this one's 39s could exceed outright.
    await page.waitForSelector('[data-reel-status="done"]', { timeout: TOTAL_DURATION * 2 + 20000 })
    const actualSequenceMs = Date.now() - t0
    const overshoot = actualSequenceMs - TOTAL_DURATION
    console.log(
      `  sequence finished in ${actualSequenceMs}ms of wall clock (content is ${TOTAL_DURATION}ms` +
        (overshoot > 150
          ? `; +${overshoot}ms of recording overhead — encode.mjs will retime this back to spec)`
          : ')'),
    )
    const settleMs = 400
    await page.waitForTimeout(settleMs) // let the final held frame fully settle

    const video = page.video()
    await context.close()
    await browser.close()

    if (errors.length) {
      console.warn('Console/page errors during capture:\n' + errors.join('\n'))
    }

    const rawPath = await video.path()
    const finalRaw = path.join(OUT_DIR, `reel-${REEL}.raw.webm`)
    await rename(rawPath, finalRaw)
    await rm(RAW_DIR, { recursive: true, force: true })

    // Screencasting the page competes with the page's own main thread for
    // CPU, which measurably slows the (setTimeout-driven) beat sequencer
    // during capture — the content is correct, but wall-clock recording
    // time runs long. Record the intended vs. actual timing here so
    // encode.mjs can retime the clip back to the real 12s-ish spec instead
    // of shipping a correctly-composed but slow-motion video.
    await writeFile(
      path.join(OUT_DIR, `meta-${REEL}.json`),
      JSON.stringify({ targetMs: TOTAL_DURATION + settleMs, actualMs: actualSequenceMs + settleMs }, null, 2),
    )

    console.log('\nRaw capture saved to', finalRaw)
    console.log(`Next: npm run encode -- --reel=${REEL}  (or \`npm run export-video -- --reel=${REEL}\` next time to do both)`)
  } finally {
    killTree(vite)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
