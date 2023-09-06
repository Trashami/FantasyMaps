import { defineConfig } from 'vite';
import Unocss from 'unocss/vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Components from 'unplugin-vue-components/vite';
import ViteFonts from 'vite-plugin-fonts';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    server: {
        port: 4000,
    },
    resolve: {
        alias: {
            '/@': path.resolve(__dirname, './src'),
            "@arcgis/core": path.resolve(__dirname, './node_modules/@arcgis/core')
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                'assets/@arcgis/core/assets': './node_modules/@arcgis/core/assets'
            }
        }
    },
    plugins: [
        vue(),
        svgLoader(),
        Components({
            extensions: ['vue'],
            dts: 'src/components.d.ts',
        }),
        ViteFonts({
            google: {
                families: ['Open Sans', 'Montserrat', 'Fira Sans'],
            },
        }),
        Unocss({ /* options */ }),
        VueI18n({
            include: [path.resolve(__dirname, './locales/**')],
        }),
        // Add the copy plugin configuration
    ],
    //copy rpg-awesome assets to ./dist/assets/rpg-awesome
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            '@vueuse/core',
        ],
        exclude: [
            'vue-demi',
        ],
    },
});
