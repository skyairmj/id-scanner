var assert = require('assert');
var fs = require('fs');
var path = require('path');
var https = require('https');
var config = require('config');
var should = require('should');


describe('IDScanner', function() {
  describe('#scan()', function() {
    it('should parse id front information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/id_face_example.jpg');
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
            var result_str = JSON.parse(str).outputs[0].outputValue.dataValue;
            console.log(result_str);
            var result = JSON.parse(result_str);
            result.success.should.be.true();
            result.address.should.be.exactly('浙江省嘉兴市江滨区滨江街望江花园634号');
            result.birth.should.be.exactly('19821010');
            result.name.should.be.exactly('鲁彬');
            result.nationality.should.be.exactly('汉');
            result.num.should.be.exactly('421011198210101497');
            result.sex.should.be.exactly('男');
            done();
          }).on('end', () => {

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

    it('should parse id background information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/id_back_example.jpg');
      fs.readFile(file_path, (err, data) => {
        if (err) {
          console.error(err);
          done(err);
        }
        var image_data = new Buffer(data).toString('base64');

        var content = "{\"inputs\":[{\"image\":{\"dataType\":50,\"dataValue\":\""+image_data+"\"},\"configure\":{\"dataType\":50,\"dataValue\":\"{\\\"side\\\":\\\"back\\\"}\"}}]}"

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
            var result_str = JSON.parse(str).outputs[0].outputValue.dataValue;
            console.log(result_str);
            var result = JSON.parse(result_str);
            result.success.should.be.true();
            result.start_date.should.be.exactly('20060322');
            result.end_date.should.be.exactly('长期');
            result.issue.should.be.exactly('嘉兴市公安局');
            done();
          }).on('end', () => {
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


    it('should parse license information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/license_example.jpg');
      fs.readFile(file_path, (err, data) => {
        if (err) {
          console.error(err);
          done(err);
        }
        var image_data = new Buffer(data).toString('base64');

        var content = "{\"inputs\":[{\"image\":{\"dataType\":50,\"dataValue\":\""+image_data+"\"}}]}"

        var appcode = config.aliyun.api.appcode;

        var options = {
          host: 'dm-58.data.aliyun.com',
          path: '/rest/160601/ocr/ocr_business_license.json',
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
            var result_str = JSON.parse(str).outputs[0].outputValue.dataValue;
            console.log(result_str);
            var result = JSON.parse(result_str);
            result.success.should.be.true();
            result.address.should.be.exactly('广州市天河区黄埔大道西路100号之二710A房');
            result.capital.should.be.exactly('壹仟万元整');
            result.name.should.be.exactly('广东新佳联投资管理有限公司');
            result.person.should.be.exactly('许世明');
            result.reg_num.should.be.exactly('440101000233515');
            result.valid_period.should.be.exactly('长期');
            done();
          }).on('end', () => {
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
