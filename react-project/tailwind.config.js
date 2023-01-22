/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#008080',
          light: '#339ea6'
        },
        cream: {
          primary: '#FFFDD2'
        },
        crayola: {
          primary: '#FFC969'
        },
        orange: {
          primary: "#FFA503"
        },
        pink: {
          primary: "#db3448"
        }
      },
      animation: {
        'spin-slow': 'spin 2.5s linear infinite',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        adelia: ["ADELIA", "cursive"],
        sans: ['Proxima Nova,"sans-serif']
      },
    },
  },
  plugins: [],
}