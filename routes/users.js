var express = require('express');
var router = express.Router();
var login = require('./login'); //allows login.js exports to be used
var register = require('./register'); //allows register.js exports to be used
var picToApp = require('./picToApp'); //allows picToApp.js exports to be used
var createAlbum = require('./createAlbum'); //allows createAlbum.js exports to be used
var picFromApp = require('./picFromApp'); //allows picToApp.js exports to be used
var getFriends = require('./getFriends'); //allows getFriends.js exports to be used
var addFriend = require('./addFriend'); //allows addFriend.js exports to be used
var findUser = require('./findUser'); //allows findUser.js exports to be used
//
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

// Sends requested image to the app
router.get('/picToApp', function (req, res) {

    var objID = req.param('objID'); //this is hardcoded on app side for now
    var coll = req.param('collection');

    // Set the internal DB variable
    var db = req.db;

    // Set the user profile collection to a variable
    var collection = db.get(coll);

    picToApp.getPic(objID, collection, function (result) {
        //res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.send(result);//use send instead of json, sends binary data as buffer
    });
});
/*
 * Downloads an image from the phone and stores in users directory and 
 * adds associated document to the database
 *  NOT READY YET!!!
 */
router.post('/picFromApp', function (req, res) {
    //hard codded for testing
//    var album = 'album1';
//    var username = 'skyweezy';

    // Get our JSON values.
    //var album = req.body.album;
    //var username = req.body.username;
    //   uncertain with method to use to obtain the album and username values

// pull parameters from URL
    var album = req.param('album');
    var username = req.param('username');
    var readPic = req.files.image.path;
    var origName = req.files.image.originalFilename;

    // Set the internal DB variable
    var db = req.db;
    // Set the user profile collection to a variable
    var albumCollection = db.get(album);

    picFromApp.uploadPic(username, album, readPic, origName, albumCollection, function (result) {
        res.send(result);
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
    var album = req.param('name');
    var username = req.param('username');
    var collection = req.param('collection');
    // Set the internal DB variable
    var db = req.db;
    var master = username + "Albums";
    // Set the user profile collection to a variable
    var albumCollection = db.get(collection);
    var masterAlbumCollection = db.get(master);
    // Return callback from createAlbum function
    createAlbum.createAlbum(username, album, collection, albumCollection, masterAlbumCollection, function (result) {
        res.send(result);
    });
});

// Requests the Friends List
router.get('/getFriends', function (req, res) {

    // Pulls parameters from URL
    var username = req.param('username'); 
    var friends = username + "friendsList";

    // Set the internal DB variable
    var db = req.db;

    // Set the user Friends List collection to a variable
    var collection = db.get(friends);

    getFriends.getFriends(collection, function (result) {
        res.send(result);
    });
});

// Adds to the Friend List
router.get('/addFriend', function (req, res) {

    // Pulls parameters from URL
    var username = req.param('username'); 
    var friendName = req.param('friendName');
    var friends = username + "friendsList";

    // Set the internal DB variable
    var db = req.db;

    // Set the user Friends List collection to a variable
    var collection = db.get(friends);

    addFriend.addFriend(friendName, collection, function (result) {
        res.send(result);
    });
});

// Finds a user to the Friend List
router.get('/findUser', function (req, res) {
     
    // Pulls parameters from URL
    var email = req.param('email'); 

    // Set the internal DB variable
    var db = req.db;

    // Set the userCollection to a variable
    var collection = db.get('userCollection');
    
    findUser.findUser(email, collection, function (result) {
        res.send(result);
    });
});
module.exports = router;
