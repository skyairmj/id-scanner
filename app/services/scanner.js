var config = require('config');
var https = require('https');

module.exports = function(){

  var _scan = function () {

  };

  var _parse = function (image, strategy, dataHandler, errorHandler) {
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
      errorHandler(err);
    });

    req.write(content);
    req.end();
  };

  return {
    scan: _scan,
    parse: _parse
  };
}();
