/*  Retrieves Friends List */
module.exports = {
    getFriends: function (collection, callback) {
        // returns the list of friends
        collection.find({}, {}, function (err, result) {
            if (err) {
                console.log("Error Searching Document");
                callback({'message': err});
            } else {
                console.log("Returned Entire Friends List");
                callback(result);
            }
        });
    }
};