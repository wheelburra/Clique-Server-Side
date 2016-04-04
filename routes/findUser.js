// Searches the db for an email match and returns the corrisponding username
module.exports = {
    findUser: function (email, collection, callback) {
        // Searches database for email match
        collection.findOne({email: email}, {password: 0}, function (err, doc) {
            if (err) {
                console.log("There was a problem searching the database.");
                callback({'message': err});
            }
            // Found matching email and returns username
            if (doc === null) {
                console.log("No match found");
                callback("No Match Found");
            } else {
                console.log("found " + doc.username);
                callback(doc.username);
            }
        });
    }
};