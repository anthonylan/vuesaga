# VueSaga: Stripe + Vue integration

![demo screen](./demo/Screenshot%202023-07-01%20at%206.55.57%20PM.png)
Seamlessly integrate Stripe payments and card handling into your Vue.js applications with minimal code. 

[![npm version](https://img.shields.io/npm/v/vuesaga.svg?style=flat-square)](https://www.npmjs.org/package/vuesaga)

[`github`](https://github.com/anthonylan/vuesaga)




## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Events](#events)
- [Server](#server)
- [Examples](#examples)




### Features

- Integration with Stripe Elements: Easily embed Stripe Elements for secure payment input forms.
- Integration with Stripe Checkout: Streamline the checkout process using Stripe Checkout for a smooth payment experience.
- Customizable appearance: Customize the appearance of Stripe Elements and Checkout to match your application's design.
- Simplified API interactions: Handle API requests to create payment intents and confirm payments with ease.
- Event-driven architecture: Emit events to notify the parent component about the payment status and provide real-time feedback.


### Installation

You can install the VueSaga Library via npm:


```bash
npm install vuesaga
```

Additionally, you need to include the Stripe JavaScript library in your project. Add the following script tag to your index.html file:

```html
<script src="https://js.stripe.com/v3/"></script>
```


### Usage
To use the library in your Vue.js project, follow these steps:
1. Import the desired components:

```javascript
import { StripeElement, StripeCheckout } from 'vuesaga'
```

2. Register the components in your Vue component:

```javascript
components: {
    StripeElement,
    StripeCheckout,
},
```
3. Define the required props and options for the components:

```javascript
  data: () => ({
     pk: 'pk_test_xxx',
     options:{
      server_url: 'example.com/api/create-setup',
      amount: 2000 //required for checkout & elements when mode == 'payment'
    }
  })
```
4. Implement the components in your template:
```html
<template>
    <div>
        <StripeElement :pk="pk" :options="options" @verify="handler" />
        <StripeCheckout :pk="pk" :options="options" @verify="handler" />
    </div>
</template>

```
5. Implement the event handler for the verify event emitted by the components:

```javascript
methods:{
  handler(feed) {
    console.log(feed);
 }
}
```
6. Required for StripeElement ONLY: Trigger the form submission:
```javascript
  data: () => ({
    btnTaps: 1
  })
```
... now update your template:
```html
<template>
    <div>
        <StripeElement :pk="pk" :tap="btnTaps" :options="options" @verify="handler" />
        <a-button @click="btnTaps++">Submit</a-button>

        <StripeCheckout :pk="pk" :options="options" @verify="handler" />
    </div>
</template>
```

### Props
Vuesaga accepts the following props:

- `pk` (String, required):  The Stripe publishable key.
- `tap` (Number, required)[Elements ONLY]: A reactive property that triggers the submission of the payment form when its value changes.
- `options` (Object, required): An object containing the configuration options for Stripe Elements / Checkount. It includes the following properties:
  - `mode` (String, default: 'setup'): The mode of the integration, either 'setup' or 'payment'. This determines whether you are setting up a payment method or processing a payment.
  - `currency` (String, default: 'usd'): The currency to use for the payment.
  - `amount` (Number, default: 1000): The payment amount in cents. This is only applicable for checkount and when element the `mode` is set to 'payment'.
  - `r_url` (String): The return URL after the payment is completed.
  - `server_url` (String, required): The URL where you handle the server-side processing of the payment or setup.
  - `appearance` (Object): An object containing appearance-related options:
    - `labels` (String, default: 'above'): The position of the labels in the payment form.
    - `theme` (String, default: 'flat'): The theme of the payment form.


### Events
- `verify`: An event emitted by the component to notify the parent component about the payment / setup verification status. It provides an object with the following properties:

  - `chain` (String): The chain of events or components where the verification occurred.

  - `error` (Boolean): Indicates whether an error occurred or not.

  - `data` (Object): Additional data related to the verification process.


### Server
#### `server_url` Prop
The `options.server_url` prop is an important property used in both the StripeElement and StripeCheckout components. It specifies the server endpoint URL where the library will make API requests to handle payment / setup intents and confirmations with Stripe.

When a payment is submitted, VueSaga sends a request to the specified server_url endpoint to confirm the setup or payment. Your server is expected to provide a client_secret in JSON format as a response. Here's an example of the expected JSON format:

```javascript
{ 
  secret: "your_client_secret_value"
}
```
Make sure to include the `secret` field with the appropriate value in the JSON response from your server to enable seamless integration with VueSaga.

-----
SetupIntent and PaymentIntent for various programming languages:

- Setup: https://stripe.com/docs/api/setup_intents/create
- Payment and checkout: https://stripe.com/docs/api/payment_intents/create

IMPORTANT: Always enable `automatic_payment_methods` in your server code.

-----

#### Data Sent to the Server
The data sent to the `server_url` endpoint depends on the specific component and mode of operation.

For the StripeElement (mode:payment) component & checkout, when submitting the payment form, the library sends a POST request to the `server_url` with the following JSON payload:

```javascript
{
    "currency": "<currency_code>",
    "amount": <payment_amount>
}
```

Where:

- <currency_code> is the currency code specified in the options prop (or the default if not provided).
- <payment_amount> is the payment amount specified in the options prop (or the default if not provided).

On the other hand, for the StripeElement with mode: setup, an empty body is sent to the server_url endpoint

#### Server Response
The server endpoint specified by the `server_url` prop should handle the incoming requests and communicate with Stripe's API to create or retrieve the necessary information.

Upon receiving the request, the server should perform the following steps:

- Interact with Stripe's API to create or retrieve a payment intent, depending on the mode of operation (payment or setup).
- Retrieve the client_secret from the payment intent created or retrieved from Stripe.
- Return the client_secret in the server's response.

The server's response should have the following structure:

```javascript
{
  "secret": "<client_secret>"
}
```

Where <client_secret> is the value obtained from the payment / setup intent.

VueSaga will use this client_secret to confirm the payment intent with Stripe and complete the payment process.

It's important to ensure that your server-side code securely communicates with Stripe's API, validates requests, and handles errors gracefully.

----

Please note that the exact implementation details of the server-side code are beyond the scope of this library's documentation, as it depends on your specific server environment and programming language. Consult Stripe's official documentation and relevant server-side resources for guidance on implementing the server-side integration.

----

### Examples
Here's an example of how you can implement the server-side code using Express.js:


#### Example 1: StripeElement(setup)
Vue: 
```javascript
<script>
  import { StripeElement } from 'vuesaga'

  export default{
    components: { StripeElement },
    data: () => ({
      public_key: 'pk_test_xxx',
      tap: 1
      options: {
        server_url: '/create-setup-intent',
      }
    }),
    methods:{
      handlder(feed){
        console.log(feed) //Do something else with this info
      }
    }
  }
</script>
```

```html
<template>
  <StripeElement :pk="public_key" :tap="tap" :options="options" @verify="handler"  />
  <button @click="tap++">Save Card</button>
</template>
```

Express.js:
```javascript
const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

app.use(express.json());

//Ref: (https://stripe.com/docs/api/payment_intents/create)
app.post('/create-setup-intent', async (req, res) => {

    const setupIntent = await stripe.setupIntents.create({
        automatic_payment_methods: { enabled: true }
    })

    res.status(200).json({
        secret: setupIntent['client_secret']
    })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```


#### Example 2: StripeElement(payment) and StripeCheckout
Vue:

```javascript
<script>
  import { StripeElement, StripeCheckout } from 'vuesaga'

  export default{
    components: { 
      StripeElement, StripeCheckout
   },
    data: () => ({
      public_key: 'pk_test_xxx',
      tap: 1
      options: {
        server_url: '/create-payment-intent',
        mode: 'payment',
        amount: 3000
      }
    }),
    methods:{
      handlder(feed){
        console.log(feed) //Do something else with this info
      }
    }
  }
</script>
```

```html
<template>
  <StripeElement :pk="public_key" :tap="tap" :options="options" @verify="handler"  />
  <button @click="tap++">Pay $30.00</button>

  <br />
  <StripeCheckout :pk="public_key" :options="options" @verify="handler"  />
</template>
```

Express.js:
```javascript
const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

app.use(express.json());

//Ref: (https://stripe.com/docs/api/payment_intents/create)
app.post('/create-payment-intent', async (req, res) => {
    const data = req.body

    const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: data.currency,
        automatic_payment_methods: { enabled: true },
    })

    res.status(200).json({
        secret: paymentIntent['client_secret']
    })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### Attr
By abstracting away complex implementation details, VueSaga simplifies the integration process, allowing developers to seamlessly leverage the full functionality of Stripe's payment infrastructure.
