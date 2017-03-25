module.exports = function(){

  return {
    idcard_face: require('./strategies/idcard_face.js'),
    idcard_back: require('./strategies/idcard_back.js'),
    business_license: require('./strategies/business_license.js'),

    lookup: function(strategyKey) {
      switch(strategyKey)
      {
        case 'id face':
          return this.idcard_face
        case 'id back':
          return this.idcard_back;
        case 'business license':
          return this.business_license;
        default:
          break;
      }
    }
  }
}();
