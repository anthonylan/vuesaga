<script setup lang="ts">
import { onMounted, type PropType } from 'vue'
import { apiRequest } from '../utils'


const emit: any = defineEmits(['tap', 'verify'])
const props = defineProps({
    pk: String,
    options: {
        type: Object as PropType<{
            currency?: string;
            amount?: number;
            r_url?: string;
            server_url?: string
        }>,
        default: () => ({}),
    }
})

const options = {
    ...{ currency: 'usd', amount: 1000, server_url: 'https://example.com/create-intent',
     r_url: 'https://example.com/order/123/complete' }, ...props.options
}

const readyCheckout = () => {
    const stripe = window.Stripe(props.pk)
    const elements = stripe.elements({
         mode: 'payment', ...{currency: options.currency, amount: options.amount} 
    })

    const expressCheckoutElement = elements.create('expressCheckout');
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

        const { secret }  = await apiRequest(options.server_url, { options }, emit)

        try {
            const data = await stripe.confirmPayment({
                elements, secret, confirmParams: { return_url: options.r_url },
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

<style>

.vuefintegrate{
    padding: 5px;
}

</style>