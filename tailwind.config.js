/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: '#FF5733',   // Set your primary color here
        textSecondary: '#33FF57', // Set your secondary color here
        backgroundPrimary: '#FAF5ED'
      },
    },
  },
  variants: {},
  plugins: [],
};

