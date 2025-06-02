import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],

    // build: {
    //     // Increase the warning limit to avoid unnecessary warnings for large vendor packages
    //     chunkSizeWarningLimit: 1200, // Increased to accommodate jodit-react
        
    //     rollupOptions: {
    //         output: {
    //             // Better named chunks for easier debugging
    //             chunkFileNames: 'assets/js/[name]-[hash].js',
                
    //             // Optimize chunk splitting using a function for more flexibility
    //             manualChunks: (id) => {
    //                 // React and related libraries
    //                 if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
    //                     return 'vendor-react';
    //                 }
                    
    //                 // Inertia and related packages
    //                 if (id.includes('node_modules/@inertiajs')) {
    //                     return 'vendor-inertia';
    //                 }
                    
    //                 // UI libraries
    //                 if (id.includes('node_modules/@headlessui')) {
    //                     return 'vendor-ui';
    //                 }
                    
    //                 // // Editor (large)
    //                 if (id.includes('node_modules/jodit-react')) {
    //                     return 'vendor-jodit';
    //                 }
                    
    //                 // Spreadsheet (large)
    //                 if (id.includes('node_modules/xlsx')) {
    //                     return 'vendor-xlsx';
    //                 }
                    
    //                 // UI framework
    //                 if (id.includes('node_modules/flyonui')) {
    //                     return 'vendor-ui-framework';
    //                 }
                    
    //                 // Utility libraries
    //                 if (id.includes('node_modules/lodash')) {
    //                     return 'vendor-lodash';
    //                 }
                    
    //                 // Other utilities
    //                 if (id.includes('node_modules/dayjs') || id.includes('node_modules/notyf')) {
    //                     return 'vendor-utils';
    //                 }
                    
    //                 // All other node_modules go to vendors
    //                 if (id.includes('node_modules')) {
    //                     return 'vendors';
    //                 }
    //             }
    //         }
    //     }
    // }
});
