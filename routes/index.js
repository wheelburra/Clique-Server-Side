var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clique' });
});

/* GET Userlist stuff page displays the usercollection for testing purposes. */
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

    // Set the JSON data to a variable
    var str = req.body;
    
    // Set the internal DB variable
    var db = req.db;

    // Set the user profile collection to a variable
    var collection = db.get('usercollection');

    // Submit to the DB, adding a new user object to usercollection
    collection.insert({
        "username" : str.username,
        "email" : str.email,
        "password" : str.password,
        "fullname" : str.fullname
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
        console.log("There was a problem adding the information to the database.");   
        res.send({'message':"Fail"});
        }
        else {
            // And forward to success page 
            /* this is where a modification can be 
             made to return json data to the client app */
        res.send({'message':"Success"});    
        //res.redirect("userlist"); // allows for success confirmation on the server side. to be removed later
       }
    });
});

// POST to Login function
router.post('/login', function (req, res) {

    // Set the JSON data to a variable
    var str = req.body;
    
    // Set the internal DB variable
    var db = req.db;
    // Obtains the user profile collection setting it to a variable
    var collection = db.get('usercollection');
    
    // Get our JSON values.
    var userName = req.body.username;
    var userPass = req.body.password;
    
    // Finds a single document in the collection
    db.usercollection.findOne({ username: userName }).on('success', function (doc) {
        // the password is incorrect
        if (userPass !== doc.password){
            res.send({'message':"Fail"});
        }
        // the password matches!
        else {
            res.send({'message':"Success"});
        }
    });
});
module.exports = router;
