var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.format({
    'text/html': function(){
      res.render('upload', { layout: false });
    }
  });
});

router.post('/', function(req, res, next) {
});
