var assert = require('assert');
var fs = require('fs');
var path = require('path');
var https = require('https');
var config = require('config');

describe('IDScanner', function() {
  describe('#scan()', function() {
    it('should parse personal information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/idcard_example.jpg');
      fs.readFile(file_path, (err, data) => {
        if (err) {
          console.error(err);
          done(err);
        }
        var image_data = new Buffer(data).toString('base64');

        var content = "{\"inputs\":[{\"image\":{\"dataType\":50,\"dataValue\":\""+image_data+"\"},\"configure\":{\"dataType\":50,\"dataValue\":\"{\\\"side\\\":\\\"face\\\"}\"}}]}"

        var appcode = config.aliyun.api.appcode;

        var options = {
          host: 'dm-51.data.aliyun.com',
          path: '/rest/160601/ocr/ocr_idcard.json',
          method: 'POST',
          rejectUnauthorized: false,
          headers: {
            'Authorization': 'APPCODE ' + appcode,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        };

        var req = https.request(options, (res) => {
          res.on('data', (chunk) => {
            var str = chunk.toString();
            var result = JSON.parse(str);
            console.log(result.outputs[0].outputValue.dataValue);
          }).on('end', () => {
            done();
          });
        });

        req.on('error', (err) => {
          console.error(err);
          done(err);
        });

        req.write(content);
        req.end();
      });
    });
  });
});
