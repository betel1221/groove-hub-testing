/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // .jsx is already included
  ],
  theme: {
    extend: {
      colors: {
        accent: 'rgb(242,135,5)', // Now you can use bg-accent, text-accent, etc.
      },
    },
  },
  plugins: [],
}