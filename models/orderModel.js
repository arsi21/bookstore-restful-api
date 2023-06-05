const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Please add the book ID"],
        index: true,
    },
    quantity: {
        type: Number,
        required: [true, "Please add the quantity"],
        min: 1,
    },
    price: {
        type: Number,
        required: [true, "Please add the price"],
    },
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add the user ID"],
        index: true,
    },
    items: [
        orderItemSchema
    ],
    totalPrice: {
        type: Number,
        required: [true, "Please add the total price"],
    },
    datePlaced: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        required: [true, "Please add the payment method"],
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    clientSecret: {
        type: String,
    },
    paid: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Order', orderSchema);
