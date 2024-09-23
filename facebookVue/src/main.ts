import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    // something vue-i18n options here ...
})

createApp(App).use(i18n).use(router).mount('#app')

