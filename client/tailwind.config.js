/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "share-tech": ['"Share Tech Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
