var fs = require('fs');
var config = require('config');
var https = require('https');

module.exports = function(){

  var _scan = function (imagePath, strategy, dataHandler, errHandler) {
    fs.readFile(imagePath, (err, image) => {
      if (err) {
        console.error(err);
        errHandler(err);
      }

      var image_data = new Buffer(image).toString('base64');
      var content = strategy.getContent(image_data);

      var appcode = config.aliyun.api.appcode;
      var options = strategy.getOptions(appcode);

      var req = https.request(options, res => {
        res.on('data', chunk => {
          var str = chunk.toString();
          console.log(str);
          var result = strategy.getResult(str);
          dataHandler(result);
        }).on('end', () => {
        });
      });

      req.on('error', err => {
        console.error(err);
        errHandler(err);
      });

      req.write(content);
      req.end();
    });
  };

  return {
    scan: _scan
  };
}();
