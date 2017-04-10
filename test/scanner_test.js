var path = require('path');
var should = require('should');
var scanner = require(path.join(__dirname, '../app/services/scanner.js'));
var strategy = require(path.join(__dirname, '../app/services/scan_strategy.js'));
var config = require('config');
var f = require('util').format;
var MongoClient = require('mongodb').MongoClient;

describe('Scanner', function() {
  describe('#scan()', function() {
    it('should scan id face side information', function (done) {
      var imagePath = path.join(__dirname, '/fixtures/id_face_example.jpg');

      scanner.scan(imagePath, strategy.idcard_face, result => {
        result.success.should.be.true();
        result.address.should.be.exactly('浙江省嘉兴市江滨区滨江街望江花园634号');
        result.birth.should.be.exactly('19821010');
        result.name.should.be.exactly('鲁彬');
        result.nationality.should.be.exactly('汉');
        result.num.should.be.exactly('421011198210101497');
        result.sex.should.be.exactly('男');
        done();
      },
      err => {
        should.not.exist(err);
      });
    });


    it('should scan id back side information', function (done) {
      var imagePath = path.join(__dirname, '/fixtures/id_back_example.jpg');

      scanner.scan(imagePath, strategy.idcard_back, result => {
        result.success.should.be.true();
        result.start_date.should.be.exactly('20060322');
        result.end_date.should.be.exactly('长期');
        result.issue.should.be.exactly('嘉兴市公安局');
        done();
      },
      err => {
        should.not.exist(err);
      });
    });


    it('should scan license information', function (done) {
      var imagePath = path.join(__dirname, '/fixtures/license_example.jpg');

      scanner.scan(imagePath, strategy.business_license, result => {
        result.success.should.be.true();
        result.address.should.be.exactly('广州市天河区黄埔大道西路100号之二710A房');
        result.capital.should.be.exactly('壹仟万元整');
        result.name.should.be.exactly('广东新佳联投资管理有限公司');
        result.person.should.be.exactly('许世明');
        result.reg_num.should.be.exactly('440101000233515');
        result.valid_period.should.be.exactly('长期');
        done();
      },
      err => {
        should.not.exist(err);
      });
    });
  });

  describe('#persist()', function() {
    it.skip('shoud open a mongodb connection and make a query', function(done) {
      var mongoConf = config.mongodb;
      var url = f('mongodb://%s:%s/%s', mongoConf.host, mongoConf.port, mongoConf.database);

      MongoClient.connect(url, function(err, db) {
        console.log("Connected successfully to server");
        db.dropDatabase();

        var collection = db.collection('inserts');

        collection.insertOne({a:1, b:2}, function(err, r) {
          should.not.exist(err);

          r.insertedCount.should.be.exactly(1);

          collection.find({a:1, b:2}).toArray(function(err, docs) {
            should.not.exist(err);

            docs.length.should.be.exactly(1);

            db.close();
            done();
          });
        });
      });
    });

    it('should persist scan result to mongodb', done => {
      var date = new Date().getTime();
      var result = {
        sucess: true,
        address: '浙江省嘉兴市江滨区滨江街望江花园634号',
        birth: '19821010',
        name: '鲁彬',
        nationality: '汉',
        num: date,
        sex: '男'
      };

      return new Promise((resolve) => {
        scanner.persist(result, (err, result) => {
          should.not.exist(err);
          resolve(err, result);
        });
      }).then((err) => {
        should.not.exist(err);
        scanner.load({num: date}, (err, docs) => {
          should.not.exist(err);

          docs.length.should.be.exactly(1);
          docs[0].num.should.be.exactly(date);
          done();
        });
      });
    });
  });
});
