/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ipsur: {
          pink: {
            DEFAULT: '#E6007E',
            50: '#FDF2F8',
            100: '#FCE7F3',
            200: '#FBCFE8',
            500: '#E6007E',
            600: '#CF0071',
            700: '#AC005E',
            900: '#70003D',
          },
          navy: {
            DEFAULT: '#2E3092',
            50: '#F2F4FD',
            100: '#E2E6FA',
            200: '#C7CEF5',
            500: '#2E3092',
            600: '#242678',
            700: '#1C1D60',
            800: '#15164A',
            900: '#0E0F33',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
