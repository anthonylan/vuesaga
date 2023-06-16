import { createApp } from 'vue'
import App from './App.vue'

declare global {
    interface Window {
      Stripe: any; 
    }
  }
  
const app = createApp(App)
app.mount('#app')
