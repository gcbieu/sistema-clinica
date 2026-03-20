import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Certifique-se que a pasta router existe

const app = createApp(App)
app.use(router)
app.mount('#app')