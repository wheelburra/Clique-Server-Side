/* global err */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
//this connects to the mongo database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/node-android');
//Multer adds a body object and a file or files object to the request object. needed??
//var multer  = require('multer');

//this sets up the routing
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Port of choice to listen, works on port 3000 as well
var port = process.env.PORT || 8080;
app.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
}); 

/* NEW - IMAGE UPLOADING */
var path = require('path');
var fs = require('fs');

app.post('/pictures', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./pictures/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
    // ...
});

// routing stuff
app.use('/', routes);
app.use('/users', users);
// app.use('/pictures', pictures);

// app.use(express.bodyParser({uploadDir:'/pictures'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Nice to See.
console.log('Server started! At http://localhost:' + port);

module.exports = app;
