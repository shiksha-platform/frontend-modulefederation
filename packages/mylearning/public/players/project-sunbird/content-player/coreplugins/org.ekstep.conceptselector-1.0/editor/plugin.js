/**
 *
 * Plugin to browse concepts and select
 * @class conceptselector
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 * @listens org.ekstep.image:conceptselector:init
 */

org.ekstep.contenteditor.basePlugin.extend({
    conceptData: undefined,
    callback: undefined,
    /**
     * set default limit to search API
     * @memberof conceptselector
     */
    limit: 200,
    /**
     * Selected concept array
     * @memberof conceptselector
     */
    selectors: [],
    /**
     *
     * Concepts data for concept tree
     * @memberof conceptselector
     */
    concepts: [],
    /**
     *
     * Registers events.
     * @memberof conceptselector
     */
    initialize: function() {
        var instance = this;

        /**Get concept data**/
        instance.getConcept(0, instance.limit, instance, function() { instance.initData(instance); });
        ecEditor.addEventListener(instance.manifest.id + ":init", this.initConceptBrowser, this);
    },
    /**
     *
     * Registers events.
     * @memberof conceptselector
     */
    initData: function(instance) {
        var instance = instance || this;
        var domains = [];

        var data = { "request": { "filters": { "objectType": ["Dimension", "Domain"] } } };

        /**Get domains and dimensions data**/
        ecEditor.getService('search').search(data, function(err, resp) {
            if (!err && resp.data && resp.data.result && ecEditor._.isArray(resp.data.result.domains)) {
                ecEditor._.forEach(resp.data.result.domains, function(value) {
                    var domain = {};
                    domain.id = value.identifier;
                    domain.name = value.name;
                    var domainChild = [];

                    /**Get domain child**/
                    ecEditor._.forEach(getChild(value.identifier, resp.data.result.dimensions), function(value) {
                        var dimension = {};
                        dimension.id = value.id;
                        dimension.name = value.name;

                        /**Get dimension child**/
                        dimension.nodes = getChild(value.id, instance.concepts);
                        domainChild.push(dimension);
                    });
                    domain.nodes = domainChild;
                    domains.push(domain);
                });
            }
        });

        /**Get child recursively**/
        function getChild(id, resp) {
            var childArray = [];
            ecEditor._.forEach(resp, function(value) {
                if (value.parent != undefined) {
                    if (value.parent[0] == id) {
                        var child = {};
                        child.id = value.identifier;
                        child.name = value.name;
                        child.selectable = "selectable";

                        /**Get concept child recursively**/
                        child.nodes = getChild(value.identifier, resp);
                        childArray.push(child);
                    }
                }
            });
            return ecEditor._.uniqBy(childArray, "id");
        }
        /**Set Concept data**/
        this.conceptData = domains;
    },
    /**
     *
     * Get concepts data and push to conceptarray
     * @param offset {Object} offset for search API.
     * @param limit {Object} limit for search API
     * @memberof conceptselector
     *
     */
    getConcept: function(offset, limit, instance, callback) {
        var instance = instance || this;
        offset = offset || 0;
        limit = limit || instance.limit;

        var data = { "request": { "filters": { "objectType": ["Concept"] }, "offset": offset, "limit": instance.limit } };

        ecEditor.getService('search').search(data, function(err, resp) {
            if (!err && resp.data && resp.data.result && ecEditor._.isArray(resp.data.result.concepts)) {
                ecEditor._.forEach(resp.data.result.concepts, function(value) {
                    instance.concepts.push(value);
                });
                if (resp.data.result.count > limit) {
                    offset = resp.data.result.count - limit;
                    limit = limit + limit;
                    instance.getConcept(offset, limit, instance, callback);
                } else callback(instance);
            }
        });
    },
    /**
     *
     * open concept selector to select concepts
     * @memberof conceptselector
     *
     */
    initConceptBrowser: function(event, data) {
        var instance = this;
        if (instance.selectors.indexOf(data.element) == -1) {
            /**This is needed to get updated conceptData**/
            setTimeout(function() {
                ecEditor.jQuery('#' + data.element).treePicker({
                    data: instance.conceptData,
                    name: 'Concepts',
                    picked: data.selectedConcepts,
                    onSubmit: function(nodes) {
                        data.callback(nodes);
                    },
                    nodeName:"conceptSelector_" + data.element,
                    /**displayFormat: function(picked) { return "Concepts ("+picked.length+" selected)"; },**/
                    minSearchQueryLength: 1
                });
            }, 1000);
        }
    }
});
//# sourceURL=conceptplugin.js
