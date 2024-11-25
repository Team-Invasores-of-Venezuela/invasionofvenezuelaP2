/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: '#11212D',       // fondo
      secondary: '#253745',     // segunda capa
      midSecondary: '#4A5C6A',  // intermedio entre secundario y terciario
      tertiary: '#9BA8AB',      // botones o cosas a destacar
      white: '#CCD0CF'          // texto

    },
  },
  plugins: [],
}

