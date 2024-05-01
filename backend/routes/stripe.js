// Backend code (stripe.js)
const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.url],
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100, // Convert price to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/velvethomes/pinfo`,
      cancel_url: `https://velvet-wbd.vercel.app/velvethomes/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
});


router.post("/cart-create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            images: [item.images[0]], // Assuming images is an array
            metadata: {
              id: item._id, // Assuming _id is the unique identifier for products
            },
          },
          unit_amount: item.price * 100, // Convert price to cents
        },
        quantity: 1, // Quantity of each item is fixed at 1
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/velvethomes/pinfo`,
      cancel_url: `https://velvet-wbd.vercel.app/velvethomes/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
});


module.exports = router; // Ensure that the router object is properly exported
