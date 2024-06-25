import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import restart from 'vite-plugin-restart'
import { resolve } from 'path'

export default defineConfig({
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../public/', // Path from "root" to static assets (files that are served as they are)
    server: {
        host: true, // Open to local network and display URL
    },
    build: {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/ex1.html'),
                ex2: resolve(__dirname, 'src/ex2/index.html'),
                ex3: resolve(__dirname, 'src/ex3/index.html'),
                ex4: resolve(__dirname, 'src/ex4/index.html'),
                ex5: resolve(__dirname, 'src/ex5/index.html'),
                ex6: resolve(__dirname, 'src/ex6/index.html'),
                ex7: resolve(__dirname, 'src/ex7/index.html'),
                ex8: resolve(__dirname, 'src/ex8/index.html'),
                ex9: resolve(__dirname, 'src/ex9/index.html'),
                ex10: resolve(__dirname, 'src/ex10/index.html'),
                ex11: resolve(__dirname, 'src/ex11/index.html'),
                ex12: resolve(__dirname, 'src/ex12/index.html'),
                ex13: resolve(__dirname, 'src/ex13/index.html'),
                ex14: resolve(__dirname, 'src/ex14/index.html'),
                ex15: resolve(__dirname, 'src/ex15/index.html'),
            }
        }
    },
    plugins: [
        restart({ restart: ['../public/**'] }), // Restart server on static file change
        glsl()
    ],
})
