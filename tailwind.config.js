/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: '',
  darkMode: ['class', 'html[class~="dark"]'],
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    './site_docs/**/*.{js,ts,jsx,tsx,md,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './theme.config.tsx',
    // Or if using `src` directory:
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
