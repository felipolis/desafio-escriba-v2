import { createApp } from 'vue'

import './assets/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app
    .use(router)
    .mount('#app')

