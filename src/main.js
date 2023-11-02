import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
let app = createApp(App)
// app.config.globalProperties.token = "default"
const globalData = {
  token: 'default',
};
app.provide('globalData', globalData);
app.use(router).mount('#app')