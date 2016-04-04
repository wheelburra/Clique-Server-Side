/*  Adds a username to the Friends List */
module.exports = {
    addFriend: function (friendName, collection, callback) {

        // Writing to the DB, adding a new user document to usercollection
        collection.insert({
            "name": friendName
        }, function (err) {
            if (err) {
                // Writing to the database error
                console.log("There was a problem adding the information to the database.");
                callback({'message': err});
            } else {
                console.log("Added Friend");
                callback("Added Friend");
            }
        });
    }
};