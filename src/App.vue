<template>
    <div class="panel">
      <div class="docker stripe-section">

        <div class="docker-content">
          <a href="#" class="button">Read doc</a>
          <h1>Stripe integration with dynamic validation</h1>
          <p>Seamlessly integrate Stripe payments and card handling into your Vue.js applications with minimal code</p>
        </div>
       
        <div class="container">
         <Test />
      </div>
    </div>

 

    </div>
</template>

<script setup lang="ts">
import Test from './examples/Test.vue'

</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css');

.docker{
  padding: 60px;
}
.container{
  background-color: rgb(227, 232, 238);
  max-width: 500px;
  margin: 10px auto;
  padding: 30px 20px;
  border-radius: 10px;
}

body{
  background-color: #1f1f1f;
}

.docker-content{
  text-align: center;
  padding: 20px 0;
  h1, p{
    color: #fff;
    max-width: 500px;
    margin: 20px auto;
  }
  h1{
    line-height: 1;
  }
  .button{
    background-color: #e4f222;
  }
}

</style>