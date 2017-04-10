var fs = require('fs');
var config = require('config');
var https = require('https');
var mongodb = require('mongodb');
var f = require('util').format;

module.exports = function(){

  var _scan = function (imagePath, strategy, dataHandler, errHandler) {
    fs.readFile(imagePath, (err, image) => {
      if (err) {
        console.error(err);
        return errHandler(err);
      }

      var image_data = new Buffer(image).toString('base64');
      var content = strategy.getContent(image_data);

      var appcode = config.aliyun.api.appcode;
      var options = strategy.getOptions(appcode);

      var req = https.request(options, res => {
        res.on('data', chunk => {
          var str = chunk.toString();
          console.log('Parse Data: ' + str);
          var result = strategy.getResult(str);
          strategy.reviseResult(result);
          return dataHandler(result);
        }).on('end', () => {
        });
      });

      req.on('error', err => {
        console.error(err);
        return errHandler(err);
      });

      req.write(content);
      req.end();
    });
  };

  var _persist = function(person, onComplete) {
    var mongoConf = config.mongodb;
    var url = f('mongodb://%s:%s/%s', mongoConf.host, mongoConf.port, mongoConf.database);

    mongodb.MongoClient.connect(url, function(err, db) {
      console.log("Connected successfully to server");

      db.collection('persons').insertOne(person, function(err, result) {
        db.close();
        if (err) {
          console.error(err);
        }

        onComplete(err, result);
      });
    });
  };

  var _load = function(conditions, onComplete) {
    var mongoConf = config.mongodb;
    var url = f('mongodb://%s:%s/%s', mongoConf.host, mongoConf.port, mongoConf.database);

    mongodb.MongoClient.connect(url, function(err, db) {
      console.log("Connected successfully to server");

      db.collection('persons').find(conditions).toArray(function(err, docs) {
        if(err) {
          console.error(err);
        }

        db.close();
        onComplete(err, docs);
      });
    });
  };

  return {
    scan: _scan,
    persist: _persist,
    load: _load
  };
}();
