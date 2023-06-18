<template>
       
        <div>
          <StripeElement :pk="public_key" :tap="btnTaps" :options="options1" @verify="handler"  />
            <br>
          <StripeCheckout :pk="public_key" :options="options2"  @verify="handler" />
  
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StripeElement, StripeCheckout } from '../Saga'

const public_key =  import.meta.env.VITE_STRIPE_PUBLIC_KEY
const btnTaps = ref(1)

const options1 = {
  server_url: 'http://example.com/api/create-setup-intent',
  mode: 'setup'
}

const options2 = {
  server_url:'http://example.com/api/create-payment-intent',
  amount: 1000,
}

function handler(feed: any){
  console.log(feed);
}


</script>

