import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 默认京东 APP 10.0主题 > @import "@nutui/nutui/dist/styles/variables.scss";
        // 京东科技主题 > @import "@nutui/nutui/dist/styles/variables-jdt.scss";
        // 京东B商城主题 > @import "@nutui/nutui/dist/styles/variables-jdb.scss";
        // 京东企业业务主题 > @import "@nutui/nutui/dist/styles/variables-jddkh.scss";
        additionalData: `@nutui/nutui/dist/styles/variables-jdt.scss";`
      }
    }
  },
  server: {
    open: true,
    port: 5173,
    host: '0.0.0.0'
  },
})
