var ECMLBuilder = require('./ecmlBuilder');

var E2EConverter = function() {
    this.ecmlBuilder = new ECMLBuilder();
};

E2EConverter.prototype.buildECML = function(ecmlJSON, prettyPrint) {
    return this.ecmlBuilder.buildECML(ecmlJSON, prettyPrint);
};

module.exports = E2EConverter;