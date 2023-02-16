/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // add daisyUI plugin
  plugins: [require("daisyui"), require("@tailwindcss/typography")],

  // daisyUI config (optional)
  daisyui: {
    styled: false,
    themes: ["fantasy", "forest"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
