/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "light": "#c4dfdf",
        "light-medium": "#d2e9e9",
        "light-high": "#e4f4f4",
        "off-white": "#f8f6f4",
        "dark-violet": '#17153B',
        "dark-violet2": '#2E236C',
        "light-violet": '#433D8B',
        "teal": '#C8ACD6',
      },
    },
    backgroundImage: {
      "spotlight": 'linear-gradient(90deg, #17153B, #433D8B)',
    },
  },
  plugins: [
    flowbite.plugin(),
    ({ addUtilities }) => {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};

