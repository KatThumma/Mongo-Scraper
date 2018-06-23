// Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");

// Set up port
var PORT = process.env.PORT || 3000;

// instantiate express app
var app = express();

// set up express router
var router = express.Router();

// require our routes file pass our router object
require("./config/routes")(router);

// designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

// connect handlebars to our express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// use bodyparser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

// have every request go through our router middlewear
app.use(router);

//if deployed, use the deployed database. otherwise use the local mongoheadlines database
var db = process.env.MONGO_URI || "mongodb://localhost/mongoHeadlines";











// connect mongoose to our database
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection successful");
    }
});

// listen on port
app.listen(PORT, function(){
    console.log("listening on port:" + PORT);
});






