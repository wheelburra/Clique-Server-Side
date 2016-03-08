var express = require('express');
var router = express.Router();
var login = require('./login'); //allows login.js exports to be used
var register = require('./register'); //allows register.js exports to be used
var picToApp = require('./picToApp'); //allows picToApp.js exports to be used
var createAlbum = require('./createAlbum'); //allows createAlbum.js exports to be used
//var picFromApp = require('./picFromApp'); //allows picToApp.js exports to be used
//uncomment above when code is ready to be tested

//Route calls login function for login.js file
router.get('/login', function (req, res) {

    //pull parameters from URL
    var username = req.param('username');
    var password = req.param('password');

    // Set the internal DB variable
    var db = req.db;

    // Set the user profile collection to a variable
    var collection = db.get('userCollection');

    //Returns callback from login function
    login.login(username, password, collection, function (found) {
        res.send(found);
    });
});

//Route calls register function for login.js file
router.get('/register', function (req, res) {

    //pull parameters from URL
    var name = req.param('name');
    var username = req.param('username');
    var password = req.param('password');
    var email = req.param('email');

    // Set the internal DB variable
    var db = req.db;

    // Set the user profile collection to a variable
    var collection = db.get('userCollection');

    // Return callback from register function
    register.register(name, username, password, email, collection, function (result) {
        res.send(result);
    });
});

router.get('/picToApp', function (req, res) {

    var objID = req.param('objID'); //this is hardcoded on app side for now
    
    // Set the internal DB variable
    var db = req.db;

    // Set the user profile collection to a variable
    var collection = db.get('imageCollection');

    picToApp.getPic(objID, collection, function (result) {
        //res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.send(result);//use send instead of json, sends binary data as buffer
    });
});

router.get('/picFromApp', function (req, res) {

    picToApp.uploadPic(function (result) {
        //res.send(result);
    });
});

/* GET the album collection. */
router.get('/getCollection', function (req, res) {
    //sets the database
    var db = req.db;
    // pull parameters from URL
    var album = req.param('album');
    var username = req.param('username');
    // finds the collection named usernamealbum
    var collection = db.get(username + album);
    collection.find({}, {}, function (err, docs) {
        if (err) {
            console.log('error occured');
            res.send({'message': err});
        } else {
            res.send(docs);
        }
    });
});

//Route calls createAlbum function from createAlbum.js file 
//to create the album directory in the users image subriectory
// Should this be a post??
router.get('/createAlbum', function (req, res) {

    // Pulls parameters from URL
    var album = req.param('album');
    var username = req.param('username');

    // Return callback from createAlbum function
    createAlbum.createAlbum(username, album, function (result) {
        res.send(result);
    });
});
module.exports = router;
