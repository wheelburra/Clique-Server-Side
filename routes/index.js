var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Clique'});
});

/* GET Userlist stuff page displays the usercollection for testing purposes. */
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

// GET regTest.jade the REGISTRATION TEST PAGE. 
router.get('/regTest', function (req, res) {
    res.render('regTest', {title: 'Simulates a User Registration to /register'});
});

// GET loginTest.jade the LOGIN TEST PAGE. 
router.get('/loginTest', function (req, res) {
    res.render('loginTest', {title: 'Simulates a User Login to /login'});
});

// POST JSON data to the User Registration function
router.post('/register', function (req, res) {
    // Set the JSON data to a variable
    var str = req.body;
    // Set the internal DB variable
    var db = req.db;
    // Set the user profile collection to a variable
    var collection = db.get('usercollection');

    // Searches database for existing username match
    collection.findOne({username: str.username}, function (err, doc) {
        if (err) {
            console.log("There was a problem searching the database.");
            res.send({'message': err});
        }
        // Username already exists in the database
        if (doc) {
            console.log("Username already exists.");
            res.send({'message': "Username already exists"});
        } else {
            // Writing to the DB, adding a new user document to usercollection
            collection.insert({
                "username": str.username,
                "email": str.email,
                "password": str.password,
                "fullname": str.fullname
            }, function (err, doc) {
                if (err) {
                    // Writing to the database error
                    console.log("There was a problem adding the information to the database.");
                    res.send({'message': err});
                } else {
                    // Return profile information in JSON 
                    console.log(doc);
                    res.send(doc);
                }
            });
        }
    });
});
// POST JSON data to the Login function
router.post('/login', function (req, res) {

    // Set the JSON data to a variable
    var str = req.body;
    // Set the internal DB variable
    var db = req.db;
    // Obtains the user profile collection setting it to a variable
    var collection = db.get('usercollection');

    // Finds a single document in the collection
    collection.findOne({username: req.body.username}, function (err, doc) {
        if (err) {
            console.log("There was a problem adding the information to the database.");
            res.send({'message': err});
        }
        // Found a username match in databse
        if (doc) {
            var urlPass = req.body.password;
            var dbPass = doc.password;
            // the password matches!
            if (urlPass == dbPass) {
                console.log(dbPass + " matches " + urlPass);
                // Send user profile in JSON
                res.send(doc);
            }
            // The password is incorrect
            else {
                console.log(dbPass + " does not match " + urlPass);
                res.send({'message': "Fail"});
            }
        }
        // No username match found in database
        else {
            console.log(req.body.password + " does not exist");
            res.send({'message': "user does not exist"});
        }
    });
});
module.exports = router;
