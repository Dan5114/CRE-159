import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/flyonui/dist/js/*.js',
    ],

    plugins: [
        forms,
        require('flyonui'),
        require("flyonui/plugin")
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    flyonui: {
        themes: [
          "light", // Default font family
          "dark", // Default font family
          "gourmet", // fontFamily: 'Rubik'
          "corporate", // fontFamily: 'Public Sans'
          "luxury", // fontFamily: 'Archivo'
          "soft" // fontFamily: 'Montserrat'
        ]
      }
  
};
