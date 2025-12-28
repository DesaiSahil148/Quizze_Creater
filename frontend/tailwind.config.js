/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",   // Blue
        success: "#16A34A",   // Green
        danger: "#DC2626"     // Red
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
}
