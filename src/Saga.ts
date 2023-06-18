import type { App } from 'vue'
import { StripeElement, StripeCheckout } from './components'

export default {
    install: (app: App, options: Object = {}) => {
        app.component('StripeElement', StripeElement)
        app.component('StripeCheckout', StripeCheckout)
    }
}


export { StripeElement, StripeCheckout }