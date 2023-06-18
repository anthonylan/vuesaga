const stripe = require('stripe')('sk_live_xxx');
const express = require('express')
const app = express()


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


