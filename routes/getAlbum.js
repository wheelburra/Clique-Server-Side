// Exports below function to be used in other modules
fs = require('fs');
module.exports = {
//Attempts to push register to DB
    getAlbum: function (username, collection, callback) {
        var result = [];
        collection.find({}, {stream: true})
                .each(function (doc) {
                    // need to add the binary image file data somehow    
                    //    var file = doc.path;
                    //    fs.readFile(file, "utf-8", function (err, data) {
                    //       if (err) {
                    //            return console.log(err);
                    //        }
                    result.push(doc.name, doc.path);
                    //    })
                })
                .error(function (err) {
                    callback({'message': err});
                })
                .success(function () {
                    callback(JSON.stringify(result));
                });
    }
};



