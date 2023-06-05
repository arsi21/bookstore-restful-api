const asyncHandler = require("express-async-handler");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/orderModel");
const Book = require("../models/bookModel");

//@desc Get all orders
//@route GET /api/orders
//@access private
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
});

//@desc Get order
//@route GET /api/orders/:id
//@access private
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById({ user: req.user.id, _id: req.params.id });

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    res.status(200).json(order);
});

//@desc Create new order and create payment intent
//@route POST /api/orders/create-payment-intent
//@access private
const createPaymentIntent = asyncHandler(async (req, res) => {
    const { items } = req.body; // Extract the user ID and items array from the request body

    // Calculate the total price based on the order items
    let totalPrice = 0;
    for (const item of items) {
        const book = await Book.findById(item.book); // Find the book by its ID
        totalPrice += book.price * item.quantity; // Multiply the book's price by the quantity and add it to the total price
        item.price = book.price;
    }

    // Create a new order with the extracted data and calculated total price
    const order = new Order({
        user: req.user.id,
        items,
        totalPrice,
        paymentMethod: 'Card',
        status: 'pending',
    });

    // Save the order to the database
    const addedOrder = await order.save();

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100, // Stripe requires the amount in cents, so multiply by 100
        currency: 'php',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: { orderId: order._id.toString() }, // Store the order ID as metadata for reference
    });

    // Return the client secret to complete the payment on the client-side
    res.json({ clientSecret: paymentIntent.client_secret, orderId: addedOrder._id });
});

//@desc Update order
//@route PUT /api/orders/:id
//@access private
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    res.status(200).json(order);
});

//@desc Delete order
//@route DELETE /api/orders/:id
//@access private
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    res.status(200).json(order);
});

module.exports = {
    getAllOrders,
    getOrder,
    createPaymentIntent,
    updateOrder,
    deleteOrder
}