const express = require("express");
const router = express.Router();
const { passport } = require('../passport/jwtStrategy');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {
    getAllReviews,
    createReview,
    getReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

router.route("/")
    .get(passport.authenticate('jwt', { session: false }), getAllReviews)
    .post(passport.authenticate('jwt', { session: false }), createReview);

router.route("/:id")
    .get(passport.authenticate('jwt', { session: false }), getReview)
    .delete(passport.authenticate('jwt', { session: false }), deleteReview)
    .put(passport.authenticate('jwt', { session: false }), updateReview);

module.exports = router;