const nextra = require('nextra')

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
})

module.exports = withNextra({
  // i18n: {
  //   locales: ['en', 'zh'],
  //   defaultLocale: 'en',
  // },
})
