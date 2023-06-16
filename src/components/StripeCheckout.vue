<script setup lang="ts">
import { onMounted } from 'vue'
import { apiRequest } from '../utils'


const emit: any = defineEmits(['tap', 'verify'])
const props = defineProps({
    pk: String,
    options: {
        type: Object,
        r_url: String,
        amount: Number,
        currency: String,
        server_url: String
    }
})

const options = {
    ...{ currency: 'usd', amount: 1000, server_url: 'https://example.com/create-intent',
     r_url: 'https://example.com/order/123/complete' }, ...props.options
}

const readyCheckout = () => {
    const stripe = window.Stripe(props.pk)
    const elements = stripe.elements({ mode: 'payment', ...options })

    const expressCheckoutElement = elements.create('expressCheckout', {
        type: 'expressCheckout'
    });
    expressCheckoutElement.mount('#express-checkout-element')

    const expressCheckoutDiv: any = document.getElementById('express-checkout-element')
    expressCheckoutDiv.style.visibility = 'hidden'

    expressCheckoutElement.on('ready', ({availablePaymentMethods}: any) => {
        if (availablePaymentMethods) {
            expressCheckoutDiv.style.visibility = 'initial'
        } 
    })

    expressCheckoutElement.on('confirm', async (event: any) => {
        const { error } = await elements.submit();
        if(error) return emit('verify', {chain: 'checkout element', error: true, data: error })

        const data  = await apiRequest(options.server_url, { options }, emit)
        const clientSecret = data['client_secret'] ?? 'xxx'        

        try {
            const data = await stripe.confirmPayment({
                elements, clientSecret, confirmParams: { return_url: options.r_url },
                redirect: "if_required"
            })
            emit('verify', {chain: 'intent confirmation', error: false, data: data })
        } catch (error) {
            emit('verify', {chain: 'intent confirmation', error: true, data: error })
        }
    })
}



onMounted(() => {
     readyCheckout()
})

</script>

<template>

    <div class="vuefintegrate">
        <div id="express-checkout-element"></div>
    </div>
</template>