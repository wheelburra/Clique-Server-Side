var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clique' });
});

/* GET Userlist page displays the usercollection for testing purposes. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

// GET regTest.jade the REGISTRATION TEST PAGE. 
router.get('/regTest', function(req, res) {
    res.render('regTest', { title: 'Simulates a User Registration to /register' });
});

// GET loginTest.jade the LOGIN TEST PAGE. 
router.get('/loginTest', function(req, res) {
    res.render('loginTest', { title: 'Simulates a User Login to /login' });
});

// POST JSON data to the User Registration function
router.post('/register', function(req, res) {

    // Set the internal DB variable
    var db = req.db;

    // Get the form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.email;
    var userPass = req.body.password;
    var fullName = req.body.fullname;
    
    // Set the collection
    var collection = db.get('usercollection');

    // Submit to the DB, adding a new user object to usercollection
    collection.insert({
        "username" : userName,
        "email" : userEmail,
        "password" : userPass,
        "fullname" : fullName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page 
            /* this is where a modification can be 
             made to return json data to the client app */
            res.redirect("userlist"); // allows for success confirmation on the server side. to be removed later
        }
    });
});

// POST to Login 
// NOT READY YET
router.post('/login', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPass = req.body.password;

    // Set our collection
    var collection = db.get('usercollection');

    // Need to change this to a find user and verify password match
    collection.insert({
        "username" : userName,
        "password" : userPass
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem logging into Clique.");
        }
        else {
            // And forward to success page
            /* this is where a modification can be 
            made to return json data to the client app
            of successful login*/
            res.redirect("userlist"); // allows for success confirmation on the server side. to be removed later
        }
    });
});
module.exports = router;
