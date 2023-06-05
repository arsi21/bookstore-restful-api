const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

//@desc Get all carts
//@route GET /api/carts
//@access private
const getAllCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find(); // Retrieve all carts from the database
    res.status(200).json(carts); // Respond with the retrieved carts in JSON format
});

//@desc Get cart
//@route GET /api/carts/:id
//@access private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findById({ _id: req.params.id, user: req.user.id }); // Find a cart in the database by its ID
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
        //return res.status(404).json({ error: 'Cart not found' }); // If the cart is not found, respond with an error message
    }
    res.status(200).json(cart); // Respond with the retrieved cart in JSON format
});

//@desc Create new cart
//@route POST /api/carts
//@access private
const createCart = asyncHandler(async (req, res) => {
    const { items } = req.body;

    const cart = await Cart.create({
        user: req.user.id,
        items,
    }); // Create a new cart using the data provided in the request body
    res.status(201).json(cart); // Respond with the created cart in JSON format
});

//@desc Update cart
//@route PUT /api/carts/:id
//@access private
const updateCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }); // Find a cart by its ID and update its properties with the data provided in the request body
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
        //return res.status(404).json({ error: 'Cart not found' }); // If the cart is not found, respond with an error message
    }
    res.status(200).json(cart); // Respond with the updated cart in JSON format
});

//@desc Delete cart
//@route DELETE /api/carts/:id
//@access private
const deleteCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findByIdAndRemove(req.params.id); // Find a cart by its ID and remove it from the database
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
        //return res.status(404).json({ error: 'Cart not found' }); // If the cart is not found, respond with an error message
    }
    res.status(200).json(cart); // Respond with a "No Content" status to indicate successful deletion
});

//@desc Add an item to the cart
//@route POST /api/carts/:id/items
//@access private
const addItemToCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findById({ _id: id, user: req.user.id }); // Find a cart by its ID
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
        //return res.status(404).json({ error: 'Cart not found' }); // If the cart is not found, respond with an error message
    }
    const { book, quantity } = req.body;
    const newItem = { book, quantity }; // Create a new item with the book and quantity provided in the request body
    cart.items.push(newItem); // Add the new item to the cart's items array
    const updatedCart = await cart.save(); // Save the updated cart
    res.status(200).json(updatedCart); // Respond with the updated cart in JSON format
});

//@desc Remove an item from the cart
//@route DELETE /api/carts/:id/items/:itemId
//@access private
const removeItemFromCart = asyncHandler(async (req, res) => {
    const { id, itemId } = req.params;
    const cart = await Cart.findById({ _id: id, user: req.user.id }); // Find a cart by its ID
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
        //return res.status(404).json({ error: 'Cart not found' }); // If the cart is not found, respond with an error message
    }
    const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === itemId
    ); // Find the index of the item to be removed in the cart's items array
    if (itemIndex === -1) {
        res.status(404);
        throw new Error("Item not found in cart");
        //return res.status(404).json({ error: 'Item not found in cart' }); // If the item is not found, respond with an error message
    }
    cart.items.splice(itemIndex, 1); // Remove the item from the cart's items array
    const updatedCart = await cart.save(); // Save the updated cart
    res.status(200).json(updatedCart); // Respond with the updated cart in JSON format
});


module.exports = {
    getAllCarts,
    createCart,
    getCart,
    updateCart,
    deleteCart,
    addItemToCart,
    removeItemFromCart
}