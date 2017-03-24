var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.format({
    'application/json': function () {
      res.send({ title: 'Express' });
    },
    'text/html': function(){
      res.render('index', { title: 'Express' });
    }
  });
});

/* POST Image. */
router.post('/', function(req, res, next) {
  var form = new multiparty.Form({uploadDir: './uploads/'});
  form.parse(req, function(err, fields, files) {
    if(err){
      console.log('parse error: ' + err);
      next(err)
    }

    var filesTmp = JSON.stringify(files, null, 2);
    console.log('parse files: ' + filesTmp);

    var inputFile = files.inputFile[0];
    var uploadedPath = inputFile.path;
    var originalFilename = inputFile.originalFilename;

    res.format({
      'application/json': function () {
        res.send({ success: true, originalFilename: originalFilename });
      },
      'text/html': function(){
        res.render('index', { title: 'Express' });
      }
    });
  });

});

module.exports = router;
