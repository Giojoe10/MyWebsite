/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Fira Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#0c1a1d",
        },
        primary: {
          DEFAULT: "#2ba5ff",
          100: "#e3f3ff",
          200: "#aadbff",
          300: "#71c3ff",
          400: "#39abff",
          500: "#0093ff",
          600: "#0072c6",
          700: "#00528e",
          800: "#003155",
          900: "#00101c",
        },
        secondary: {
          DEFAULT: "#0B7503",
          100: "#e5fee3",
          200: "#b2fdac",
          300: "#7efb75",
          400: "#4bfa3e",
          500: "#17f906",
          600: "#12c105",
          700: "#0d8a04",
          800: "#085302",
          900: "#031c01",
        },
        accent: {
          DEFAULT: "#a5935e",
          100: "#f5f3ed",
          200: "#e1dac8",
          300: "#ccc2a4",
          400: "#b8aa80",
          500: "#a4915b",
          600: "#7f7147",
          700: "#5b5133",
          800: "#36301e",
          900: "#12100a",
        },
      },
    },
  },
  plugins: [],
};
