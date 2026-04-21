import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.listen(4242, () => console.log('Server running on http://localhost:4242'))
