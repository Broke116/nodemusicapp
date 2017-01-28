var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var Track = require('../models/track.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  Track.find(function (err, data) {
    res.render('index', { title: 'Music application home page', tracks: data });
  });  
});

router.get('/music', (req, res) => {
  var fileId = req.query.id;
  var file = __dirname + '/public/uploads/' + fileId;
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

module.exports = router;
