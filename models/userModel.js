const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"],
        unique: [true, "Username already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
    firstName: {
        type: String,
        required: [true, "Please add the first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please add the last name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Add any additional roles as needed
        default: 'user',
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);