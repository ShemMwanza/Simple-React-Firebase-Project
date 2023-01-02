/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#008080',
          light: '#339ea6'
        }
      }
    },
  },
  plugins: [],
}