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
      colors:{
        'bg-blue':'#f0f8ff',
        'lochmara': {
          '50': '#f0f8ff',
          '100': '#e0f0fe',
          '200': '#b9e1fe',
          '300': '#7cc9fd',
          '400': '#36affa',
          '500': '#0c95eb',
          '600': '#0077cc',
          '700': '#015da3',
          '800': '#064f86',
          '900': '#0b426f',
          '950': '#072a4a',
      },    
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
