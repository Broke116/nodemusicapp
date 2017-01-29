var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var upload = require('jquery-file-upload-middleware');
var mm = require('musicmetadata');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.connect('localhost:27017/musicapp');
var Track = require('./models/track.js');

upload.configure({
  uploadDir: __dirname + '/public/uploads',
  uploadUrl: '/uploads'
});

// view engine setup
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use('/upload', upload.fileHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


upload.on('error', (err) => {
  if (err) return console.log(err);
});

upload.on('abort', (fileInfo) => {
  console.log('Abborted upload of ' + fileInfo.name);
});

upload.on('end', (fileInfo) => {
  var filePath = path.join(__dirname, 'public', 'uploads', fileInfo.name);

  if (fileInfo.name == fileInfo.originalName) {
    var parse = mm(fs.createReadStream(filePath), function (err, metadata) {
      if (err) throw err;
      Track.findOne({ 'name': metadata.title }, function (err, track) {
        if (err) return console.log(err);
        if (track) return console.log('Email is already in use');

        var newTrack = new Track();
        newTrack.file = fileInfo.name;
        newTrack.name = metadata.title;
        newTrack.artist = metadata.artist;
        newTrack.year = metadata.year;
        newTrack.album = metadata.album;
        newTrack.genre = metadata.genre;
        newTrack.save(function (err, result) {
          if (err) return console.log(err);
          return path.resolve('/');
        });
      }); // track
    }); //parse
  } else {
    console.log('error');
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
