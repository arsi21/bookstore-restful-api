const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const passport = require('passport');
const localStrategy = require('./passport/localStrategy');
const port = process.env.PORT || 5000;
const app = express();

connectDb();

app.use(express.json());//parser to parse the data that we receive from the client on the server side
app.use(passport.initialize());
app.use(express.static('public'));// Serve static files from the "public" folder

// Configure Passport local strategy
localStrategy(passport);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/carts", require("./routes/cartRoutes"));
app.use(errorHandler);//custom middleware for error

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})