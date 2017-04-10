var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');
var scanner = require(path.join(__dirname, '../app/services/scanner.js'));
var strategy = require(path.join(__dirname, '../app/services/scan_strategy.js'));

router.get('/', function(req, res) {
  res.format({
    'application/json': function () {
      res.json({ title: 'Express' });
    },
    'text/html': function() {
      res.render('index', { title: 'Scanner' });
    }
  });
});

router.post('/', function(req, res, next) {
  var form = new multiparty.Form({uploadDir: './uploads/'});
  form.parse(req, function(err, fields, files) {
    if(err) {
      console.error('parse error: ' + err);
      next(err);
    }

    var filesTmp = JSON.stringify(files, null, 2);
    console.log('Upload Files: ' + filesTmp);

    var inputFile = files.qqfile[0];
    var uploadedPath = inputFile.path;
    var originalFilename = inputFile.originalFilename;

    scanner.scan(uploadedPath, strategy.lookup('id face'), person => {
      if(person.success) {
        scanner.persist(person, () => {
          res.format({
            'application/json': function () {
              res.json({ success: true, originalFilename: originalFilename, result: person });
            }
          });
        });
      } else {
        res.format({
          'application/json': function () {
            res.status(422).json({ success: false, originalFilename: originalFilename, result: person });
          }
        });
      }
    },
    err => {
      next(err);
    });
  });

});

module.exports = router;
