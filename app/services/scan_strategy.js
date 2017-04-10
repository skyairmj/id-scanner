module.exports = function() {

  return {
    idCardFace: require('./strategies/idcard_face.js'),
    idCardBack: require('./strategies/idcard_back.js'),
    businessLicense: require('./strategies/business_license.js'),

    lookup: function(strategyKey) {
      switch(strategyKey) {
      case 'id face':
        return this.idCardFace;
      case 'id back':
        return this.idCardBack;
      case 'business license':
        return this.businessLicense;
      default:
        break;
      }
    }
  };
}();
