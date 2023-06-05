const express = require("express");
const { model } = require("mongoose");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");
const { passport } = require('../passport/jwtStrategy');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", passport.authenticate('jwt', { session: false }), roleMiddleware('admin'), getAllUsers);

module.exports = router;