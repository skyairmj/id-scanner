module.exports = function(){

  return {
    idcard_face: require('./strategies/idcard_face.js'),
    idcard_back: require('./strategies/idcard_back.js'),
    business_license: require('./strategies/business_license.js')
  }
}();
