const express = require("express");
const router = express.Router();
const { passport } = require('../passport/jwtStrategy');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {
    getAllCarts,
    createCart,
    getCart,
    updateCart,
    deleteCart,
    addItemToCart,
    removeItemFromCart
} = require("../controllers/cartController");

router.route("/")
    .get(passport.authenticate('jwt', { session: false }), getAllCarts)// GET /carts - Get all carts
    .post(passport.authenticate('jwt', { session: false }), createCart);// POST /carts - Create a new cart

router.route("/:id")
    .get(passport.authenticate('jwt', { session: false }), getCart)// GET /carts/:id - Get a single cart by ID
    .delete(passport.authenticate('jwt', { session: false }), deleteCart)// DELETE /carts/:id - Delete a cart by ID
    .put(passport.authenticate('jwt', { session: false }), updateCart);// PUT /carts/:id - Update a cart by ID

router.route("/:id/items")
    .post(passport.authenticate('jwt', { session: false }), addItemToCart);// POST /carts/:id/items - Add an item to the cart

router.route("/:id/items/:itemId")
    .delete(passport.authenticate('jwt', { session: false }), removeItemFromCart);// DELETE /carts/:id/items/:itemId - Remove an item from the cart

module.exports = router;