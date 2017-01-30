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

router.get('/music', (req, res, next) => {
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

router.get('/track/:id', (req, res, next) => {
  var trackId = req.params.id;

  Track.findById(trackId, (err, data) => {
    if (err) return err;
    res.send(data);
  });
});

router.get('/upload', (req, res, next) => {
  res.redirect('/');
});

router.put('/upload', (req, res, next) => {
  res.redirect('/');
});

router.delete('/upload', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
