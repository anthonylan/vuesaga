const stripe = require('stripe')('sk_live_xxx');
const express = require('express')
const app = express()



//Ref: (https://stripe.com/docs/api/setup_intents/create)
app.post('/create-setup-intent', async (req, res) => {

    const setupIntent = await stripe.setupIntents.create({
        automatic_payment_methods: { enabled: true }
    })

    res.status(200).json({
        secret: setupIntent['client_secret']
    })
})
