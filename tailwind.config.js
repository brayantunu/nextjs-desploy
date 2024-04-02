/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  prefix: "",
  theme: {
    extend: {
     
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
