const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");

//@desc Get all review
//@route GET /api/review
//@access private
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
});

//@desc Create new review
//@route POST /api/reviews
//@access private
const createReview = asyncHandler(async (req, res) => {
    const { book, title, body, rating } = req.body;

    if (!book || !title || !body || !rating) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const review = await Review.create({
        user: req.user.id,
        book,
        title,
        body,
        rating
    });

    res.status(201).json(review);
});

//@desc Get review
//@route GET /api/reviews/:id
//@access private
const getReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    res.status(200).json(review);
});

//@desc Update review
//@route PUT /api/reviews/:id
//@access private
const updateReview = asyncHandler(async (req, res) => {
    const review = await Review.findByIdAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    res.status(200).json(review);
});

//@desc Delete review
//@route DELETE /api/reviews/:id
//@access private
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findByIdAndDelete({ _id: req.params.id, user: req.user.id });

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    res.status(200).json(review);
});

module.exports = {
    getAllReviews,
    createReview,
    getReview,
    updateReview,
    deleteReview
}