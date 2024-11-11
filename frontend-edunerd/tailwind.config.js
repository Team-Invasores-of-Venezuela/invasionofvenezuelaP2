/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: '#F20505',    // Rojo brillante (botón)
      secondary: '#F27272',  // Fondo de la tarjeta de bienvenida (rosa fuerte)
      lightGray: '#F2F2F2',  // Fondo general
      mediumGray: '#8C8C8C', // Texto de estudiantes
      dark: '#0D0D0D',       // Títulos y texto oscuro
    },
  },
  plugins: [],
}

