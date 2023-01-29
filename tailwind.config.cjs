/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    
    fontFamily: {
      "display": "var(--display-font)",
      "body": "var(--body-font)",
    },
  },
  plugins: [],
};
