﻿// Exports below function to be used in other modules
var fs = require('fs');
module.exports = {
    
    //Attempts to push register to DB
    register : function (name, username, password, email, collection, callback) { 
        
        // Searches database for existing username match
        collection.findOne({ username: username }, function (err, doc) {
            if (err) {
                console.log("There was a problem searching the database.");
                callback({ 'message': err });
            }
            // Username already exists in the database
            if (doc) {
                console.log("Username already exists.");
                callback("Username already exists.");
            } else {
                // Writing to the DB, adding a new user document to usercollection
                collection.insert({
                    "name": name,
                    "username": username,
                    "password": password,
                    "email": email
                }, function (err) {
                    if (err) {
                        // Writing to the database error
                        console.log("There was a problem adding the information to the database.");
                        callback({ 'message': err });
                    } else {
                        // Creates the users image subdirectory for user albums
                        var userPath = ".\\public\\images\\" + username;
                        fs.mkdirSync(userPath);
                        
                        // Return profile information in JSON 
                        callback("Welcome " + name + "! Press back arrow to log in.");
                    }
                });
            }
        });
    }
};