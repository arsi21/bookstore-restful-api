const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

const configurePassport = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
            },
            async (username, password, done) => {
                try {
                    // Find the user with the provided username
                    const user = await User.findOne({ username });

                    // If user doesn't exist, authentication fails
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username' });
                    }

                    // Compare the provided password with the hashed password stored in the database
                    const isPasswordValid = await bcrypt.compare(password, user.password);

                    // If password is invalid, authentication fails
                    if (!isPasswordValid) {
                        return done(null, false, { message: 'Incorrect password' });
                    }

                    // Authentication successful, pass the user object to the next middleware
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

module.exports = configurePassport;
