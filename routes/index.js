var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Music application home page' });
});

router.get('/music', (req, res) => {
  var fileId = req.query.id;
  var file = __dirname + '/music/' + fileId;
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

module.exports = router;
