module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Bai Jamjuree", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
