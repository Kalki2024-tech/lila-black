export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      colors: {
        bg: '#080c14',
        surface: '#0d1520',
        panel: '#111d2e',
        border: '#1e3a5f',
        accent: '#00d4ff',
        danger: '#ff3b5c',
        warn: '#ffb800',
        success: '#00ff9d',
        storm: '#a855f7',
        muted: '#4a6fa5',
      }
    },
  },
  plugins: [],
}
