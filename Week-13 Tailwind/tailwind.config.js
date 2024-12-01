/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          200: "#7F95AC",
          500: "#002B5B",
          600: "#18406B",
          700: "#002B5A",

        },
        green: {
          400: "#36c6c0",
        }
      },
      fontFamily: {
        inter: "Inter",
        nunito: "Nunito Sans"
      }
    },
  },
  plugins: [],
}