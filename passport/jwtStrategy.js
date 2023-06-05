const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require("../models/userModel");

// Configure Passport JWT strategy
passport.use(
    new JWTStrategy(
        {
            // Extract JWT token from the Authorization header
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                // Find the user with the ID extracted from the JWT payload
                const user = await User.findById(jwtPayload.id).exec();

                if (user) {
                    // If user exists, authentication is successful
                    return done(null, user);
                } else {
                    // If user doesn't exist, authentication fails
                    return done(null, false, { message: 'User is not authorized' });
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = {
    passport
};
