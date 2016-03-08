var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Clique'});
});

/* GET Userlist stuff page displays the usercollection for testing purposes. */
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('userCollection');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

// Same as above test with just printing JSon data
router.get('/collection', function (req, res) {
    var db = req.db;
    var collection = db.get('userCollection');
    collection.find({}, {}, function (e, docs) {
        res.json(docs); //send JSON data!
    });
});

//Testing url paramter passing and returning, no DB involved
router.get('/urltest', function (req, res) {
    var id = req.param('id');
    var token = req.param('token');
    res.send(id + ' ' + token);
});

// GET regTest.jade the REGISTRATION TEST PAGE. 
router.get('/regTest', function (req, res) {
    res.render('regTest', {title: 'Simulates a User Registration to /register'});
});

// GET loginTest.jade the LOGIN TEST PAGE. 
router.get('/loginTest', function (req, res) {
    res.render('loginTest', {title: 'Simulates a User Login to /login'});
});

module.exports = router;
