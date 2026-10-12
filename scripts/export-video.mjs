// Runs capture then encode, forwarding argv (e.g. --reel=chaos-to-launch)
// to both. Exists mainly so `--reel=` doesn't have to survive an
// `npm run capture -- --reel=x && npm run encode -- --reel=x` chain, which
// is finicky to get right identically on both cmd.exe and POSIX shells.
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)

function run(script) {
  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, [path.join(__dirname, script), ...args], { stdio: 'inherit' })
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${script} exited with ${code}`))))
  })
}

await run('capture.mjs')
await run('encode.mjs')
