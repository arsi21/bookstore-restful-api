const express = require("express");
const router = express.Router();
const imageUploader = require("../middleware/imageUploader");
const { passport } = require('../passport/jwtStrategy');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

router.route("/")
    .get(passport.authenticate('jwt', { session: false }), getAllBooks)
    .post(passport.authenticate('jwt', { session: false }), roleMiddleware('admin'), imageUploader.single('image'), createBook);

router.route("/:id")
    .get(passport.authenticate('jwt', { session: false }), getBook)
    .delete(passport.authenticate('jwt', { session: false }), roleMiddleware('admin'), deleteBook)
    .put(passport.authenticate('jwt', { session: false }), imageUploader.single('image'), roleMiddleware('admin'), updateBook);

module.exports = router;