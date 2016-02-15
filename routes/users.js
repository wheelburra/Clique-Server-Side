var express = require('express');
var router = express.Router();

//GET userlist. 
// This was just the proof concept to get data from the database 
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.json(docs); //send JSON data!
    });
});

//POST to adduser.

/* not needed anymore
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
*/
module.exports = router;
