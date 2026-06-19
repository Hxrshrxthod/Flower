/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFBF7',
        cream: '#FFF8EE',
        blush: '#FFE4E6',
        golden: '#FBBF24',
        terracotta: '#C46A4A',
        sage: '#84A98C',
        rose: '#BE185D',
        'rose-light': '#FBB6CE',
        'rose-mid': '#F472B6',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lora: ['Lora', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(196, 106, 74, 0.15)',
        'warm-md': '0 4px 20px rgba(196, 106, 74, 0.2)',
        'warm-lg': '0 8px 40px rgba(196, 106, 74, 0.25)',
        'warm-xl': '0 16px 60px rgba(196, 106, 74, 0.3)',
        'golden-glow': '0 0 30px rgba(251, 191, 36, 0.4)',
        'rose-glow': '0 0 40px rgba(190, 24, 93, 0.3)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        'firefly': {
          '0%, 100%': { opacity: '0.2', transform: 'translate(0, 0)' },
          '25%': { opacity: '1', transform: 'translate(10px, -15px)' },
          '50%': { opacity: '0.5', transform: 'translate(-8px, -25px)' },
          '75%': { opacity: '0.8', transform: 'translate(12px, -10px)' },
        },
        'bloom': {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '60%': { transform: 'scale(1.1) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'particle-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-80px) scale(0)', opacity: '0' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'petal-fall': 'petal-fall linear infinite',
        'firefly': 'firefly ease-in-out infinite',
        'bloom': 'bloom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'particle-rise': 'particle-rise 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
