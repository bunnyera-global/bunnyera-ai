/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bunny: {
          blue: '#1A9FFF',
          orange: '#FF6A3D',
          dark: '#0B1020',
          light: '#E6F1FF',
          darker: '#060912', // Darker shade for sidebars etc
          card: '#111827',   // Slightly lighter background for cards
        }
      },
      fontFamily: {
        sans: ['Inter', 'Source Sans Pro', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
