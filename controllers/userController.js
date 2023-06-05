const asyncHandler = require("express-async-handler");
const passport = require('passport');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        address,
        phone,
    } = req.body;

    if (!username || !password || !firstName || !lastName || !email || !address || !phone) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Add user to DB
    const user = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        address,
        phone,
    })

    //Check if there is an error adding the user
    if (user) {
        res.status(201).json({ _id: user.id, username: user.username });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res, next) => {
    await passport.authenticate('local', { session: false }, asyncHandler(async (err, user, info) => {
        if (err || !user) {
            // Authentication failed, pass the error to the error-handling middleware
            res.status(401)
            return next(new Error(info.message));
        }

        req.login(user, { session: false }, async (err) => {
            if (err) {
                // Error occurred during login process, pass the error to the error-handling middleware
                res.status(500);
                return next(new Error('Internal server error'));
            }

            // Generate a JWT token containing the user's ID as the payload
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

            // Set status code to 200 and return the JWT token as a response
            return res.status(200).json({ token });
        });
    }))(req, res, next);
});




//@desc Current user information
//@route GET /api/users/current
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}