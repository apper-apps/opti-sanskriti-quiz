/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#FF6B35",
        "saddle-brown": "#8B4513",
        gold: "#FFD700",
        cornsilk: "#FFF8DC",
        "floral-white": "#FFFAF0",
        success: "#228B22",
        warning: "#FF8C00",
        error: "#DC143C",
        info: "#4682B4",
      },
      fontFamily: {
        'vesper': ['Vesper Libre', 'serif'],
        'hind': ['Hind', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'diya-light': 'diya-light 0.5s ease-in-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
          },
          '50%': { 
            transform: 'scale(1.02)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
          }
        },
        'diya-light': {
          '0%': { opacity: '0.5', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '0.8', transform: 'scale(1)' }
        }
      },
    },
  },
  plugins: [],
}