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
        fade: "fade 1.5s infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
