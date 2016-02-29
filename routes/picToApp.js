/*  Retrieves Image related to User */

module.exports = {
    getPic: function (objID, collection, callback) {
        // currently using name to simulate incomming objectID match to _id
        collection.findOne({"name": objID}, function (err, doc) {
            if (err) {
                console.log("There was a problem searching the database.");
                callback({'message': err});
            }
            // found picture with matching id
            if (doc) {
                fs = require('fs');
                var name = doc.name;
                //var file = doc.path;
                var file = "public\\images\\meme.jpg";
                
                // should include doc.(data from db) in below callback for app to use?
                // returns binary data but not in a bson object?
                fs.readFile(file, 'base64', function (err, data){
                    if (err) {
                        return console.log(err);
                    }
                    console.log("found the image: " + data);
                    //doc gives all the related data from db
                    callback(doc, data);
                });
                
            }
        });
    }
};


