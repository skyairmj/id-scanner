module.exports = {
  getContent: function (image) {
    return "{\"inputs\":[{\"image\":{\"dataType\":50,\"dataValue\":\""+image+"\"},\"configure\":{\"dataType\":50,\"dataValue\":\"{\\\"side\\\":\\\"face\\\"}\"}}]}";
  },
  getOptions: function(appcode) {
    return {
      host: 'dm-51.data.aliyun.com',
      path: '/rest/160601/ocr/ocr_idcard.json',
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
  reviseResult: function(result){
    delete result.config_str;
    delete result.face_rect;
    delete result.request_id;
    return result;
  }
};
