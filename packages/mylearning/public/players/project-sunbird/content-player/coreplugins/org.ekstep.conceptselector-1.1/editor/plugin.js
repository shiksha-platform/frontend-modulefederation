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
    conceptData: [],
    callback: undefined,
    /**
     * set default limit to search API
     * @memberof conceptselector
     */
    limit: 500,
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
        ecEditor.addEventListener(instance.manifest.id + ":init", this.initConceptBrowser, this);
    },
    /**
     *
     * Registers events.
     * @memberof conceptselector
     */
    initData: function(instance, cb) {
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
                cb && cb()
            }else{
                cb && cb()
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
        var data = { "request": { "filters": { "objectType": ["Concept"] }, "offset": offset, "limit": limit } };
        ecEditor.getService('search').search(data, function(err, resp) {
            if (!err && resp.data && resp.data.result && ecEditor._.isArray(resp.data.result.concepts)) {
                ecEditor._.forEach(resp.data.result.concepts, function(value) {
                    instance.concepts.push(value);
                });
                if (resp.data.result.count > (resp.data.result.concepts.length + offset)) {
                    offset = offset + resp.data.result.concepts.length;
                    if (offset !== resp.data.result.count)
                    instance.getConcept(offset, limit, instance, callback);
                    else callback(instance);
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
        if(!instance.concepts.length){
            instance.getConcept(0, instance.limit, instance, function() {
                instance.initData(instance, function(){
                    if (instance.selectors.indexOf(data.element) == -1) {
                        /**This is needed to get updated conceptData**/
                        setTimeout(function() {
                            ecEditor.jQuery('#' + data.element).treePicker({
                                data: instance.conceptData,
                                name: 'Concepts',
                                picked: data.selectedConcepts,
                                onSubmit: function(nodes) {
                                    data.callback(nodes);
                                    data.selectedConcepts = _.map(nodes, 'id');
                                    instance.generateTelemetry({type: 'click', subtype: 'submit', target: 'ConceptSelectorSubmit'});
                                },
                                onCancel: function(){
                                    instance.initConceptBrowser(event, data);
                                },
                                nodeName:"conceptSelector_" + data.element,
                                /**displayFormat: function(picked) { return "Concepts ("+picked.length+" selected)"; },**/
                                minSearchQueryLength: 1
                            });
                        }, 1000);
                    }
                });
            });
        }else{
            if (instance.selectors.indexOf(data.element) == -1) {
                /**This is needed to get updated conceptData**/
                setTimeout(function() {
                    ecEditor.jQuery('#' + data.element).treePicker({
                        data: instance.conceptData,
                        name: 'Concepts',
                        picked: data.selectedConcepts,
                        onSubmit: function(nodes) {
                            data.callback(nodes);
                            data.selectedConcepts = _.map(nodes, 'id');
                            instance.generateTelemetry({type: 'click', subtype: 'submit', target: 'ConceptSelectorSubmit'});
                        },
                        onCancel: function(){
                            instance.initConceptBrowser(event, data);
                        },
                        nodeName:"conceptSelector_" + data.element,
                        /**displayFormat: function(picked) { return "Concepts ("+picked.length+" selected)"; },**/
                        minSearchQueryLength: 1
                    });
                }, 1000);
            }
        }
    },
    /**
     *   To generate telemetry events
     *   @memberof collaborator
     */
    generateTelemetry: function(data) {
        var instance = this;
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "id": data.target,
            "pageid": org.ekstep.contenteditor.api.getCurrentStage().id || "",
            "target":{
                "id":  data.targetid || "",
                "type": "plugin",
                "ver": ""
            },
            "plugin":{
                "id": instance.manifest.id,
                "ver": instance.manifest.ver,
                "category": "core"
            },
            "ver": "3.0"
        })
    }
});
//# sourceURL=conceptplugin.js
