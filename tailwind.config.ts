/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Asegúrate de que esta sección de colores esté aquí y sea correcta
      colors: {
        'lime-light': '#d9ed92',
        'teal-medium': '#52b69a',
        'teal-dark': '#184e77',
        'neon-cyan': '#72efdd',
      },
      borderRadius: {
        'custom': '1rem',
      },
      boxShadow: {
        'neon': '0 10px 15px -3px rgba(114, 239, 221, 0.2), 0 4px 6px -4px rgba(114, 239, 221, 0.2)',
      },
      keyframes: {
        // Animación para el efecto de tipeo (aumenta el ancho)
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        // Animación para el cursor parpadeante (cambia el color del borde)
        blinkingCursor: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#72efdd' }, // Usamos nuestro color neon-cyan
        }
      },
      animation: {
        'typewriter': 'typewriter 4s steps(40) 1s 1 normal both',
        'blinking-cursor': 'blinkingCursor 750ms steps(40) infinite normal',
      }
    },
  },
plugins: [
    require('@tailwindcss/typography'),
  ],
}