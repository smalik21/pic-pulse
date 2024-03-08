/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'heroSection': "url('./src/assets/wallpaper-blue.svg')"
            },
            fontFamily: {
                'body': ['Inter', 'sans-serif'],
                'title': ['Jockey One', 'sans-serif'],
                'search': ['Julius Sans One', 'sans-serif'],
            },
            colors: {
                'light': '#E3E3E3',
                'gray-1': '#CFCFCF',
                'gray-2': '#9A9A9A',
                'dark': '#1C1C1C',
            }
        },
    },
    plugins: [],
}

