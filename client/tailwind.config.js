/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "share-tech": ['"Share Tech Mono"', "monospace"],
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-0.5rem)" },
        },
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
      },
    },
  },
  plugins: [],
};
