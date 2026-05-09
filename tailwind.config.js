/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2C3531',
                secondary: '#116466',
                accent: '#D9B08C',
                'light-accent': '#FFCB9A',
                'soft-bg': '#D1E8E2',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            },
            backdropBlur: {
                'glass': '10px',
            },
        },
    },
    plugins: [],
}