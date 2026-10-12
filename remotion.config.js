import { Config } from '@remotion/cli/config'
import { enableTailwind } from '@remotion/tailwind-v4'

// Remotion bundles with its own webpack config, separate from Vite's — so
// Tailwind v4 (set up here via @tailwindcss/vite in vite.config.js) needs
// its own explicit hookup for Remotion renders, or src/index.css's
// `@import "tailwindcss"` silently produces no utility classes at all.
Config.overrideWebpackConfig((currentConfig) => {
  const withTailwind = enableTailwind(currentConfig)
  return {
    ...withTailwind,
    module: {
      ...withTailwind.module,
      rules: [
        // Every scene file was written for Vite/esbuild, which resolves
        // extensionless relative imports (`./Root`, `../reels`) without
        // complaint. Webpack, under this project's `"type": "module"`,
        // insists on fully-specified extensions instead and fails to
        // bundle otherwise — this rule turns that requirement off rather
        // than adding an explicit extension to every import across all
        // three reels.
        { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
        ...(withTailwind.module?.rules ?? []),
      ],
    },
  }
})

Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)
