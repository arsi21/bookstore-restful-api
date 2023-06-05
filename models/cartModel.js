const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Please add the book ID"],
        index: true
    },
    quantity: {
        type: Number,
        required: [true, "Please add the quantity"],
        default: 1,
        min: 1
    },
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add the user ID"],
        index: true
    },
    items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);