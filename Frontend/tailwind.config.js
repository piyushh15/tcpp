/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        madimi: ["Madimi One", 'sans-serif'],
        poppins:[ "Poppins", 'sans-serif'],
        briem:["Briem Hand",],
        jetbrains:["JetBrains Mono", "monospace"]
      },
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        "black-blur": "#4D4855",
        'custom-blue': 'rgb(6,5,19)',
        'custom-gray': 'rgba(100,99,110,1)',
        'custom-light-gray': 'rgba(174,172,207,1)',
        'custom-dark-gray': 'rgba(190,190,208,1)',
        'custom-white': 'rgba(231,240,242,1)',
        "iot-blue":"#0A73B7",

        "custom-green":"#D6FF7F",
        "custom-bluish":"#00B2CC",
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      '.no-scrollbar': {
        '-ms-overflow-style': 'none', /* Hide scrollbar for IE and Edge */
        'scrollbar-width': 'none', /* Hide scrollbar for Firefox */
      },
      '.no-scrollbar::-webkit-scrollbar': {
        display: 'none', /* Hide scrollbar for Chrome, Safari, and Opera */
      },
    });
  },],
}