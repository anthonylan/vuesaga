## VueFintegrate Component Documentation

The VueFintegrate component is a Vue.js component that provides integration with the Stripe payment gateway. It allows you to create a payment form and handle payment submissions using Stripe.

### Installation

To install the VueFintegrate component, use the following command:

```bash
npm install vuefintegrate
```

Additionally, you need to include the Stripe JavaScript library in your project. Add the following script tag to your index.html file:

```html
<script src="https://js.stripe.com/v3/"></script>
```

### Component Usage

To use the VueFintegrate component, follow these steps:

1. Import the necessary components and functions:

```javascript
import { ref } from 'vue'
import { StripeElement } from 'vuefintegrate'
```

2. Obtain your Stripe public key and assign it to the `public_key` variable. You can use an environment variable or any other method to store your public key.

```javascript
const public_key = 'pk_xxx'
```

3. Define a reference variable to track the number of button taps:

```javascript
const btnTaps = 1
```

4. Define the options for the Stripe integration. The `server_url` option specifies the URL where you handle the server-side processing of the payment.

```javascript
const options = {
  server_url: 'http://example.com/api/create-intent',
}
```

5. (Optional) You can customize the payment options further by including additional options like `mode` (payment or setup) and `amount` (the payment amount).

```javascript
const options1 = {
  server_url: 'http://example.com',
  mode: 'payment',
  amount: 1000
}
```

6. Define a function to handle the verification result. This function will receive the verification result as a parameter and can be used to handle success or error scenarios.

```javascript
function handler(feed: any){
  console.log(feed);
}
```

7. Include the VueFintegrate component in your template:

```html
<template>
  <div>
    <StripeElement :pk="public_key" :tap="btnTaps" :options="options" @verify="handler" />
  </div>
</template>
```

8. Use the component in your application as desired. The `:pk` prop should be set to your Stripe public key, the `:tap` prop should be set to the button taps reference variable, the `:options` prop should be set to the options object defined earlier, and the `@verify` event should be bound to the verification handler function.

### Component Props

The VueFintegrate component accepts the following props:

- `pk` (String, required): The Stripe public key used for client-side authentication and communication with the Stripe API.
- `tap` (Number, required): A reference variable that tracks the number of button taps. Submitting the payment form is triggered when this variable changes.
- `options` (Object, optional): Additional options for customizing the Stripe integration. It can contain the following properties:
  - `mode` (String, default: 'setup'): The mode of the integration, either 'setup' or 'payment'. This determines whether you are setting up a payment method or processing a payment.
  - `currency` (String, default: 'usd'): The currency to use for the payment.
  - `amount` (Number, default: 1000): The payment amount in cents. This is only applicable when the `mode` is set to 'payment'.
  - `r_url`

 (String): The return URL after the payment is completed.
  - `server_url` (String, required): The URL where you handle the server-side processing of the payment.
  - `appearance` (Object): An object containing appearance-related options:
    - `labels` (String, default: 'above'): The position of the labels in the payment form.
    - `theme` (String, default: 'flat'): The theme of the payment form.

### Component Events

The VueFintegrate component emits the following event:

- `verify`: This event is emitted when the payment submission is verified either by the client or the server. It provides the verification result as an object parameter. The object has the following properties:
  - `chain` (String): Indicates the stage of verification ('form element' or 'server intent').
  - `error` (Boolean): Indicates if an error occurred during verification.
  - `data` (Object): The verification data. This can contain additional information about the verification result or the payment.

### Styling

The VueFintegrate component provides a default minimalistic style, but you can customize it further by adding your own CSS rules. The component's container has the class `vuefintegrate-container`, which you can use to target the styling.

```html
<style>
.vuefintegrate-container {
  padding: 10px;
}
</style>
```

