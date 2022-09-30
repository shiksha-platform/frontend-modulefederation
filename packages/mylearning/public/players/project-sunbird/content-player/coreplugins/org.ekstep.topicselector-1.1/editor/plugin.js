/**
 *
 * Plugin to browse topic and select
 * @class topicselector
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Gourav More <gourav_m@tekditechnologies.com>
 * @listens org.ekstep.topicselector:init
 * @listens editor:field:association
 */

org.ekstep.contenteditor.basePlugin.extend({
    /**
     * framework to get topics
     * @memberof topicselector
     */
    framework: undefined,
    /**
     * topic data for sematic ui tree picker lib
     * @memberof topicselector
     */
    topicData: [],
    /**
     * Api response for categories
     * @memberof topicselector
     */
    response:[],
    /**
     * Topic terms from API
     * @memberof topicselector
     */
    terms:[],
    /**
     * Selected filters data from metaform
     * @memberof topicselector
     */
    selectedFilters:[],
    /**
     * for master data of topic tree
     * @memberof topicselector
     */
    topics: [],
    /**
     * categories of framework
     * @memberof topicselector
     */
    categories: [],
    /**
     * Data to Topic tree library
     * @memberof topicselector
     */
    data: [],
    /**
     * check for is topic selector initialized
     * @memberof topicselector
     */
    isPopupInitialized: false,
    template: undefined,
    /**
     * Registers events.
     * @memberof topicselector
     */
    initialize: function() {
        var instance = this;
        /**Register event to show topic selector browser**/
        ecEditor.addEventListener(instance.manifest.id + ":init", this.initTopicBrowser, this);
        /**Register event for update filters data**/
        ecEditor.addEventListener("editor:field:association", this.applyFilters, this);
    },
    /**
     * To init topic selector browser.
     * @memberof topicselector
     */
    initTopicBrowser: function(event, data) {
        var instance = this;
        instance.data = data;
        instance.framework = data.framework || ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).framework;
        instance.terms = [];
        instance.getCategory(function(){
            if(instance.categories.length > 0){
                instance.getTopics(instance.categories, function(data){
                    instance.topicData = ecEditor._.uniqBy(data, "id");
                    instance.topics = instance.topicData;
                    instance.isPopupInitialized = true;
                    instance.selectedFilters = [];
                    if(instance.data.isCategoryDependant){
                        instance.getFormData(function(data){
                            instance.setAssociations(data, function(){
                                instance.setFiltersData(function(){
                                    instance.showTopicBrowser(event, instance.data);         
                                });
                            });
                        });
                    }else{
                        instance.showTopicBrowser(event, instance.data);
                    }
                });
            }else{
                instance.isPopupInitialized = true;
                instance.showTopicBrowser(event, instance.data);
            }
        });
    },
    /**
     * get form config data.
     * @memberof topicselector
     */
    getFormConfig: function(callback) {
        var instance = this;
        ecEditor.dispatchEvent("editor:form:getconfig",function(configData){
            instance.template = configData.template;
            var formConfig = _.map(_.filter(configData.fields, _.matches({ 'depends': ['topic']})), 'code');
            instance.terms = formConfig;
            callback(formConfig);
        });
    },
    /**
     * get form data.
     * @memberof topicselector
     */
    getFormData: function(callback) {
        var instance = this;
        instance.getFormConfig(function(formConfig){
            ecEditor.dispatchEvent("metadata:form:getdata", {target: '#'+instance.template, callback: function(data){
                var formData = _.pick(data, formConfig);
                callback(formData);
            }});
        });
    },
    /**
     * get topic data.
     * @memberof topicselector
     */
    getTopics: function(data, callback) {
        var instance = this;
        var mappedData = [];
        if (data && data.length){
            ecEditor._.forEach(data, function(value, index) {
                var topic = {};
                topic.id = value.identifier;
                topic.name = value.name;
                topic.selectable = "selectable";
                topic.nodes = instance.getSubtopics(value.children);
                mappedData.push(topic)
                if (index === data.length - 1){ 
                    callback(mappedData);
                }
            });
        }else{
             callback(mappedData);
        }
    },
    /**
     * To Get topic child recursively.
     * @memberof topicselector
     */
    getSubtopics: function(topic) {
        var instance = this;
        var childArray = [];
        ecEditor._.forEach(topic, function(value) {
            var child = {};
            child.id = value.identifier;
            child.name = value.name;
            child.selectable = "selectable";
            child.nodes = instance.getSubtopics(value.children);
            childArray.push(child);
        });
        return ecEditor._.uniqBy(childArray, "id");
    },
    /**
     * To all topics data.
     * @memberof topicselector
     */
    getCategory: function(callback) {
        var instance = this;
        var frameworkId = instance.framework;
        if (frameworkId){
            ecEditor.getService(ServiceConstants.META_SERVICE).getCategorys(frameworkId, function(error, response) {
                if (!error) {
                    instance.response = response.data.result.framework.categories;
                    ecEditor._.forEach(instance.response, function (value, key) {
                        if (value.code == "topic") instance.categories = value.terms || [];
                        //else instance.terms.push(value.code);
                    });
                }
                callback();
            });
        }else{
            callback();
        }
    },
    /**
     * To apply filters data
     * @memberof topicselector
     */
    applyFilters: function(event, data) {
        var instance = this;
        instance.selectedFilters = [];
        if(instance.isPopupInitialized && data.field.depends && data.field.depends.length){
            _.forEach(data.field.depends, function(id) {
                if (id == 'topic' && data.resetSelected){
                    instance.data.selectedTopics = [];
                    ecEditor.dispatchEvent('editor.topic.change', {key: 'topic', value: []});
                    var targetElement;
                    if(data.target){
                       targetElement = data.target.replace('#', '');
                    }
                    ecEditor.dispatchEvent("metadata:form:getdata", {target: data.target, callback: function(data){
                        instance.setAssociations(data, function(){
                            instance.setFiltersData(function(){
                                if(targetElement){
                                    instance.data.element = targetElement +'-topic';
                                }
                                instance.showTopicBrowser(event, instance.data);
                            });
                        });
                    }});
                }
            });
        }
    },
    /**
     * To set filters data.
     * @memberof topicselector
     */
    setFiltersData: function(callback) {
        var instance = this;
        var associations = [];
        if (instance.selectedFilters.length > 0){
            ecEditor._.forEach(instance.selectedFilters, function(value, index) {
                if(value.association.length > 0){
                    var topics = [];
                    ecEditor._.forEach(value.association[0], function(topic, index) {
                        if(topic.category == 'topic') topics.push(topic.identifier); 
                    });
                    if(topics.length > 0) associations.push(topics);
                }
                if (index === instance.selectedFilters.length - 1){ 
                    var selectedIntersection = _.intersection.apply(_, associations);
                    var topicData = [];
                    ecEditor._.forEach(instance.topics, function(topic, index) {
                        ecEditor._.forEach(selectedIntersection, function(id) {
                            if (topic.id == id)
                                topicData.push(topic);
                        });
                    });
                    instance.topicData = topicData;
                    callback();
                }
            });
        }else{
            callback();
        }    
    },
    /**
     * Set associations according to the filters
     * @memberof topicselector
     */
    setAssociations: function(data, callback){
        var instance = this;
        instance.terms = ecEditor._.uniq(instance.terms);
        ecEditor._.forEach(instance.terms, function(value, index) {
            if(data[value]){
                var category = {};
                category.name = value;
                category.value = data[value];
                category.association = [];
                var categoryTerms = _.find(instance.response, function(o){ return o.code === value;}).terms;
                ecEditor._.forEach(categoryTerms, function(term, index) {
                    if(!ecEditor._.isUndefined(term.associations)){
                        if(_.isArray(data[value]) && term.associations.length > 0){
                            ecEditor._.forEach(data[value], function(select, index) {
                                if(term.name == select && category.association.length > 0) {
                                    term.associations  = _.union(category.association[0], term.associations);
                                    category.association = term.associations;
                                }else if(term.name == select){                                      
                                    category.association.push(term.associations);
                                }
                            });
                        }else if(term.name == data[value] && term.associations.length > 0){
                            category.association.push(term.associations);
                        }
                    }
                });
                instance.selectedFilters.push(category);
            }
        });
        callback();
    },
    /**
     * open topic selector to select topics and subtopics
     * @memberof topicselector
     */
    showTopicBrowser: function(event, data) {
        var instance = this;
        instance.data = data;
        console.log("topics:- ", instance.topicData.length);
        ecEditor.jQuery('#' + data.element).topicTreePicker({
            data: instance.topicData,
            name: 'Topic',
            picked: data.selectedTopics,
            onSubmit: function(nodes) {
                data.callback(nodes);
                data.selectedTopics = _.map(nodes, 'name');
                instance.generateTelemetry({type: 'click', subtype: 'submit', target: 'TopicSelectorSubmit'});
            },
            onCancel: function(){
                instance.showTopicBrowser(event, data);
            },
            nodeName:"topicSelector_" + data.element,
            minSearchQueryLength: 1
        });
    },
    /**
     *   To generate telemetry events
     *   @memberof topicselector
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
        });
    }
});
//# sourceURL=topicselectorplugin.js