const express = require("express");
const router = express.Router();
const { passport } = require('../passport/jwtStrategy');
const {
    getAllOrders,
    getOrder,
    createPaymentIntent,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

router.route("/")
    .get(passport.authenticate('jwt', { session: false }), getAllOrders)

router.route("/create-payment-intent").post(passport.authenticate('jwt', { session: false }), createPaymentIntent);

router.route("/:id")
    .get(passport.authenticate('jwt', { session: false }), getOrder)
    .delete(passport.authenticate('jwt', { session: false }), deleteOrder)
    .put(passport.authenticate('jwt', { session: false }), updateOrder);

module.exports = router;