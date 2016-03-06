var express = require('express');
var router = express.Router();
var login = require('./login'); //allows login.js exports to be used
var register = require('./register'); //allows register.js exports to be used
var picToApp = require('./picToApp'); //allows picToApp.js exports to be used
var getAlbum = require('./getAlbum'); //allows picToApp.js exports to be used
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
    //var objID = "56d4da380ce7c34dc33a5753"; //this is local to alex's DB  

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

//Route calls getAlbum function from getAlbum.js file
router.get('/getAlbum', function (req, res) {
    
    // pull parameters from URL
    //var album = req.param('album');
    //var username = req.param('username');
    
    //hard coded for testing purposes
    var album = 'album1';
    var username = 'skyweezy';
   
    // Set the internal DB variable
    var db = req.db;
    
    // Set the user profile collection to a variable
    var collection = db.get(album);

    // Return callback from register function
    getAlbum.getAlbum(username, collection, function (result) {
        res.contentType('application/json');
        console.log(result);
        res.send(result);
    });
});
module.exports = router;
