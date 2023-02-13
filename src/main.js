import { createApp } from 'vue'
import "./style.css";
import App from './App.vue'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import * as VueRouter from 'vue-router'
import MainPage from './components/MainPage.vue'
import LearningPage from './components/LearningPage.vue'
import DataPage from './components/DataPage.vue'




const routes = [
    { path: '/', component: MainPage },
    { path: '/words', component: MainPage },
    { path: '/main', component: MainPage },
    { path: '/:pathMatch(.*)*', component: MainPage },
    { path: '/learning/', component: LearningPage },
    { path: '/learning/:word', component: LearningPage },
    { path: '/data', component: DataPage }
]


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(NutUI)
app.use(router)
// app.use(AudioRecorder)
app.mount('#app')
