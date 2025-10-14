/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/model/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
        fontFamily: {
       
        Dosis: ['"Dosis"', "sans-serif"], // ✅ Another custom font
        Manrope : ['"Manrope"', "sans-serif"], // ✅ Another custom font
      },
    },
  },
  plugins: [],
};
