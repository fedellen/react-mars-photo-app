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
        bg: "#471515",
        dark: "#6e2727",
        medium: "#b33831",
        light: "#ea4f36",
        text: "#f57d4a",
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
