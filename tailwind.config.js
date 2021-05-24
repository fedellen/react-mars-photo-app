module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.75rem",
        sm: "1.25rem",
        md: "4rem",
        lg: "7rem",
        xl: "9rem",
        "2xl": "12rem",
      },
    },
    extend: {
      colors: {
        ppjsLight: "#e6bb8f",
        ppjsOrange: "#f57f26",
        ppjsBlue: "#27A0F2",
        ppjsBG: "#051B36",
        ppjsDark: "#05101d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
