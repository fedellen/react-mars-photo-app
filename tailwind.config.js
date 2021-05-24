module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
        dark: "#1d0b06",
        bg: "#3a1004",
        medium: "#581d0b",
        text: "#db6744",
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
