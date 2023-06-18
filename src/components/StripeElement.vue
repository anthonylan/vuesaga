<script setup lang="ts">
import {  onMounted, watch, type PropType } from 'vue'
import { apiRequest } from '../utils'

const props: any = defineProps({
    pk: String,
    tap: Number,
    options: {
        type: Object as PropType<{
            mode?: string;
            currency?: string;
            amount?: number;
            r_url?: string;
            server_url?: string;
            appearance?: {
                labels?: string;
                theme?: string;
            };
        }>,
        default: () => ({}),
    }
})


let stripe: any = {}
let elements: any = {}
const emit: any = defineEmits(['verify'])


const optionVal = {
    ...{ currency: 'usd', amount: 1000, server_url: 'https://example.com/create-intent',
     r_url: 'https://example.com/order/123/complete', mode: 'setup' }, ...props.options
} 


const mounting = () => {
    stripe = window.Stripe(props.pk);

    const options = {
        mode: props.options.mode ?? optionVal.mode,
        currency: props.options.currency ?? optionVal.currency,
        ...(props.options.mode == 'payment') && {amount: props.options.amount ?? optionVal.amount},
        appearance: {...{ theme: 'flat', labels: 'above'}, ...props.options.appearance}
    }

    elements = stripe.elements(options);
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element")    
}



const submit = async () => {
    const { error } = await elements.submit();
    if (error) {
       return emit('verify', {chain: 'form element', error: true, data: error })
    }
    confirmCard()
}



const validationParams = (clientSecret: string) => {
    return {
        elements, clientSecret, confirmParams: { return_url: optionVal.r_url },
        redirect: "if_required",
    }
}


const confirmCard = async () => {  
    const { secret } = await apiRequest(props.options.server_url, { options: optionVal }, emit)

    try {
        const data = optionVal.mode == 'setup' ? 
        await stripe.confirmSetup(
            validationParams(secret)
        ) : 
        await stripe.confirmPayment(
            validationParams(secret)
        )
        emit('verify', { chain: 'server intent', error: false, data: data })        
    } catch (error) {
        emit('verify', { chain: 'server intent', error: true, msg: error })
    }
}



watch(() => props.tap, () => {
    submit()
})

onMounted(() => {
    mounting()
})





</script>

<template>

  <div class="vuefintegrate">
    <div id="payment-element"></div>
  </div>
  
</template>


<style>

.vuefintegrate{
    padding: 5px;
}

</style>