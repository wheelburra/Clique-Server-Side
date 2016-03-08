// Exports below function to be used in other modules
var fs = require('fs');
module.exports = {
    //Attempts to push register to DB
    createAlbum: function (username, album, callback) {
        // Sets album path to variable
        var albumPath = ".\\public\\images\\" + username +"\\" + username + album;
        // checks if album subdirectory does not exist
        if (!fs.existsSync(albumPath)) {
            // Creates the album subdirectory
            fs.mkdir(albumPath, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("Directory created successfully!");
                callback('Album created');
            });
          // album already exists
        } else {
            console.log("Directory already exists!");
            callback('Album already exists');
        }
    }
};