//<!-- GU CPSC 332 Example NodeJS server with Mongoose connecting to MongoDB with multiple files-->

//used for our express module / routing
//https://expressjs.com/en/guide/routing.html
const express = require("express");
const app = express();

//method in express to recognize the incoming Request Object as strings or arrays.
//used for our POST method
app.use(express.urlencoded({
    extended: true
}));

//we want to use embedded javascript "template" files
app.set("view engine", "ejs");

app.use(express.static("public"));

const PORT = process.env.PORT || 8080; //port we will connect to. process.evn.PORT used for Heroku later

//start listening for requests on the specified port
app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});

//START of Mongoose configuration code
//MongoDB / Mongoose section of code
const FormResult = require("./models/userAuth");
const catalogContent = require("./models/catalogModel");
const productContent = require("./models/productModel");

//const { db } = require("./models/userAuth");
//END of Mongoose configuration code

const VALID_AGREE_VALUES = ["Yes", "Maybe", "No"];

//root path
//respond to get requests at the root URL, e.g., /localhost:8080/
app.get("/auth", (req, res) => {
    res.render("auth.ejs");
});

//CRUD
//CREATE
//respond to POST requests at specified URL, e.g., /localhost:8080/home/
app.post("/home", (req, res) => {
    console.log("Form Data:");
    console.log(req.body);

    //Assumption: we are sanitizing and validating data before attempting to insert
    //you are responsible for this! In the below, we would want to reject the data
    //rather than submit it with a default value!
    //We create an object model... object and use the data we receive from our form
    let result = FormResult(
        {
            email: req.body.email,
            password: req.body.password,
        });

    //Saving the model data to our database as configured above
    result.save(
        (err, result) => {
            if (err) {
                //note that we are not handling this error! You'll want to do this yourself!
                return console.log("Error: " + err);
            }
            console.log(`Success! Inserted data with _id: ${result._id} into the database.`);
            console.log(result._doc);
            res.redirect("/home");
        });

});

//READ
//respond to GET requests at specified URL, e.g., /localhost:8080/home/
app.get("/home", (req, res) => {

    //Using the static model method to query the database
    //FormResult.find(
    catalogContent.find(
        {},
        (err, contents) => {
            console.log(contents)
            res.render("home.ejs", {
                catalogContents: contents
            });
        });
});

// app.post("/catalog", (req, res) => {
//     res.redirect("/catalog");
// });

app.get("/catalog", (req, res) => {
    productContent.find(
        {},
        (err, contents) => {
            console.log(contents)
            res.render("catalog.ejs", {
                productContents: contents
            });
        });
});

app.get("/product", (req, res) => {
    productContent.find(
        {},
        (err, contents) => {
            console.log(contents)
            res.render("product.ejs", {
                productContents: contents
            });
        });
});

//UPDATE
/*app.route("/edit/:id")
    .get((req, res) => { //respond to GET requests at specified URL, e.g., /localhost:8080/edit/someIdValue
        //grab the :id parameter value from our URL,
        //this is associated with our database primary key for this example
        let id = req.params.id;

        //Find the document in our MongoDB with the id value from our parameter
        //using the model static method
        FormResult.findById(
            id,
            (err, results) => {
                console.log("Found result: ");
                console.log(results)

                //Build our object to pass on to our ejs to be rendered as HTML
                let result = {
                    _id: id,
                    email: results.email,
                    password: results.password
                };

                res.render("edit.ejs", {
                    response: result
                });
            });

    })
    .post(function (req, res) { //respond to POST requests at specified URL, e.g., /localhost:8080/edit/someIdValue
        //grab the :id parameter value from our URL,
        //this is associated with our database primary key for this example
        let id = req.params.id;

        //no validation of data done here! You absolutely should sanitize and validate
        let email = req.body.email;
        let password = req.body.password;

        //using the updateOne method and where query
        FormResult
            .where({ _id: id })
            .updateOne({
                $set: {
                    email: email,
                    password: password,
                }
            })
            .exec(function (err, result) {
                if (err) return res.send(err);
                res.redirect("/home");
                console.log(`Successfully updated ${result.modifiedCount} record`);
            });
    });
*/
/*
//DELETE
//respond to GET requests at specified URL, e.g., /localhost: 8080 / delete /someIdValue/
//clearly this is not safe! It just deletes the matching record with no validation
app.route("/delete/:id")
    .get((req, res) => {
        //grab the :id parameter value from our URL,
        //this is associated with our database primary key for this example
        let id = req.params.id;

        //not necessary but we can grab the value we're about to delete...
        FormResult.findById(
            id,
            (err, results) => {
                console.log(results)

                let result = {
                    _id: id,
                    email: results.email,
                    password: results.password,
                };
                console.log("We are about to delete: " + JSON.stringify(result));
            });


        //perform the actual deletion
        FormResult.deleteOne(
            { _id: id },
            (err, result) => {
                console.log(result);

                console.log(`${result.deletedCount} record deleted`);
                res.redirect("/home");
            });
    });
*/