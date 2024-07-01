// eslint.config.js
import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-config/flat'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({}),
  unocss,
)
