org.ekstep.text = {};
/**
 * @class  org.ekstep.plugins.text.MultilineTransliterator
 */
org.ekstep.text.MultilineTransliterator = Class.extend({
    error:"error",
    init: function($q, transliterateService) {
        this.$q = $q;
        this.transliterateService = transliterateService;
    },
    /**
     * This method Takes an English string and a language code and returns a
     * transliterated text in the given language.
     * @param {string} text -  Orignial text in english. Can have line breaks.
     * @param {string} languageCode - language code
     * @param {function} callback - callback function to be called when API call returns
     * @returns {void}
     */
    transliterate: function(text, languageCode, callback) {
        var instance = this;
        var $q = this.$q;
        var texts = _.map(text.split('\n'), encodeURI);

        var promisify = function(method, data) {
            var deferer = $q.defer();
            method(data, function(err, data) {
                if (err) {
                    deferer.reject(err)
                } else {
                    deferer.resolve(data);
                }
            });
            return deferer.promise;
        }

        var promises = _.map(texts, function(text) {
            var data = {};
            data.text = text;
            data.languages = [languageCode];

            if (text == "") {
                data.text = " ";
            }

            return promisify(instance.transliterateService.getTransliteration.bind(instance.transliterateService), data);
        });

        var mapValues = function(obj, callback) {
            if (angular.isArray(obj))
                return obj.map(callback)

            var ret = {}
            Object.keys(obj).forEach(function(key, val) {
                ret[key] = callback(obj[key], key)
            })
            return ret
        };

        var allSettled = function(promises) {
            return $q.all(mapValues(promises, function(promiseOrValue) {
                if (!promiseOrValue.then)
                    return { state: 'fulfilled', value: promiseOrValue }

                return promiseOrValue.then(function(value) {
                    return { state: 'fulfilled', value: value }
                }, function(reason) {
                    return { state: 'rejected', reason: reason }
                })
            }))
        };

        allSettled(promises).then(function(result) {

           instance.error = "";
            var transliteratedText = _.map(result, function(item, index) {
                if (item.state == 'fulfilled' && item.value.data.result.transliterations[languageCode] != undefined) {
                    var val = item['value']['data']['result']['transliterations'][languageCode]['output'];
                    if (val){
                        return decodeURIComponent(val);
                    }
                    else{
                        instance.error = "Transliteration unavailable at the moment";
                        return decodeURIComponent(texts[index]);
                    }
                } else {
                    instance.error = "Transliteration unavailable at the moment";
                    return decodeURIComponent(texts[index]);
                }
            }).join('\n');
            callback(instance.error, transliteratedText);
        })


    }

})

org.ekstep.text.MultilineTransliterator.create = function($q, transliterateService) {
    return new org.ekstep.text.MultilineTransliterator($q, transliterateService)
}

/**
 * @class  org.ekstep.plugins.text.WordExtractor
 */
org.ekstep.text.WordExtractor = Class.extend({
    /**
     * Get the currently selected object on the stage. If its a text plugin,
     * retuns the text else returns undefined.
     * @returns {string} plugin.editorObj.text - text being displayed by the text plugin
     */
    extractText: function() {
        var plugin = org.ekstep.contenteditor.api.getCurrentObject();
        if (plugin && plugin.manifest.id == "org.ekstep.text") {
            return plugin.editorObj.text;
        }
        return undefined;
    }
});
