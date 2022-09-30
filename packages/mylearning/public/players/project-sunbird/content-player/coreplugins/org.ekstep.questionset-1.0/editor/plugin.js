/**
 *
 * Plugin to create question set and add it to stage.
 * @class questionset
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */

// Register namespace
org.ekstep.questionset = {};
org.ekstep.questionset.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.questionset",
  _plugins : [],
  _questions: [],
  _questionPlugin: 'org.ekstep.question',
  _constants: {
    v1PluginId: "org.ekstep.questionset.quiz",
    templateId: "horizontalMCQ"
  },
  _dependencyPlugin: "org.ekstep.questionbank",
  /**
   * Register events.
   * @memberof questionset
   */
  initialize: function () {
    var instance = this;

    //Load dependecny plugin
    var publishedDate = new Date().getTime();
    ecEditor.loadAndInitPlugin(instance._dependencyPlugin, "1.0", publishedDate);
    //Loading question unit plugins(MCQ,FTB and MTF) which all having target id 'org.ekstep.questionset'
    //this.loadQSPlugins();
    //Get loaded plugins
    ecEditor.addEventListener(this.manifest.id + ":getPlugins", this.getplugins, this);

    ecEditor.addEventListener(instance.manifest.id + ":showPopup", instance.openQuestionBank, instance);
    ecEditor.addEventListener(instance.manifest.id + ":addQS", instance.addQS, instance);
    var pluginsData = [
      {
        "identifier": "org.ekstep.questionunit.mtf",
        "appIcon": ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/assets/mtf_app_icon.jpg'),
        "semanticVersion": "1.2",
        "contentType": "Plugin",
        "objectType": "Content"
      },
      {
        "identifier": "org.ekstep.questionunit.mcq",
        "appIcon": ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/assets/mcq_app_icon.jpg'),
        "semanticVersion": "1.3",
        "contentType": "Plugin",
        "objectType": "Content"
      },
      {
        "identifier": "org.ekstep.questionunit.ftb",
        "appIcon": ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/assets/ftb_app_icon.jpg'),
        "semanticVersion": "1.1",
        "contentType": "Plugin",
        "objectType": "Content"
      },
      {
        "identifier": "org.ekstep.questionunit.reorder",
        "appIcon": ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/assets/reorder_app_icon.jpg'),
        "semanticVersion": "1.1",
        "contentType": "Plugin",
        "objectType": "Content"
      },
      {
        "identifier": "org.ekstep.questionunit.sequence",
        "appIcon": ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/assets/sequence_app_icon.jpg'),
        "semanticVersion": "1.1",
        "contentType": "Plugin",
        "objectType": "Content"
      }
    ];
    instance.pluginsRespHandler(pluginsData);
  },
  newInstance: function () {
    var instance = this;
    delete this.configManifest;
    instance.config.btn_edit = "Edit";
    var _parent = this.parent;
    this.parent = undefined;
    /*istanbul ignore else*/
    if (!this.attributes.x) {
      this.attributes.x = 10;
      this.attributes.y = 3;
      this.attributes.w = 78;
      this.attributes.h = 94;
      this.percentToPixel(this.attributes);
    }
    var props = this.convertToFabric(this.attributes);
    delete props.width;
    delete props.height;
    //add media to stage
    instance._questions = instance.data ? instance.data : [];
    // Add all question media to media manifest
    if (_.isArray(this._questions)) {
      this._questions.forEach(function (question) {
        if (question.version == 1) {
          if (_.has(question, "media")) {
            question.media.forEach(function (mediaItem) {
              instance.addMedia(mediaItem);
            })
          }
          if (_.has(question, "mediamanifest")) {
            if (_.isArray(question.mediamanifest.media)) {
              question.mediamanifest.media.forEach(function (mediaItem) {
                instance.addMedia(mediaItem);
              })
            }
          }
        } else {
          var quesMedia = JSON.parse(question.body);
          quesMedia.data.config.max_score = question.max_score;
          question.body = JSON.stringify(quesMedia);
          var questionData = quesMedia.data;
          if (_.isEmpty(questionData.media) && _.has(quesMedia, "media")) {
            questionData.media.forEach(function (mediaItem) {
              mediaItem.src = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(mediaItem.src)
              instance.addMedia(mediaItem);
            });
          }
        }
      });
    }
    // Add stage object
    var stageImage = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/assets/quizimage.png');
    instance.addMedia({
      id: "QuizImage",
      src: stageImage,
      assetId: "QuizImage",
      type: "image",
      preload: true
    });

    fabric.Image.fromURL(stageImage, function (img) {
      var count = instance.config.total_items + '/' + instance.data.length;
      var quizDetails = instance.getPropsForEditor(instance.config.title, count, instance.config.max_score);
      instance.editorObj = new fabric.Group([img, quizDetails]);
      //instance.editorObj = img;
      instance.parent = _parent;
      instance.editorObj.scaleToWidth(props.w);
      instance.postInit();
    }, props);
    //Getting numberf questions for assessment summary : testing purpose
    //instance.getSummary();//Testing
  },
  getPropsForEditor: function (qTittle, qCount, maxscore) {
    /* Display the all properties(title,count and maxscore) on the editor*/
    qTittle = new fabric.Text(qTittle.toUpperCase(), {
      fontSize: 15,
      fill: 'black',
      textAlign: 'center',
      top: 33,
      left: 105
    });
    qCount = new fabric.Text(qCount + "  Questions,", {
      fontSize: 12,
      fill: 'black',
      top: 50,
      left: 105
    });
    maxscore = new fabric.Text(maxscore + " Marks", {
      fontSize: 12,
      fill: 'black',
      top: 50,
      left: 190,
    });
    var fabricGroup = new fabric.Group([qTittle, qCount, maxscore]);
    return fabricGroup;
  },
  addQS: function (event, dataObj) {
    var questions = [];
    if (_.isArray(dataObj.data.data)) {
      dataObj.data.data.forEach(function (question) {
        questions.push(question);
      });
    }
    var qdata = {};
    qdata.config = {
      __cdata: JSON.stringify(dataObj.data.config)
    };
    qdata.data = questions;

    if (!ecEditor._.isUndefined(dataObj.callback)) {
      ecEditor.dispatchEvent('delete:invoke');
    }
    ecEditor.dispatchEvent(this.manifest.id + ':create', qdata);
  },
  createEcmlStructureV1: function (question) {
    var instance = this,
      questionSets = {},
      controller = {
        "questionnaire": {},
        "template": {}
      };
    var questionTemplate = Object.assign({}, question);
    delete questionTemplate.template;
    delete questionTemplate.mediamanifest;
    questionTemplate["template"] = question.template[0].id;
    questionSets[question.identifier] = [questionTemplate];
    controller.questionnaire["items"] = questionSets;
    controller.questionnaire["item_sets"] = [{
      "count": instance.config.total_items,
      "id": question.identifier
    }];
    controller["questionnaire"] = ecEditor._.assign(controller.questionnaire, instance.config);
    controller["template"] = ecEditor._.assign(question.template);
    return JSON.stringify(controller);
  },
  toECML: function () {
    var instance = this;

    // Generate the questionSet ECML by using the basePlugin `toECML` function.
    var questionSetECML = this._super();
    questionSetECML[instance._questionPlugin] = [];

    if (_.isArray(instance.data)) {
      instance.data.forEach(function (question) {
        var questionECML = {};
        if (question.version == 1) {
          questionECML = {
            id: _.isUndefined(question.identifier) ? UUID() : question.identifier,
            type: question.type,
            pluginId: instance._constants.v1PluginId,
            pluginVer: (question.version === 1) ? '1.0' : question.version.toString(),
            templateId: instance._constants.templateId,
            data: {
              __cdata: instance.createEcmlStructureV1(question)
            },
            config: {
              __cdata: JSON.stringify({
                "type": "items",
                "var": "item"
              })
            }
          }
          ecEditor._.forEach(question.media, function (asset) {
            if (!ecEditor._.isEmpty(asset))
              instance.addMedia(asset);
          });
          ecEditor.instantiatePlugin(instance._constants.v1PluginId, {});

        } else {
          var questionBody = JSON.parse(question.body);
          // Build Question ECML for each question that is added.
          questionECML = {
            id: _.isUndefined(question.identifier) ? UUID() : question.identifier,
            type: question.type,
            pluginId: questionBody.data.plugin.id,
            pluginVer: questionBody.data.plugin.version,
            templateId: questionBody.data.plugin.templateId,
            data: {
              __cdata: JSON.stringify(questionBody.data.data)
            },
            config: {
              __cdata: JSON.stringify(questionBody.data.config)
            }
          };

          // Instantiate the question unit plugin to add it to <plugin-manifest>
          ecEditor.instantiatePlugin(questionBody.data.plugin.id, {});
          // delete questionSetECML.data;
          ecEditor._.forEach(questionBody.data.media, function (asset) {
            if (!ecEditor._.isEmpty(asset))
              instance.addMedia(asset);
          });
        }
        questionECML.w = 80;
        questionECML.h = 85;
        questionECML.x = 9;
        questionECML.y = 6;
        questionSetECML.w = 80;
        questionSetECML.h = 85;
        questionSetECML.x = 9;
        questionSetECML.y = 6;
        questionSetECML[instance._questionPlugin].push(questionECML);
      });
    }
    return questionSetECML;
  },
  getConfig: function () {
    var instance = this;
    var config = instance._super();
    config.title = instance.config.title;
    config.max_score = instance.config.max_score;
    config.allow_skip = instance.config.allow_skip;
    config.show_feedback = instance.config.show_feedback;
    config.shuffle_questions = instance.config.shuffle_questions;
    config.shuffle_options = instance.config.shuffle_options;
    config.total_items = instance.config.total_items;

    return config;
  },
  onConfigChange: function (key, value) {
    var instance = this;
    if (!_.isUndefined(value)) {
      var itemLength = this.data.length;
      switch (key) {
        case 'title':
          this.config.title = value;
          this.editorObj._objects[1]._objects[0].setText(value.toUpperCase());
          break;
        case 'total_items':
          this.config.total_items = value;
          this.editorObj._objects[1]._objects[1].setText(value + "/" + itemLength + "Questions,");
          break;
        case 'max_score':
          this.config.max_score = value;
          this.editorObj._objects[1]._objects[2].setText(value + "Marks");
          break;
        case 'shuffle_questions':
          this.config.shuffle_questions = value;
          if(value){
            var maxscore = this.config.shuffle_questions ? this.data.length : this.config.max_score; 
            this.editorObj._objects[1]._objects[2].setText(maxscore + " Marks");
            _.each(instance.data,function(val,key){
              if(val.body == undefined){
                instance.data[key].max_score = 1;
              }else{
                var qBody = JSON.parse(instance.data[key].body);
                qBody.data.config.metadata.max_score = 1;
                qBody.data.config.max_score = 1;
                instance.data[key].body = JSON.stringify(qBody);
                instance.data[key].max_score = 1;
              }
            });
            this.config.max_score = instance.data.length;
            ecEditor.dispatchEvent("org.ekstep.toaster:info", {
              title: 'Each question will carry equal weightage of 1 mark when using Shuffle. To provide different weightage to individual questions please turn off Shuffle.',
              position: 'topCenter',
            });
          }
          break;
        case 'show_feedback':
          this.config.show_feedback = value;
          break;
        case 'optionShuffle':
          this.config.optionShuffle = value;
          break;
        case 'btn_edit':
          ecEditor.dispatchEvent('delete:invoke');
          break;
      }
    }
    ecEditor.render();
    ecEditor.dispatchEvent('object:modified', {
      target: ecEditor.getEditorObject()
    });
  },
  openQuestionBank: function (event, callback) {
    var data;
    if (ecEditor._.isUndefined(callback)) {
      data = undefined;
    } else {
      callback = callback.callback;
      data = {
        data: ecEditor.getCurrentObject().data,
        config: ecEditor.getCurrentObject().config
      };
    }

    ecEditor.dispatchEvent('org.ekstep.questionbank:showpopup', {
      callback: callback,
      data: data
    });
  },
  getSummary: function() {
    var instance = this;
    var summary = {'totalQuestions': 0,'totalScore': 0, 'questions': []};
    var totalQuestionsToRender = instance.config.total_items;
    instance._questions.forEach(function(question,key) {
      summary.questions.push({'identifier': question.identifier});
    });
    if(instance.config.shuffle_questions){
      // Total number of items/questions to render
      summary.totalQuestions = totalQuestionsToRender;
      summary.totalScore = totalQuestionsToRender;
    }else{
      instance._questions.forEach(function(question,key) {
        if(key < totalQuestionsToRender){
          if(question.body != undefined){
            var questionCount = JSON.parse(question.body).data.config.questionCount == undefined ? 1 : JSON.parse(question.body).data.config.questionCount;
            var scoreCount = JSON.parse(question.body).data.config.max_score == undefined ? 1 : JSON.parse(question.body).data.config.max_score;
            summary.totalQuestions = summary.totalQuestions + parseInt(questionCount);
            summary.totalScore = summary.totalScore + parseInt(scoreCount);
          }else{
            summary.totalQuestions = summary.totalQuestions + parseInt(1);
            summary.totalScore = summary.totalScore + question.max_score;
          }
        }
      });
    }
    return summary;
  },
  loadQSPlugins: function(){
    var instance = this;
    var qsManifest = org.ekstep.pluginframework.pluginManager.getPluginManifest(instance.manifest.id);
    var qsVesrion = qsManifest.ver.split('.')[0];
    var data = {
      "request": {
        "filters": {
          "objectType": ["Content"],
          "contentType": ["Plugin"],
          "targets.id": instance.manifest.id,
          "targets.ver": {'<=': Number(qsVesrion)},
          "status": "Live"
        },
        "limit": 50,
        "fields": ['contentType','semanticVersion','appIcon']
      }
    };

    var pluginsData;
    if(_.isFunction(ecEditor.getService('search').pluginsSearch)){
      var url = ecEditor.getConfig('pluginsRepoUrl') ? ecEditor.getConfig('pluginsRepoUrl') : undefined; 
      ecEditor.getService('search').pluginsSearch(url, data, function(err, resp) {
       if(!err){ 
          pluginsData = resp.data.result.content;
          instance.pluginsRespHandler(pluginsData);
       }
      });
    }else{
      ecEditor.getService('search').search(data, function(err, resp) {
       if(!err){ 
          pluginsData = resp.data.result.content;
          instance.pluginsRespHandler(pluginsData);
       }
     });
    }
  },
  pluginsRespHandler: function(pluginsData){
    var instance = this;
    instance._plugins = pluginsData;
    var plugins = [];
    ecEditor._.forEach(pluginsData, function(value, key) { // eslint-disable-line no-unused-vars
      if (value) {
        var obj = {
          "id": value.identifier,
          "ver": value.semanticVersion,
          "type": 'plugin'
        }
        plugins.push(obj);
      }
    });
    org.ekstep.pluginframework.pluginManager.loadAllPlugins(_.isArray(plugins) ? plugins : [plugins], []);
  },
  getplugins: function(event, callback){
    var instance = this;
    callback(instance._plugins);
  }
});
//# sourceURL=questionsetPlugin.js
