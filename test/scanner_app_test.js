var path = require('path');
var request = require('supertest');
var should = require('should');

describe('ScannerApp', function() {
  var app;
  before(function(){
    app = require(path.join(__dirname, '../app.js'));
  });

  describe('GET /', function() {
    it('should respond with title parameter', function (done) {
      request(app).get('/').set('Accept', 'application/json')
        .expect(200, {
          title: 'Express'
        }, done);
    });
  });

  describe('POST /', function() {
    it('should handle file upload and respond image data', function (done) {
      var imageName = 'id_face_example.jpg';
      request(app).post('/').set('Accept', 'application/json')
        .attach('inputFile', path.join(__dirname, '/fixtures/'+imageName))
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
        }, done);
    });
  });
});
