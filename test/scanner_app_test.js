var path = require('path');
var request = require('supertest');
var should = require('should');
var config = require('config');
var f = require('util').format;
var MongoClient = require('mongodb').MongoClient;

describe('ScannerApp', function() {
  var app;
  before(function(){
    app = require(path.join(__dirname, '../app.js'));
  });

  describe('GET /', function() {
    it('should respond with title parameter', function (done) {
      request(app).get('/').set('Accept', 'application/json')
        .expect(200, {
          title: 'Scanner'
        }, done);
    });
  });

  describe('POST /', function() {
    it('should scan uploaded id face image information', function (done) {
      var imageName = 'id_face_example.jpg';
      request(app).post('/').set('Accept', 'application/json')
        .field('type', 'id face')
        .attach('qqfile', path.join(__dirname, '/fixtures/'+imageName))
        .expect(200, {
          success: true,
          originalFilename: imageName,
          result: {
            address: '浙江省嘉兴市江滨区滨江街望江花园634号',
            birth: '19821010',
            name: '鲁彬',
            nationality: '汉',
            num: '421011198210101497',
            sex: '男',
            success: true
          }
        }, () => {
          var mongoConf = config.mongodb;
          var url = f('mongodb://%s:%s/%s', mongoConf.host, mongoConf.port, mongoConf.database);

          MongoClient.connect(url, function(err, db) {
            console.log("Connected successfully to server");

            db.collection('persons').find({num: '421011198210101497'}).toArray(function(err, docs) {
              should.not.exist(err)

              docs.length.should.be.above(0);

              db.close();
              done();
            });
          });
        });
    });

    it.only('should return EMPTY information for uploaded blank image', function (done) {
      var imageName = 'blank.jpeg';
      request(app).post('/').set('Accept', 'application/json')
        .field('type', 'id face')
        .attach('qqfile', path.join(__dirname, '/fixtures/'+imageName))
        .expect(422, {
          success: false,
          originalFilename: imageName,
          result: {
            address: '',
            birth: '',
            error_msg: 'face results are all empty',
            name: '',
            nationality: '',
            num: '',
            sex: '',
            success: false
          }
        }, done);
    });

    it.skip('should scan uploaded id back image information', function (done) {
      var imageName = 'id_back_example.jpg';
      request(app).post('/').set('Accept', 'application/json')
        .field('type', 'id back')
        .attach('qqfile', path.join(__dirname, '/fixtures/'+imageName))
        .expect(200, {
          success: true,
          originalFilename: imageName,
          result: {
            start_date: '20060322',
            end_date: '长期',
            issue: '嘉兴市公安局',
            success: true
          }
        }, done);
    });

    it.skip('should scan uploaded business license image information', function (done) {
      var imageName = 'license_example.jpg';
      request(app).post('/').set('Accept', 'application/json')
        .field('type', 'business license')
        .attach('qqfile', path.join(__dirname, '/fixtures/'+imageName))
        .expect(200, {
          success: true,
          originalFilename: imageName,
          result: {
            address: '广州市天河区黄埔大道西路100号之二710A房',
            capital: '壹仟万元整',
            name: '广东新佳联投资管理有限公司',
            person: '许世明',
            reg_num: '440101000233515',
            valid_period: '长期',
            success: true
          }
        }, done);
    });
  });
});
