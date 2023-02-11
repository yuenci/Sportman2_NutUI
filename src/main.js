import { createApp } from 'vue'
import App from './App.vue'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
const app = createApp(App)
app.use(NutUI)
app.mount('#app')
