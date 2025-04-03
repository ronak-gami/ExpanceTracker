import { Colors } from './src/utils/Colors';

/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: Colors,
//       boxShadow: {
//         'card': '0 2px 4px rgba(0, 0, 0, 0.05)',
//         'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
//       },
//     },
//   },
//   plugins: [],
// }

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: Colors,
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}