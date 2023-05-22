/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    maxWidth: {
      "1/4": "25%",
      "1/2": "300px",
      "3/4": "75%",
    },
  },
  plugins: [],
};
