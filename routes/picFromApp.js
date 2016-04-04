/*  Retrieves Image related to User */
var fs = require('fs');
module.exports = {
    // not even a little bit ready... lees stuff in app.js looks better
    uploadPic: function (username, album, readPic, origName, albumCollection, callback) {
        console.log("incomming file path: " + readPic);
        console.log("incomming file name: " + origName);
        fs.readFile(readPic, function (err, data) {
            if (err) {
                console.log("read error");
                callback({'response': "Error"});
            } else {
                var imagePath = ".\\public\\images\\" + username + "\\" + album + "\\" + origName;

                fs.writeFile(imagePath, data, function (err) {
                    if (err) {
                        console.log("write error");
                        callback({'response': "Error"});
                    } else {
                        // insert adds a new album document to the album collection 
                        albumCollection.insert({
                            "path": imagePath
                        }, function (err) {
                            if (err) {
                                // Writing to the database error
                                console.log("There was a problem adding the new collection to the database.");
                                callback({'message': err});
                            } else {
                                console.log("wrote file: " + origName);
                                console.log("Added image document to the album collection");
                                callback({'response': "Image Saved"});
                            }
                        });
                    }
                });
            }
        });
    }
};
