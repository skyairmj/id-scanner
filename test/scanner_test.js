var fs = require('fs');
var path = require('path');
var should = require('should');
var scanner = require(path.join(__dirname, '../app/services/scanner.js'));
var strategy = require(path.join(__dirname, '../app/services/scan_strategy.js'));

describe('Scanner', function() {
  describe('#scan()', function() {
    it('should parse id face side information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/id_face_example.jpg');
      fs.readFile(file_path, (err, data) => {
        if (err) {
          console.error(err);
          done(err);
        }

        scanner.parse(data, strategy.idcard_face, result => {
          result.success.should.be.true();
          result.address.should.be.exactly('浙江省嘉兴市江滨区滨江街望江花园634号');
          result.birth.should.be.exactly('19821010');
          result.name.should.be.exactly('鲁彬');
          result.nationality.should.be.exactly('汉');
          result.num.should.be.exactly('421011198210101497');
          result.sex.should.be.exactly('男');
          done();
        },
        error => {
          done(err);
        });
      });
    });


    it('should parse id back side information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/id_back_example.jpg');
      fs.readFile(file_path, (err, data) => {
        if (err) {
          console.error(err);
          done(err);
        }

        scanner.parse(data, strategy.idcard_back, result => {
          result.success.should.be.true();
          result.start_date.should.be.exactly('20060322');
          result.end_date.should.be.exactly('长期');
          result.issue.should.be.exactly('嘉兴市公安局');
          done();
        },
        error => {
          done(err);
        });
      });
    });


    it('should parse license information', function (done) {
      var file_path = path.join(__dirname, '/fixtures/license_example.jpg');
      fs.readFile(file_path, (err, data) => {
        if (err) {
          console.error(err);
          done(err);
        }

        scanner.parse(data, strategy.business_license, result => {
          result.success.should.be.true();
          result.address.should.be.exactly('广州市天河区黄埔大道西路100号之二710A房');
          result.capital.should.be.exactly('壹仟万元整');
          result.name.should.be.exactly('广东新佳联投资管理有限公司');
          result.person.should.be.exactly('许世明');
          result.reg_num.should.be.exactly('440101000233515');
          result.valid_period.should.be.exactly('长期');
          done();
        },
        error => {
          done(err);
        });
      });
    });
  });
});
