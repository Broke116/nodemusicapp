var express = require('express');
var fs = require('fs');
var path = require('path');
var upload = require('jquery-file-upload-middleware');
var musicmeta = require('musicmetadata');
var router = express.Router();

var Track = require('../models/track.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  var tracks = [];
  Track.find(function (err, data) {
    tracks.push(data);
  });
  res.render('index', { title: 'Music application home page', tracks: tracks });
});

router.get('/music', (req, res) => {
  var fileId = req.query.id;
  var file = __dirname + '/uploads/' + fileId;
  fs.exists(file, (exists) => {
    if (exists) {
      var stream = fs.createReadStream(file);
      stream.pipe(res);
    } else {
      res.send("404 file not found");
      res.end();
    }
  });
});

router.get('/upload', (req, res) => {
  res.redirect('/');
});

router.put('/upload', (req, res) => {
  res.redirect('/');
});

router.delete('/upload', (req, res) => {
  res.redirect('/');
});

upload.on('error', (err) => {
  if (err) return console.log(err);
});

upload.on('abort', (fileInfo) => {
  console.log('Abborted upload of ' + fileInfo.name);
});

upload.on('end', (fileInfo) => {
  var filePath = path.join(__dirname, 'uploads', fileInfo.name);

  console.log(filePath);
  if(fileInfo.name == fileInfo.originalName){
    var parse = mm(fs.createReadStream(filePath), {duration: true});

    parse.on('metadata', (meta) => {
      
    });
  }
});

module.exports = router;
