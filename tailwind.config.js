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
    screens: {
      'mobile': '390px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
    fontFamily: {
      home: ['PT Sans', 'monospace'],
    },
  },
  plugins: [],
}
