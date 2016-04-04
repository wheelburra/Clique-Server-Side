// Exports below function to be used in other modules
        var fs = require('fs');
module.exports = {
    //Attempts to push register to DB
    createAlbum: function (username, album, collection, albumCollection, masterAlbumCollection, callback) {
        // Sets album path to variable
        var albumPath = ".\\public\\images\\" + username + "\\" + album;
        // checks if album subdirectory does not exist
        if (!fs.existsSync(albumPath)) {
            // Creates the album subdirectory
            fs.mkdir(albumPath, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("Directory created successfully!");
                // insert adds a new album collection
                // Pretty sure this insert can be relocated to the picFromApp function
                albumCollection.insert({
                    "create": "inserting this creates the new collection"
                }, function (err) {
                    if (err) {
                        // Writing to the database error
                        console.log("There was a problem adding the new collection to the database.");
                        callback({'message': err});
                    } else {
                        // insert adds a new album document to the users master album collection 
                        masterAlbumCollection.insert({
                            "name": album,
                            "collection": username + collection
                        }, function (err) {
                            if (err) {
                                // Writing to the database error
                                console.log("There was a problem adding the new collection to the database.");
                                callback({'message': err});
                            } else {
                                console.log('Album and collection created');
                                callback('success');
                            }
                        });
                    }
                });
            });
        } else {
            // album already exists
            console.log("Directory already exists!");
            callback('Entry is blank or Album name already exists.');
        }
    }
};