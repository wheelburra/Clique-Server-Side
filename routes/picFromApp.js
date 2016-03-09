/*  Retrieves Image related to User */
var fs = require('fs');
module.exports = {
    // not even a little bit ready... lees stuff in app.js looks better
    uploadPic: function (username, album, readPic, origName, collection, callback) {
        console.log("incomming file path: " + readPic);
        console.log("incomming file name: " + origName);
        fs.readFile(readPic, function (err, data) {
            if (err) {
                console.log("read error");
                callback({'response': "Error"});
            } else {
                var albumPath = ".\\public\\images\\" + username + "\\" + username + album + origName;

                fs.writeFile(albumPath, data, function (err) {
                    if (err) {
                        console.log("write error");
                        callback({'response': "Error"});
                    } else {
                        console.log("wrote file: " + origName);
                        callback({'response': "Saved"});
                    }
                });
            }
        });
    }
};
