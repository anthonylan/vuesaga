<template>
  <header>
    <div class="container">
      <h1>Card Setup / Paymemt</h1>
      <StripeElement :pk="public_key" :tap="btnTaps" :options="options1" @verify="handleVer"  />
      <button @click="btnTaps++">Submit</button>
      <br> <br>

      <h1>Stripe Checkout</h1>
      <StripeCheckout :pk="public_key" :options="options"  @verify="handleVer" />

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { StripeElement, StripeCheckout } from './VeePlugin'

// import { StripeElement } from 'vuefintegrate'
const public_key =  import.meta.env.VITE_STRIPE_PUBLIC_KEY

const btnTaps = ref(1)


const options = {
  server_url: 'http://localhost:3000/api/ai',
}

const options1 = {
  server_url: 'http://localhost:3000/api/ai',
  mode: 'payment',
  amount: 1000
}



function handleVer(feed: any){
  console.log(feed);
  
}



</script>


<style lang="scss" scoped>



.container{
  max-width: 400px;
  margin: 0 auto;
}

button{
  display: block;
  width: 100%;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}

</style>