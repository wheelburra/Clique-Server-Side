/*  Retrieves Image related to User */
module.exports = {
  // not even a little bit ready... lees stuff in app.js looks better
    uploadPic : function(req, callback) {
        fs.readFile(req.files.displayImage.path, function (err, data) {
        if (err) {
                console.log("There was a problem uploading");
                callback({ 'message': err });
            }
            // upload
            if (data) {
                //__dirname is one dir too deep
                var newPath = __dirname + "/public/images/  uploadedFileName  ";
                fs.writeFile(newPath, data, function (err) {
                console.log("There was a problem uploading");
                });
            }
        });
    }
};


