// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        outDir: "build",
        lib: {
            entry: path.resolve(__dirname, 'src/fixar.mjs'),
            name: 'FIXAR',
            fileName: (format) => `fixar.${format}.js`
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            //   external: ['vue'],
            //   output: {
            //     // Provide global variables to use in the UMD build
            //     // for externalized deps
            //     globals: {
            //       vue: 'Vue'
            //     }
            //   }
        }
    }
})