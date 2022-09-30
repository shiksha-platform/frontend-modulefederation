//var _ = require('lodash');
var builder = require('xmlbuilder');

var ECMLBuilder = function() {

    this.start = function(data, xml) {
        var instance = this;
        var props = _.omitBy(data, _.isObject);
        _.forIn(props, function(value, key) {
            instance.addProperty(key, value, xml);
        });

        var objects = _.pickBy(data, _.isObject);
        _.forIn(objects, function(value, key) {
            instance.addObject(key, value, xml);
        });
    }

    this.addProperty = function(key, value, xml) {
        switch (key) {
            case "__text":
                xml = xml.txt(value);
                break;
            case "__cdata":
                xml = xml.dat(value);
                break;
            default:
                if (value === 0) {
                    xml = xml.att(key, "0");
                } else {
                    xml = xml.att(key, (value || '').toString());
                }
        }
    }

    this.addObject = function(key, value, xml) {
        var instance = this;
        if (_.isArray(value)) {
            _.each(value, function(value) {
                instance.buildXML(key, value, xml);
            });
        } else {
            instance.buildXML(key, value, xml);
        }
    }

    this.buildXML = function(name, data, xml) {
        var instance = this;
        xml = xml.ele(name);
        var props = _.omitBy(data, _.isObject);
        _.forIn(props, function(value, key) {
            instance.addProperty(key, value, xml);
        });
        var objects = _.pickBy(data, _.isObject);
        _.forIn(objects, function(value, key) {
            if (key === '__cdata') {
                instance.addProperty(key, JSON.stringify(value), xml);
            } else {
                instance.addObject(key, value, xml);
            }
        });
        xml = xml.up()
    }

}

ECMLBuilder.prototype.buildECML = function(json, prettyPrint) {
    var xml = builder.create('theme');
    this.start(json.theme, xml);
    if (prettyPrint) {
        return xml.end({ pretty: true });
    } else {
        return xml.end();
    }
}

module.exports = ECMLBuilder;