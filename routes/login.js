
// Exports below function to be used in other modules
module.exports =  { 

    login : function (username, password, collection, callback) { //Searches passed collection for user and returns callback
        
        // Finds a single document in the collection
        collection.findOne({ username: username }, function (err, doc) {
            if (err) {
                console.log("There was a problem retrieving the information to the database.");
                callback({ 'message': err });
            }
            // Found a username match in databse
            if (doc) {
                var urlPass = password;
                var dbPass = doc.password;

                // the password matches!
                if (urlPass == dbPass) {
                    console.log(dbPass + " matches " + urlPass);
                    // Send user profile in JSON
                    callback(doc);
                }
                // The password is incorrect
                else {
                    console.log("Password does not match");
                    callback("Password does not match");
                }
            }
            // No username match found in database
            else {
                console.log(username + " does not exist");
                callback("That username does not exist");
            }
        });
    }
};