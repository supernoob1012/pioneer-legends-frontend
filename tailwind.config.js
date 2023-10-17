/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Saira", "sans serif"],
        secondary: ["Russo One"],
      },
    },
    colors: {
      primary: {
        100: "#FFD15F",
        200: "#E1E4CD",
      },
      secondary: {
        100: "#E2FA6E",
        200: "#865321",
      },
      white: "#fff",
    },
    boxShadow: {
      btn: "4px 4px 0px 0px #1E1915",
      card: "6px 6px 0 #1E1915",
    },
  },
  plugins: [],
};
