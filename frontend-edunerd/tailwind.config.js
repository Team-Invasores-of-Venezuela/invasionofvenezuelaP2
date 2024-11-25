/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/*/.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados
        primary: '#11212D',       // fondo
        secondary: '#253745',     // segunda capa
        midSecondary: '#4A5C6A',  // intermedio entre secundario y terciario
        tertiary: '#9BA8AB',      // botones o cosas a destacar
        white: '#CCD0CF',         // texto

        // Colores adicionales para el modo claro
        claro: '#F2F2F2',
        azulClaro: '#A2BDF2',
        celeste: '#5086F2',
        azul: '#040240',
      },
    },
  },
  plugins: [],
}
