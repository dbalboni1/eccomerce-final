//<!-- GU CPSC 332 Example NodeJS server with Mongoose connecting to MongoDB -->
//model file

const mongoose = require("../db");

//configure our schema to use with our database
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

//create the model for our form data using our schema
//argument 1: uses/creates a MongoDB collection "formresults" -- makes string plural and lowercase
//so... "FormResult" is transformed to "formresults" on the MongoDB side.
//argument2: this is the schema you created above to be used with the MongoDB collection
//best practice to CapitalCase your model and model strings
const userAuth = mongoose.model("user", userSchema);

//make our FormResult object available outside of this file when we export
module.exports = userAuth;