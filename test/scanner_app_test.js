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
      request(app).post('/').set('Accept', 'application/json')
        .attach('inputFile', path.join(__dirname, '/fixtures/id_face_example.jpg'))
        .expect(200)
        .then(res => {
          res.body.success.should.be.exactly(true);
          res.body.originalFilename.should.be.exactly('id_face_example.jpg');
          done();
        });
    });
  });
});
