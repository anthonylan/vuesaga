import { createApp } from 'vue'
import App from './App.vue'

// import 'ant-design-vue/dist/antd.css'

declare global {
    interface Window {
      Stripe: any; 
    }
  }
  
const app = createApp(App)
app.mount('#app')
