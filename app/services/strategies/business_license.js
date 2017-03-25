module.exports = {
  getContent: function (image) {
    return "{\"inputs\":[{\"image\":{\"dataType\":50,\"dataValue\":\""+image+"\"}}]}"
  },
  getOptions: function(appcode) {
    return {
      host: 'dm-58.data.aliyun.com',
      path: '/rest/160601/ocr/ocr_business_license.json',
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'APPCODE ' + appcode,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    };
  },
  getResult: function(str) {
    var dataValue = JSON.parse(str).outputs[0].outputValue.dataValue
    return JSON.parse(dataValue);
  },
  reviseResult: function(result) {
    delete result.config_str;
    delete result.request_id;
    return result;
  }
};
