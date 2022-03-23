// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get tournament Model
const{Tournament}=require("./models/tournament");

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello to the Game World!");
});

app.get("/gametemplate", function(req, res) {
    res.render("gametemplate");
});

// Create a route for root for tournament- /
app.get("/tournament/:tournament_id", async function(req, res) {
    var tmId = req.params.tournament_id;
    // Create a tournament class with the ID passed
    var tournament = new Tournament(tmId);
    await tournament.getTournamentDetails();
    //await tournament.getTournamentTeams();
    res.render('tournament', {tournament:tournament});
      
});

// Create a route for root for login- /
app.get("/login", function(req, res) {
    res.render("login");
});

// Create a route for root for createaccount- /
app.get("/createaccount", function(req, res) {
    res.render("createaccount");
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from teams';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});