const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the title"],
        maxlength: 100, // Example: Limit the title to 100 characters
    },
    author: {
        type: String,
        required: [true, "Please add the author"],
        maxlength: 100, // Example: Limit the author name to 100 characters
    },
    publisher: {
        type: String,
        required: [true, "Please add the publisher"],
    },
    description: {
        type: String,
        required: [true, "Please add the description"],
    },
    price: {
        type: Number,
        required: [true, "Please add the price"],
        min: 0, // Example: Price cannot be negative
        max: 1000, // Example: Limit the price to 1000
    },
    image: {
        type: String,
        required: [true, "Please add the image"],
    },
    isbn: {
        type: String,
        required: [true, "Please add the ISBN"],
    },
    category: {
        type: String,
        required: [true, "Please add the category"],
    },
    publishedDate: {
        type: Date,
        required: [true, "Please add the published date"],
    },
    numPages: {
        type: Number,
        required: [true, "Please add the number of pages"],
        min: 1, // Example: At least 1 page is required
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', bookSchema);