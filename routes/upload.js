var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');
var scanner = require(path.join(__dirname, '../app/services/scanner.js'));
var strategy = require(path.join(__dirname, '../app/services/scan_strategy.js'));

router.get('/', function(req, res, next) {
  res.format({
    'text/html': function(){
      res.render('upload', { layout: false });
    }
  });
});

// router.post('/', function(req, res, next) {
//   res.send("success");
// });

router.post('/', function(req, res, next) {
  var form = new multiparty.Form({uploadDir: './uploads/'});
  form.parse(req, function(err, fields, files) {
    if(err){
      console.error('parse error: ' + err);
      next(err)
    }

    console.log('parse fields:'+  JSON.stringify(fields));
    console.log('parse files: ' + JSON.stringify(files));

    var inputFile = files.files[0];
    var uploadedPath = inputFile.path;
    var originalFilename = inputFile.originalFilename;

    scanner.scan(uploadedPath, strategy.lookup(fields.type.toString()), result => {
      if(result.success) {
        res.format({
          'application/json': function () {
            res.json({ success: true, originalFilename: originalFilename, result: result });
          }
        });
      } else {
        res.format({
          'application/json': function () {
            res.status(500).json({ success: false, originalFilename: originalFilename, result: result });
          }
        });
      }
    },
    err => {
      next(err)
    });
  });

});

module.exports = router;
