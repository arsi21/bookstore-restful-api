const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add the user ID"],
        index: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Please add the book ID"],
        index: true
    },
    title: {
        type: String,
        required: [true, "Please add the title"],
        maxlength: 100
    },
    body: {
        type: String,
        required: [true, "Please add the body"],
        maxlength: 500
    },
    rating: {
        type: Number,
        required: [true, "Please add the rating"],
        min: 1,
        max: 5
    },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);