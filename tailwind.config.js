/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"]
      },
      spacing: {
        '128': '28rem',
        '100': '20rem'
      },
      height: {
        '128' : '28rem',
        '100': '20rem'
      }
    },
  },
  plugins: [],
}