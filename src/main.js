import { createApp } from 'vue'
import "./style.css";
import App from './App.vue'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import * as VueRouter from 'vue-router'
import MainPage from './components/MainPage.vue'
import LearningPage from './components/LearningPage.vue'
import DataPage from './components/DataPage.vue'
import InboxPage from './components/InboxPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import EnglishPod from './components/EnglishPod/EnglishPod.vue'
import '@nutui/icons-vue/dist/style_iconfont.css';




const routes = [
    { path: '/', component: MainPage },
    { path: '/words', component: MainPage },
    { path: '/main', component: MainPage },
    { path: '/:pathMatch(.*)*', component: MainPage },
    { path: '/learning/', component: LearningPage },
    { path: '/learning/:word', component: LearningPage },
    { path: '/data', component: DataPage },
    { path: '/inbox', component: InboxPage },
    { path: '/settings', component: SettingsPage },
    { path: '/englishpod', component: EnglishPod },
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
