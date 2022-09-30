/**
 * 
 * plugin to add assessments to stage
 * @class assessment
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Manjunath Davanam  <manjunathd@ilimi.in>
 * @fires org.ekstep.assessmentbrowser:show
 * @fires org.ekstep.quiz:add 
 * @listens org.ekstep.image:assessment:showPopup
 */
org.ekstep.contenteditor.basePlugin.extend({
    /**
     * This expains the type of the plugin 
     * @member {String} type
     * @memberof assessment
     */
    type: "org.ekstep.quiz",
    /**
     *  
     * Registers events.
     * @memberof assessment
     */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener(this.manifest.id + ":showPopup", this.openAssessmentBrowser, this);
        ecEditor.addEventListener(this.manifest.id + ":renderQuiz", this.renderQuiz, this);
        ecEditor.addEventListener(this.manifest.id + ":showQuizConfig", this.showQuizConfig, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/templates/quizconfig.html");
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/js/quizconfigapp.js");
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);

    },
    mediaObj: {},
    hasTemplateMedia: true,
    newInstance: function() {
        var instance = this;
        // Removes unwanted config properties(visible,stroke etc.) for the quiz plugin
        delete instance.configManifest;
        instance.attributes.w = 80;
        instance.attributes.h = 85;
        instance.attributes.x = 9;
        instance.attributes.y = 6;
        instance.addMediaFromConfig();
        instance.percentToPixel(instance.attributes);
        var questionnaire = instance.data.questionnaire;
        instance.data.questionnaire.optionShuffle =  _.isUndefined(questionnaire.optionShuffle) ? true : questionnaire.optionShuffle ;
        var templateIds = instance.getItems(questionnaire.items, "templateId");
        if (_.isUndefined(this.config.media)) {
                instance.hasTemplateMedia = false;
                instance.getItems(questionnaire.items, "media").forEach(function(element, index) {
                instance.addMediatoManifest(element);
            }); 
        }       
        var _parent = this.parent;
        this.parent = undefined;
        var templateArray = [],
            errorTemplateurl = [],
            resCount = 0;
        if ((ecEditor._.isUndefined(instance.data.template) || instance.data.template.length == 0 || !instance.hasTemplateMedia) && _.size(templateIds) >0) {
            for (var index in templateIds) {
                // get Template based on ID and push all templates response to arrray.
                ecEditor.getService('assessment').getTemplate(templateIds[index], function(err, res) {
                    try {
                        if (res) {
                            resCount++;
                           //  If response body comes as undefined then move that res to errorTemplateurl
                            if (!_.isUndefined(res.data.result.content)) {
                                if(res.data.result.content.body){
                                    templateArray.push(instance.convert(res));
                                }else{
                                    errorTemplateurl.push(res.config.url)
                                }
                            } else {
                                errorTemplateurl.push(res.config.url);
                            }
                        } else {
                            resCount++;
                            errorTemplateurl.push(err.config.url);
                            throw Error(err);
                        }
                    } catch (err) {
                        console.warn("Invalid Template", err);
                    }
                    if (resCount >= _.size(templateIds)) {
                        instance.showpopupMessage(templateIds, _.uniq(errorTemplateurl), _parent);
                        if (_.size(errorTemplateurl) === 0) {
                            instance.showQuizbgImage(questionnaire, _parent);
                        }
                    }
                    instance.data.template = instance.getTemplateData(templateArray);
                });
            }
        } else {
            instance.showQuizbgImage(questionnaire, _parent);
        }
    },
    showQuizbgImage: function(questionnaire, _parent) {
        var instance = this;
        var quizImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/assets/QuizImage.png");
        fabric.Image.fromURL(quizImage, function(img) {
            var count = questionnaire.total_items + '/' + instance.getItems(questionnaire.items);
            var quizDetails = instance.getPropsForEditor(questionnaire.title, count, questionnaire.max_score);
            instance.editorObj = new fabric.Group([img, quizDetails]);
            instance.parent = _parent;
            instance.postInit();
        }, instance.convertToFabric(instance.attributes));
    },
    getItems: function(items, type) {
        // it returns the Unique templateId || media of the questions || length of the question
        var question = [],
            media = [];
        for (var key in items) {
            question = items[key];
        }
        if (type === "templateId") {
            return _.uniq(_.filter(_.map(question, "template_id"), Boolean));
        } else if (type === 'media') {
            question.forEach( function(element, index) {
               media.push(element.media);
            });
            return media;
        } else {
            return question.length;
        }
    },
    getTemplateData: function(templateArray) {
        // Iterate through the TemplateArray and return the templates
        var instance = this, templates = [];
        templateArray.forEach(function(element, index) {
            if (!_.isNull(element)) {
                _.isArray(element.template) ? $.merge(templates, element.template) : templates.push(element.template);
                if (!_.isUndefined(element.manifest)) {
                    instance.addMediatoManifest(element.manifest.media);
                }
            }
        });
        return templates.filter(Boolean);
    },
    renderQuiz: function(event, assessmentData) {
        // assessmentData is the object of config and items
        var instance = this,
            question = [];
        _.each(assessmentData.items, function(item) {
            if (!_.isUndefined(item)) {
                item = instance.parseItem(item);
            }
            question.push(item);
        });
        instance.setQuizdata(question, assessmentData.config);
    },
    showpopupMessage: function(templateIds, errTempurl, _parent) {
        var instance = this, errTemplateids = [];
        var questionnaire = instance.data.questionnaire;
        for (id in templateIds) {
            for (errId in errTempurl) {
                if (errTempurl[errId].indexOf(templateIds[id]) > -1) {
                    errTemplateids.push(templateIds[id]);
                }
            }
        }
        if (_.size(errTemplateids) === _.size(errTempurl) && _.size(errTemplateids) > 0) {
            ecEditor.getService('popup').open({
                showClose: false,
                template: ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/templates/warning.html"),
                controller: ['$scope', function($scope) {
                    $scope.callClear = function() {
                        instance.clearItem(questionnaire, errTemplateids,function(){
                            instance.showQuizbgImage(questionnaire, _parent);
                        });
                        $scope.closeThisDialog();
                    },
                    $scope.dontClear = function() {
                        $scope.closeThisDialog();
                    },
                    $scope.header = "Clean-up Question Set";
                    $scope.errorMessage = "There are few invalid questions in the question set being created. Would you like to remove the questions?";
                    $scope.invalidQuestioncount = instance.getInvlidQuestioncount(questionnaire,errTemplateids); 
                   /* $scope.errTemplate = instance.getInvalidquestionTitles(questionnaire, errTemplateids);*/
                }]
            });
        }
    },
    clearItem: function(questionnaire, errTemplateids, cb) {
        // It will clear the item if the item has invalid template_id
        console.info("Error Template_id List:", errTemplateids);
        var setId = questionnaire.item_sets[0].id;
        questionnaire.items[setId].forEach(function(element, index) {
            errTemplateids.includes(element.template_id) ? delete questionnaire.items[setId][index] : console.info("Item is not deleted");
        });
        questionnaire.items[setId] = _.filter(questionnaire.items[setId], Boolean);
        questionnaire.item_sets[0].count = questionnaire.items[setId].length;
        questionnaire.total_items = questionnaire.item_sets[0].count;
        cb();
    },
    getInvlidQuestioncount: function(questionnaire, errTemplateids) {
        // To display the total count of invalid questions on the warning popup .
        var setId = questionnaire.item_sets[0].id;
        var invalidItemcount = 0;
        questionnaire.items[setId].forEach(function(element, index) {
            errTemplateids.includes(element.template_id) ? invalidItemcount++ : console.info("Not presetn");
        });
        return invalidItemcount + " out of " + questionnaire.total_items + " questions will be removed. "
    },
    setQuizdata: function(question, config) {
        // This function will do construction of the questionnaire Object
        // config is the configrations of the controller(shuffle,totl_items,title etc.,)
        var instance = this,
            questionSets = {},
            _assessmentData = {},
            controller = { "questionnaire": {} };
        questionSets[question[0].identifier] = question;
        controller.questionnaire["items"] = questionSets;
        controller.questionnaire["item_sets"] = [{ "count": config.total_items, "id": question[0].identifier }]
        controller["questionnaire"] = ecEditor._.assign(controller.questionnaire, config);
        instance.addConfig("type", "items");
        instance.addConfig("var", "item");
        instance.setData(controller);
        _assessmentData["data"] = { __cdata: JSON.stringify(controller) };
        _assessmentData["config"] = { __cdata: JSON.stringify({ "type": "items", "var": "item" }) };
        ecEditor.dispatchEvent(instance.manifest.id + ':create', _assessmentData);
    },
    parseItem: function(item) {
        // this function is restricted to parse the few keys
        $.each(item, function(key, value) {
            if (key === 'options' || key === "lhs_options" || key === 'rhs_options' || key === 'model' || key === 'answer' || key === 'media') {
                item[key] = !_.isObject(item[key]) ? JSON.parse(item[key]) : item[key];
            }
        });
        return item;
    },
    addMediatoManifest: function(media) {
        /*it will add the all media to the manifest*/
        var instance = this;
        if (!_.isUndefined(media)) {
            if (_.isArray(media)) {
                media.forEach(function(ele, index) {
                    if (!_.isNull(media[index].id) && !_.isNull(media[index].src)) {
                        // Adding the preload property to the media
                        media[index].preload = "true";
                        instance.addMedia(media[index]);
                        instance.addMediaToConfig(media[index]);
                    }
                });
            } else {
                media.preload = "true";
                instance.addMedia(media);
                instance.addMediaToConfig(media);
            }
        }
    },
    addMediaToConfig: function (media) {
        if (media.src) {
            org.ekstep.contenteditor.mediaManager.getMediaOriginURL(media.src);
            this.mediaObj[media.id] = media;        
            this.addConfig("media", this.mediaObj);
        }
    },
    addMediaFromConfig: function () {
        var instance = this;
        if(!_.isUndefined(this.config.media)) {
            _.forIn(this.config.media, function(value, key) {
                instance.addMedia(value);
            });
        }
    },
    convert: function(res) {
        // It will verfies response is XML or JSON format and then returns the valid theme data
        var data, x2js = new X2JS({
            attributePrefix: 'none'
        });
        if (!_.isNull(res)) {
            // if res is json
            if (res.data.result.content.body.lastIndexOf('{', 0) === 0) {
                data = JSON.parse(res.data.result.content.body);
                return data.theme;
            } else {
                data = x2js.xml_str2json(res.data.result.content.body);
                return data.theme;
            }
        }

    },
    getPropsForEditor: function(qTittle, qCount, maxscore) {
        /* Display the all properties(title,count and maxscore) on the editor*/
        var instance = this;
        qTittle = new fabric.Text(qTittle.toUpperCase(), { fontSize: 15, fill: 'black', textAlign: 'center', top: 32, left: 105 });
        qCount = new fabric.Text(qCount + "  Questions,", { fontSize: 12, fill: 'black', top: 49, left: 105 });
        maxscore = new fabric.Text(maxscore + " Marks", { fontSize: 12, fill: 'black', top: 49, left: 190, });
        fabricGroup = new fabric.Group([qTittle, qCount, maxscore]);
        return fabricGroup;
    },
    onConfigChange: function(key, value) {
        /* TODO : value is updating to data object this will be removed later once quiz canvas renderer is got update
         presentely the quiz canvas rendere all config data is adding to data object so.*/

        if (!_.isUndefined(value)) {
            var itemLength = this.getItems(this.data.questionnaire.items);
            switch (key) {
                case 'title':
                    this.config.title = value;
                    this.data.questionnaire.title = value;
                    this.editorObj._objects[1]._objects[0].setText(value.toUpperCase());
                    break;
                case 'total_items':
                    this.config.total_items = value;
                    this.data.questionnaire.total_items = value;
                    this.editorObj._objects[1]._objects[1].setText(value + "/" + itemLength + "Questions,");
                    break;
                case 'max_score':
                    this.config.max_score = value;
                    this.data.questionnaire.max_score = value;
                    this.editorObj._objects[1]._objects[2].setText(value + "Marks");
                    break;
                case 'shuffle':
                    this.config.shuffle = value;
                    this.data.questionnaire.shuffle = value;
                    break;
                case 'showImmediateFeedback':
                    this.config.showImmediateFeedback = value;
                    this.data.questionnaire.showImmediateFeedback = value;
                    break;
                case 'optionShuffle':
                    this.config.optionShuffle = value;
                    this.data.questionnaire.optionShuffle = value;
                    break;
                case 'browser':
                    ecEditor.dispatchEvent('delete:invoke');
                    ecEditor.dispatchEvent(this.manifest.id + ':renderQuiz', { items: value.items, config: value.config })
                    break;
                }
        }
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', {
            target: ecEditor.getEditorObject()
        });
    },
    showQuizConfig: function(event, dataObj) {
       var currentQuizObj = ecEditor.getCurrentObject();
        ecEditor.getService('popup').open({
            template: 'quizconfig',
            controller: 'quizconfigcontroller',
            controllerAs: '$ctrl',
            resolve: {
                'quizInstance': function() {
                    return currentQuizObj;
                }
            },
            width: 900,
            showClose: false,
            className: 'ngdialog-theme-plain'
        });
    },
    getConfig: function() {
        var config = this._super();
        config.shuffle = this.data.questionnaire.shuffle;
        config.total_items = this.data.questionnaire.total_items;
        config.showImmediateFeedback = this.data.questionnaire.showImmediateFeedback;
        config.max_score = this.data.questionnaire.max_score;
        config.title = this.data.questionnaire.title;
        config.optionShuffle = this.data.questionnaire.optionShuffle;
        return config;
    },
    /**    
     *      
     * open assessment browser to get assessment data. 
     * @memberof assessment
     * 
     */
    openAssessmentBrowser: function(event, callback) {
        var instance = this,
            data = undefined;        
        if(ecEditor._.isUndefined(callback)){
            callback = function(data) {
                var assessmentData = { items: data.items, config: data.config };
                ecEditor.dispatchEvent(instance.manifest.id + ':renderQuiz', assessmentData);
            };
        }else{
            callback = callback.callback;
            data = ecEditor.getCurrentObject().data;
        }
        ecEditor.dispatchEvent("org.ekstep.assessmentbrowser:show", {callback : callback, data : data});  
    },
    /**    
     *      
     * To get quiz summary. 
     * @memberof summary
     */
    getSummary: function() {
      var instance = this;
      var summary = {'totalQuestions': 0,'totalScore': 0};
      var totalQuestionsToRender = instance.data.questionnaire.total_items; 
        // Total number of score/questions is equal to total_items  because evaluator setting max_score to 1 for each question, irrespective of question's max_score
        summary.totalQuestions = totalQuestionsToRender;  
        summary.totalScore = totalQuestionsToRender;     
      return summary;
    }
});
//# sourceURL=quizPlugin.js
