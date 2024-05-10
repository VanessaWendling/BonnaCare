/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      brown: {
        100: "#E7E0DA",
        200: "#d6ccc2",
        300: "#C6B8A9",
        400: "#B6A491",
        500: "#A59078",
        600: "#937C62",
        700: "#7A6752",
        800: "#625241",
        900: "#493E31",
      },
      pink: {
        100: "#F1EAE4",
        200: "#E3D5CA",
        300: "#D5BFAF",
        400: "#C7A994",
        500: "#B99479",
        600: "#AB7E5F",
        700: "#93694D",
        800: "#78563F",
        900: "#5E4331",
      },
    },
  },
  plugins: [],
};
