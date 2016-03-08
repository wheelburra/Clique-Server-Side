/*  Retrieves Image related to User */

module.exports = {
    getPic: function (objID, collection, callback) {
        // finds the one document matching the objectID
        collection.findOne({"_id": objID}, function (err, doc) {
            if (err) {
                console.log("There was a problem searching the database.");
                callback({'message': err});
            }
            // found picture with matching id
            if (doc) {
                fs = require('fs');
                var file = doc.path;
                
                // should include doc.(data from db) in below callback for app to use?
                // returns binary data but not in a bson object?
                //fs.readFile(file, 'base64', function (err, data) {
                fs.readFile(file, function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    //doc gives all the related data from db
                    //callback({ 'document': doc, 'image': data });
                    callback(data); //Just send data when sending a picture for full view
                });
                
            }
        });
    }
};


