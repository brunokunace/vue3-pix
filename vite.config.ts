import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const targetMode = process.env.TARGET_MODE || 'lib'
const configApp = defineConfig({
  plugins: [vue()]
})
const configLib = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/public/lib.ts'),
      name: 'VuePix'
    },
    rollupOptions: {
      external: ['vue', 'polycrc', 'qrcode'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
export default targetMode === 'lib' ? configLib : configApp

