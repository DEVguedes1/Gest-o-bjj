/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas integradas ao motor do Tailwind
        'bjj-red': '#D32F2F',
        'bjj-black': '#000000',
        'bjj-dark': '#0A0A0A',
        'bjj-gray': '#A0A0A0',
      },
      fontFamily: {
        // Garantindo que a fonte Inter seja a padrão
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}