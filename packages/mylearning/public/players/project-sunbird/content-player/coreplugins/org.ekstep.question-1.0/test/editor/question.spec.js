describe("EditorPlugin", function() {
  var plugin, $controller, $window, $scope, metaService, assessmentService, mcqPlugin, ftbPlugin, mtfPlugin;

  beforeEach(module('org.ekstep.question'));

  beforeEach(function(done) {
    plugin = new org.ekstep.question.EditorPlugin({}, {}, {});
    plugin.manifest = { "id": "org.ekstep.question", "ver": "1.0", "author": "Jagadish", "title": "Question Plugin", "description": "Plugin to create questions", "editor": { "main": "editor/plugin.js", "dependencies": [{ "type": "css", "src": "editor/style.css" }, { "type": "js", "src": "editor/question.js" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mcq", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.ftb", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionset.preview", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.sunbirdmetadata", "ver": "1.0" }], "menu": [], "init-data": {}, "configManifest": [{}], "help": { "src": "editor/help.md", "dataType": "text" }, "sidebarMenu": [] }, "renderer": { "main": "renderer/plugin.js", "dependencies": [{ "type": "plugin", "plugin": "org.ekstep.questionset.preview", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mcq", "ver": "1.0" }] }, "icon": "assets/icon.png", "languages": ["English"], "categories": [""], "keywords": [""] };
    setTimeout(function() {
      angular.module('org.ekstep.metadataform', []);
      inject(function(_$rootScope_, _$controller_, _$window_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $window = _$window_;
        $scope.closeThisDialog = function() {};
        $scope.$safeApply = function() {};
        done();
      });
    }, 2000);
    spyOn(ecEditor,"instantiatePlugin").and.callFake(function(pluginId){
      if (pluginId === "org.ekstep.question") {
        return plugin.manifest;
      } else if (pluginId === "org.ekstep.questionunit.mcq") {
        return mcqPlugin;
      } else if (pluginId === "org.ekstep.questionunit.ftb") {
        return ftbPlugin;
      } else if (pluginId === "org.ekstep.questionunit.mtf") {
        return mtfPlugin;
      } else {
        return {};
      }
    });

    metaService = jasmine.createSpyObj("meta", ["getConfigOrdinals"]);
    assessmentService = jasmine.createSpyObj("assessment", ["saveQuestionV3", "getQuestionunitPlugins"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === 'assessment') {
        return assessmentService;
      } else if (serviceName === 'meta') {
        return metaService;
      }
    });

    mcqPlugin = { "id": "org.ekstep.questionunit.mcq", "ver": "1.0", "author": "Jagadish", "title": "Multiple Choice Question Unit Plugin", "description": "Question Unit Plugin that enables creation of multiple choice questions.", "publishedDate": "", "languages": ["English"], "categories": [], "keywords": ["mcqplugin"], "editor": { "main": "editor/plugin.js", "dependencies": [{ "type": "plugin", "plugin": "org.ekstep.questionunit", "ver": "1.0" }, { "type": "css", "src": "editor/styles/style.css" }], "menu": [], "init-data": { "type": "rect", "x": 10, "y": 2, "w": 80, "h": 80, "fill": "#DCDCDC" }, "configManifest": [{}], "help": { "src": "editor/help.md", "dataType": "text" } }, "templates": [{ "id": "horizontalMCQ", "thumbnail": "editor/assets/mcq-horizontal.png", "title": "Multiple Choice Question", "disc": "Multiple choice items consist of a stem, the correct answer, keyed alternative, and distractors. The stem is the beginning part of the item that presents the item as a problem to be solved, a question asked of the respondent, or an incomplete statement to be completed, as well as any other relevant information.", "category": "MCQ", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "horizontalMCQ", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/horizontal_template.html", "controller": "renderer/controllers/horizontal_controller.js" } }], "renderer": { "main": "renderer/plugin.js", "dependencies": [{ "type": "css", "src": "renderer/styles/style.css" }, { "type": "js", "src": "renderer/util/evaluator.js" }, { "type": "js", "src": "renderer/controllers/horizontal_controller.js" }, { "type": "js", "src": "renderer/templates/horizontal_template.html" }] }, "dependencies": [{ "plugin": "org.ekstep.questionunit", "ver": "1.0", "type": "plugin", "scope": "all" }] };

    mtfPlugin = { "id": "org.ekstep.questionunit.mtf", "ver": "1.0", "author": "Jagadish", "title": "Add question", "description": "", "publishedDate": "", "icon": "assets/createquestion.png", "languages": ["English"], "categories": [], "keywords": ["mtfplugin"], "editor": { "main": "editor/plugin.js", "dependencies": [{ "type": "plugin", "plugin": "org.ekstep.questionunit", "ver": "1.0" }, { "type": "css", "src": "editor/styles/style.css" }], "menu": [], "init-data": { "type": "rect", "x": 10, "y": 2, "w": 80, "h": 80, "fill": "#DCDCDC" }, "configManifest": [{}], "help": { "src": "editor/help.md", "dataType": "text" } }, "templates": [{ "id": "horizontalMTF", "thumbnail": "editor/assets/mtf-horizontal.png", "title": "Match The Following", "disc": "", "category": "MTF", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "horizontalMTF", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/mtf_template.html", "controller": "renderer/controllers/mtf_controller.js" } }], "renderer": { "main": "renderer/plugin.js", "dependencies": [{ "type": "css", "src": "renderer/styles/style.css" }, { "type": "js", "src": "renderer/util/evaluator.js" }, { "type": "js", "src": "renderer/controllers/mtf_controller.js" }, { "type": "js", "src": "renderer/templates/mtf_template.html" }] }, "dependencies": [{ "plugin": "org.ekstep.questionunit", "ver": "1.0", "type": "plugin", "scope": "all" }] };

    ftbPlugin = { "id": "org.ekstep.questionunit.ftb", "ver": "1.0", "author": "Gourav More", "title": "FTB question", "description": "", "publishedDate": "", "languages": ["English"], "categories": [], "keywords": ["ftbplugin"], "editor": { "main": "editor/plugin.js", "dependencies": [{ "type": "plugin", "plugin": "org.ekstep.questionunit", "ver": "1.0" }, { "type": "css", "src": "editor/styles/style.css" }], "menu": [], "init-data": { "type": "rect", "x": 10, "y": 2, "w": 80, "h": 80, "fill": "#DCDCDC" }, "configManifest": [{}], "help": { "src": "editor/help.md", "dataType": "text" } }, "dependencies": [{ "plugin": "org.ekstep.questionunit", "ver": "1.0", "type": "plugin", "scope": "all" }, { "plugin": "org.ekstep.keyboard", "ver": "1.0", "type": "plugin", "scope": "renderer" }], "templates": [{ "id": "ftbtemplate", "thumbnail": "editor/assets/ftb-horizontal.png", "title": "Fill in the Blanks", "disc": "A type of question or phrase with one or more words replaced with a blank line, giving the reader the chance to add the missing word(s).", "category": "FTB", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "ftbtemplate", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/horizontal_template.html", "controller": "renderer/controllers/horizontal_controller.js" }, "pluginID": "org.ekstep.questionunit.ftb", "ver": "1.0", "thumbnail1": "/plugins/org.ekstep.questionunit.ftb-1.0/editor/assets/ftb-horizontal.png", "data": { "name": "Fill in the Blanks", "icon": "minus square outline icon" } }], "renderer": { "main": "renderer/plugin.js", "dependencies": [{ "type": "css", "src": "renderer/styles/style.css" }, { "type": "js", "src": "renderer/controllers/horizontal_controller.js" }, { "type": "js", "src": "renderer/templates/horizontal_template.html" }] } };
    spyOn(org.ekstep.pluginframework.pluginManager, "getPluginManifest").and.callFake(function(pluginId) {
      if (pluginId === "org.ekstep.question") {
        return plugin.manifest;
      } else if (pluginId === "org.ekstep.questionunit.mcq") {
        return mcqPlugin;
      } else if (pluginId === "org.ekstep.questionunit.ftb") {
        return ftbPlugin;
      } else if (pluginId === "org.ekstep.questionunit.mtf") {
        return mtfPlugin;
      } else {
        return {};
      }
    });
  });

  describe("Question Creation", function() {
    var value = {},
      templateMenus = {},
      metaDataObj = {},
      metaDataEvent = {},
      expectedMCQFormData = {},
      expectedFTBFormData = {},
      expectedMTFFormData = {},
      iFrameArea = null,
      mockPreviewInstance, validFormData, validFormEvent;
    beforeEach(function() {
      ctrl = $controller('QuestionCreationFormController', { $scope: $scope, instance: plugin, questionData: {} });
      var window = $window;
      spyOn($scope, "showTemplates").and.callThrough();
      spyOn($scope, "setPreviewData").and.callThrough();
      spyOn($scope, "showPreview").and.callThrough();
      spyOn(ecEditor, "dispatchEvent").and.callThrough();
      spyOn($scope, "validateQuestionCreationForm").and.callThrough();
      spyOn($scope, "createPluginInstance").and.callThrough();
      spyOn(ecEditor, 'resolvePluginResource').and.callFake(function(id) {
        if (id == "org.ekstep.questionunit.mcq") {
          return "/plugins/org.ekstep.questionunit.mcq-1.0/editor/templates/horizontal_template.html"
        }
      });
      spyOn($scope, 'saveQuestion').and.callThrough();
      value = { "id": "horizontalMCQ", "thumbnail": "editor/assets/mcq-horizontal.png", "title": "Multiple Choice Question", "disc": "Multiple choice items consist of a stem, the correct answer, keyed alternative, and distractors. The stem is the beginning part of the item that presents the item as a problem to be solved, a question asked of the respondent, or an incomplete statement to be completed, as well as any other relevant information.", "category": "MCQ", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "horizontalMCQ", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/horizontal_template.html", "controller": "renderer/controllers/horizontal_controller.js" }, "pluginID": "org.ekstep.questionunit.mcq", "ver": "1.0", "thumbnail1": "/plugins/org.ekstep.questionunit.mcq-1.0/editor/assets/mcq-horizontal.png", "data": { "name": "Multiple Choice", "icon": "list icon" } };

      templateMenus = { "MCQ": { "category": "MCQ", "data": { "name": "Multiple Choice", "icon": "list icon" }, "templatesData": [{ "id": "horizontalMCQ", "thumbnail": "editor/assets/mcq-horizontal.png", "title": "Multiple Choice Question", "disc": "Multiple choice items consist of a stem, the correct answer, keyed alternative, and distractors. The stem is the beginning part of the item that presents the item as a problem to be solved, a question asked of the respondent, or an incomplete statement to be completed, as well as any other relevant information.", "category": "MCQ", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "horizontalMCQ", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/horizontal_template.html", "controller": "renderer/controllers/horizontal_controller.js" }, "pluginID": "org.ekstep.questionunit.mcq", "ver": "1.0", "thumbnail1": false, "data": { "name": "Multiple Choice", "icon": "list icon" } }] }, "FTB": { "category": "FTB", "data": { "name": "Fill in the Blanks", "icon": "minus square outline icon" }, "templatesData": [{ "id": "ftbtemplate", "thumbnail": "editor/assets/ftb-horizontal.png", "title": "Fill in the Blanks", "disc": "A type of question or phrase with one or more words replaced with a blank line, giving the reader the chance to add the missing word(s).", "category": "FTB", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "ftbtemplate", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/horizontal_template.html", "controller": "renderer/controllers/horizontal_controller.js" }, "pluginID": "org.ekstep.questionunit.ftb", "ver": "1.0", "thumbnail1": false, "data": { "name": "Fill in the Blanks", "icon": "minus square outline icon" } }] }, "MTF": { "category": "MTF", "data": { "name": "Match the following", "icon": "block layout icon" }, "templatesData": [{ "id": "horizontalMTF", "thumbnail": "editor/assets/mtf-horizontal.png", "title": "Match The Following", "disc": "", "category": "MTF", "editor": { "templateURL": "editor/templates/horizontal_template.html", "controllerURL": "editor/controllers/horizontal_controller.js", "template": "horizontalMTF", "controller": "QuestionFormController" }, "renderer": { "template": "renderer/templates/mtf_template.html", "controller": "renderer/controllers/mtf_controller.js" }, "pluginID": "org.ekstep.questionunit.mtf", "ver": "1.0", "thumbnail1": false, "data": { "name": "Match the following", "icon": "block layout icon" } }] }, "OTHER": { "category": "OTHER", "data": { "name": "Other", "icon": "ellipsis horizontal icon" }, "templatesData": [] } };

      metaDataObj = { "isValid": true, "formData": { "metaData": {}, "nodeId": "do_112495621900836864142" } };

      metaDataEvent = { "target": undefined, "type": "editor:form:data" };

      expectedMCQFormData = {
        "request": {
          "assessment_item": {
            "objectType": "AssessmentItem",
            "metadata": {
              "code": "NA",
              "name": "choose the color of the sky\n",
              "qlevel": "EASY",
              "title": "choose the color of the sky\n",
              "question": "<p>choose the color of the sky</p>\n",
              "max_score": 1,
              "isShuffleOption": false,
              "body": "{\"data\":{\"data\":{\"question\":{\"text\":\"<p>choose the color of the sky</p>\\n\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"blue\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:797\"},{\"text\":\"red\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:798\"}],\"questionCount\":1,\"media\":[]},\"config\":{\"metadata\":{\"category\":\"MCQ\",\"title\":\"choose the color of the sky\\n\",\"medium\":\"English\",\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\"}],\"description\":\"choose the color of the sky\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1},\"media\":[]}}",
              "medium": "English",
              "subject": undefined,
              "board": undefined,
              "itemType": "UNIT",
              "version": 2,
              "category": "MCQ",
              "description": "choose the color of the sky",
              "createdBy": "390",
              "type": "mcq",
              "template": "NA",
              "template_id": "NA",
              "options": [{
                "answer": true,
                "value": {
                  "type": "text",
                  "asset": "1"
                }
              }]
            }
          }
        }
      };

      expectedFTBFormData = {
        "request": {
          "assessment_item": {
            "objectType": "AssessmentItem",
            "metadata": {
              "code": "NA",
              "name": "The color of sky is ____\n",
              "qlevel": "EASY",
              "title": "The color of sky is ____\n",
              "question": "<p>The color of sky is [[blue]]</p>\n",
              "max_score": 1,
              "isShuffleOption": false,
              "body": "{\"data\":{\"data\":{\"question\":{\"text\":\"<p>The color of sky is [[blue]]</p>\\n\",\"image\":\"\",\"audio\":\"\",\"keyboardConfig\":{\"keyboardType\":\"Device\",\"customKeys\":[]}},\"answer\":[\"blue\"],\"parsedQuestion\":{\"text\":\"<p>The color of sky is <input type=\\\"text\\\" class=\\\"ans-field\\\" id=\\\"ans-field1\\\"></p>\\n\",\"image\":\"\",\"audio\":\"\"}},\"config\":{\"metadata\":{\"category\":\"FTB\",\"title\":\"The color of sky is ____\\n\",\"medium\":\"English\",\"qlevel\":\"EASY\",\"gradeLevel\":[\"Kindergarten\"],\"concepts\":[\"BIO3\"],\"description\":\"The color of sky is ____\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false}}}",
              "medium": "English",
              "subject": undefined,
              "board": undefined,
              "itemType": "UNIT",
              "version": 2,
              "category": "FTB",
              "description": "The color of sky is ____",
              "createdBy": "390",
              "type": "ftb",
              "template": "NA",
              "template_id": "NA",
              "answer": [{
                "answer": true,
                "value": {
                  "type": "text",
                  "asset": "1"
                }
              }]
            }
          }
        }
      };

      expectedMTFFormData = {
        "request": {
          "assessment_item": {
            "objectType": "AssessmentItem",
            "metadata": {
              "code": "NA",
              "name": "Match the color\n",
              "qlevel": "EASY",
              "title": "Match the color\n",
              "question": "<p>Match the color</p>\n",
              "max_score": 1,
              "isShuffleOption": false,
              "body": "{\"data\":{\"data\":{\"question\":{\"text\":\"<p>Match the color</p>\\n\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\"},\"option\":{\"optionsLHS\":[{\"text\":\"Apple\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"index\":1,\"$$hashKey\":\"object:903\"},{\"text\":\"Sky\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"index\":2,\"$$hashKey\":\"object:904\"},{\"text\":\"Leaf\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"index\":3,\"$$hashKey\":\"object:905\"}],\"optionsRHS\":[{\"text\":\"Red\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"mapIndex\":1},{\"text\":\"blue\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"mapIndex\":2},{\"text\":\"Green\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"mapIndex\":3}],\"questionCount\":0},\"media\":[],\"questionCount\":1},\"config\":{\"metadata\":{\"category\":\"MTF\",\"title\":\"Match the color\\n\",\"medium\":\"English\",\"qlevel\":\"EASY\",\"gradeLevel\":[\"Kindergarten\"],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\"}],\"description\":\"Match the color\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1},\"media\":[]}}",
              "medium":"English",
              "subject": undefined,
              "board": undefined,
              "itemType": "UNIT",
              "version": 2,
              "category": "MTF",
              "description": "Match the color",
              "createdBy": "390",
              "type": "mtf",
              "template": "NA",
              "template_id": "NA",
              "lhs_options": [{
                "value": {
                  "type": "mixed",
                  "text": "इक",
                  "image": "",
                  "count": "",
                  "audio": "",
                  "resvalue": "इक",
                  "resindex": 0
                },
                "index": 0
              }],
              "rhs_options": [{
                "value": {
                  "type": "mixed",
                  "text": "इक",
                  "image": "",
                  "count": "",
                  "audio": "",
                  "resvalue": "इक",
                  "resindex": 0
                },
                "index": 0
              }]
            }
          }
        }
      };
      window.context = { "content_id": "", "sid": "rctrs9r0748iidtuhh79ust993", "user": { "id": "390", "name": "Chetan Sachdev", "email": "chetan.sachdev@tarento.com", "avtar": "https://release.ekstep.in/media/com_easysocial/defaults/avatars/user/medium.png", "logout": "https://release.ekstep.in/index.php?option=com_easysocial&view=login&layout=logout" }, "baseURL": "https://release.ekstep.in/", "editMetaLink": "/component/ekcontent/contentform/do_10097535?Itemid=0", "contentId": "do_112467889506631680131", "uid": "390", "etags": { "app": [], "partner": [], "dims": [] }, "pdata": { "id": "in.ekstep", "ver": "1.0", "pid": "contenteditor" } };
      $scope.assessmentId = "do_112495621900836864142";
      iFrameArea = document.createElement('iframe');
      iFrameArea.id = 'iframeArea';
      document.body.appendChild(iFrameArea);
      mockPreviewInstance = new function() {
        this.manifest = {
          "id": "org.ekstep.questionset.preview",
          "ver": "1.0",
          "shortId": "qs",
          "author": "Rajeev Sathish",
          "title": "Question Set Preview Plugin",
          "description": "Plugin to create the preview content for question set",
          "publishedDate": "",
          "editor": {
            "main": "editor/plugin.js",
            "configManifest": []
          }
        },
        this.attributes = {
          "x": null,
          "y": null,
          "w": null,
          "h": null
        },
        this.editorData = {
          "x": null,
          "y": null,
          "w": null,
          "h": null
        },
        this.children = [],
        this.id = "2b570c0b-45d6-4a07-844e-aa293e43e4e6",
        this.config = {
          "opacity": 100,
          "strokeWidth": 1,
          "stroke": "rgba(255, 255, 255, 0)",
          "autoplay": false,
          "visible": true
        },
        this.configManifest = [{
          "propertyName": "autoplay",
          "title": "Auto play",
          "description": "Set the element's playability",
          "dataType": "boolean",
          "required": true,
          "defaultValue": false
        },
        {
          "propertyName": "visible",
          "title": "Visible",
          "description": "Set the element's Visibility",
          "dataType": "boolean",
          "required": true,
          "defaultValue": true
        },
        {
          "propertyName": "stroke",
          "title": "Border Color",
          "description": "Set the border color for element",
          "dataType": "colorpicker",
          "required": true,
          "defaultValue": "rgba(255, 255, 255, 0)"
        }],
        this.getQuestionPreviwContent = function() {
          return {
            "theme": {
              "startStage": "splash",
              "id": "theme",
              "ver": 0.3,
              "stage": [{ "id": "splash", "org.ekstep.questionset": { "x": 9, "y": 6, "w": 80, "h": 85, "org.ekstep.question": [{ "id": "c943d0a907274471a0572e593eab49c2", "pluginId": "org.ekstep.questionunit.mtf", "pluginVer": "1.0", "templateId": "horizontalMTF", "data": "{\"question\":{\"text\":\"<p>Match the color</p>\\n\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\"},\"option\":{\"optionsLHS\":[{\"text\":\"Apple\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"index\":1,\"$$hashKey\":\"object:903\"},{\"text\":\"Sky\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"index\":2,\"$$hashKey\":\"object:904\"},{\"text\":\"Leaf\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"index\":3,\"$$hashKey\":\"object:905\"}],\"optionsRHS\":[{\"text\":\"Red\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"mapIndex\":1},{\"text\":\"blue\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"mapIndex\":2},{\"text\":\"Green\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"mapIndex\":3}],\"questionCount\":0},\"media\":[],\"questionCount\":1}", "config": "{\"metadata\":{\"title\":\"question title\",\"description\":\"question description\",\"medium\":\"English\"},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"isShuffleOption\":false,\"layout\":\"Horizontal\"}", "w": "80", "x": "9", "h": "85", "y": "6" }] }, "x": 0, "y": 0, "w": 100, "h": 100 }],
              "manifest": {
                "media": [
                  [{ "id": "org.ekstep.questionunit", "plugin": "org.ekstep.questionunit", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit-1.0/renderer/plugin.js", "type": "plugin" }, { "id": "org.ekstep.questionunit_manifest", "plugin": "org.ekstep.questionunit", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit-1.0/manifest.json", "type": "json" }, { "id": "7dec3d7d-ebc7-4133-b147-d442003574bb", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit.mtf-1.0/renderer/styles/style.css", "type": "css" }, { "id": "2541beec-c56c-4a26-9967-cebde76a7511", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit.mtf-1.0/renderer/util/evaluator.js", "type": "js" }, { "id": "002e2e62-594c-41a6-a9c6-4d07255cc086", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit.mtf-1.0/renderer/controllers/mtf_controller.js", "type": "js" }, { "id": "052873b7-104a-45bb-890e-0364d95d2be0", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit.mtf-1.0/renderer/templates/mtf_template.html", "type": "js" }, { "id": "org.ekstep.questionunit.mtf", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit.mtf-1.0/renderer/plugin.js", "type": "plugin" }, { "id": "org.ekstep.questionunit.mtf_manifest", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0", "src": "/plugins/org.ekstep.questionunit.mtf-1.0/manifest.json", "type": "json" }, { "id": "624ca773-1624-4699-a6c1-014e633a6d90", "plugin": "org.ekstep.navigation", "ver": "1.0", "src": "/plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_$scope.js", "type": "js" }, { "id": "3a54b744-2193-4804-8854-51e9c8de2151", "plugin": "org.ekstep.navigation", "ver": "1.0", "src": "/plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html", "type": "js" }, { "id": "org.ekstep.navigation", "plugin": "org.ekstep.navigation", "ver": "1.0", "src": "/plugins/org.ekstep.navigation-1.0/renderer/plugin.js", "type": "plugin" }, { "id": "org.ekstep.navigation_manifest", "plugin": "org.ekstep.navigation", "ver": "1.0", "src": "/plugins/org.ekstep.navigation-1.0/manifest.json", "type": "json" }, { "id": "org.ekstep.questionset.quiz", "plugin": "org.ekstep.questionset.quiz", "ver": "1.0", "src": "/plugins/org.ekstep.questionset.quiz-1.0/renderer/plugin.js", "type": "plugin" }, { "id": "org.ekstep.questionset.quiz_manifest", "plugin": "org.ekstep.questionset.quiz", "ver": "1.0", "src": "/plugins/org.ekstep.questionset.quiz-1.0/manifest.json", "type": "json" }, { "id": "org.ekstep.iterator", "plugin": "org.ekstep.iterator", "ver": "1.0", "src": "/plugins/org.ekstep.iterator-1.0/renderer/plugin.js", "type": "plugin" }, { "id": "org.ekstep.iterator_manifest", "plugin": "org.ekstep.iterator", "ver": "1.0", "src": "/plugins/org.ekstep.iterator-1.0/manifest.json", "type": "json" }, { "id": "1d25869b-6b9a-4912-89c2-a8809a83eb1b", "plugin": "org.ekstep.questionset", "ver": "1.0", "src": "/plugins/org.ekstep.questionset-1.0/renderer/controller/questionset_$scope.js", "type": "js" }, { "id": "a4154b0a-9875-4d61-b2d0-ebe85ec46621", "plugin": "org.ekstep.questionset", "ver": "1.0", "src": "/plugins/org.ekstep.questionset-1.0/renderer/templates/questionset_template.html", "type": "js" }, { "id": "5468edbd-c1dc-4640-93b8-9ec193452833", "plugin": "org.ekstep.questionset", "ver": "1.0", "src": "/plugins/org.ekstep.questionset-1.0/renderer/utils/telemetry_logger.js", "type": "js" }, { "id": "13ebeec2-2aec-4038-a306-7e3c6ba9621a", "plugin": "org.ekstep.questionset", "ver": "1.0", "src": "/plugins/org.ekstep.questionset-1.0/renderer/styles/style.css", "type": "css" }, { "id": "org.ekstep.questionset", "plugin": "org.ekstep.questionset", "ver": "1.0", "src": "/plugins/org.ekstep.questionset-1.0/renderer/plugin.js", "type": "plugin" }, { "id": "org.ekstep.questionset_manifest", "plugin": "org.ekstep.questionset", "ver": "1.0", "src": "/plugins/org.ekstep.questionset-1.0/manifest.json", "type": "json" }]
                ]
              },
              "plugin-manifest": { "plugin": [{ "id": "org.ekstep.questionunit", "ver": "1.0", "type": "plugin", "depends": "" }, { "id": "org.ekstep.questionunit.mtf", "ver": "1.0", "type": "plugin", "depends": "org.ekstep.questionunit" }, { "id": "org.ekstep.navigation", "ver": "1.0", "type": "plugin", "depends": "" }, { "id": "org.ekstep.questionset.quiz", "ver": "1.0", "type": "plugin", "depends": "" }, { "id": "org.ekstep.iterator", "ver": "1.0", "type": "plugin", "depends": "" }, { "id": "org.ekstep.questionset", "ver": "1.0", "type": "plugin", "depends": "org.ekstep.questionset.quiz,org.ekstep.iterator" }] }
            }
          };
        };
      }
      spyOn(ecEditor, "getPluginInstances").and.callFake(function() {
        return {
          '2b570c0b-45d6-4a07-844e-aa293e43e4e6': mockPreviewInstance
        };
      });
      spyOn($scope, "formIsValid").and.callThrough();
      spyOn($scope, "extractHTML").and.callThrough();
      spyOn(ecEditor, "getContext").and.callFake(function() {
        return undefined;
      });
      validFormData = { "question": { "text": "<p>choose the color of the sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true, "$$hashKey": "object:797" }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false, "$$hashKey": "object:798" }], "questionCount": 1, "media": [] };
      validFormEvent = { name: "question:form:valid" };
    });
    it("should set $scope not to be undefined", function() {
      expect($scope).not.toBeUndefined();
    });

    it("should set $scope not to be undefined", function() {
      $scope.cancel();
      spyOn($scope, "closeThisDialog").and.callFake(function() {});
      expect($scope).not.toBeUndefined();
    });
    describe("init function", function() {

      it("should call showQuestionForm", function() {
        $scope.init();
        expect($scope.showTemplates).toHaveBeenCalled();
      });

      xit("should load dropdown", function() {
        $scope.init();
        expect($('.ui.dropdown').dropdown).toHaveBeenCalled();
      });
    });

    describe("showTemplates function", function() {

      it("should return menu items", function() {
        $scope.showTemplates();
      });

      it("should  set category as MCQ, if it is MCQ", function() {
        $scope.showTemplates();
      });
      it("should set category as other if it doesnot contain category", function() {
        $scope.showTemplates();
      });;
    });
    describe("showQuestionUnitForm function", function() {
      it("should add templateName as Multiple Choice Question", function() {
        $scope.showQuestionUnitForm(value);
        expect($scope.templateName).toEqual(value.title);
        expect($scope.questionUnitTemplateURL).toEqual("/plugins/org.ekstep.questionunit.mcq-1.0/editor/templates/horizontal_template.html?BUILDNUMBER")
      });
      it("should set category as other if it doesnot contain category", function() {
        $scope.showQuestionUnitForm(value);
        expect(ecEditor.resolvePluginResource).toHaveBeenCalledWith(value.pluginID, value.ver, value.editor.templateURL);
      });
    });
    describe("saveMetaData function", function() {
      it("should call saveQuestion while storing the meta data", function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>choose the color of the sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true, "$$hashKey": "object:797" }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false, "$$hashKey": "object:798" }], "questionCount": 1, "media": [] };
        $scope.saveMetaData(metaDataEvent, metaDataObj);
        expect($scope.saveQuestion).toHaveBeenCalled();
      });
      it("should set metaData if it is MCQ question", function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>choose the color of the sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true, "$$hashKey": "object:797" }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false, "$$hashKey": "object:798" }], "questionCount": 1, "media": [] };
        $scope.questionMetaData = {
          "name": "choose the color of the sky\n",
          "medium": "English",
          "level": "EASY",
          "description": "choose the color of the sky",
          "max_score": 1,
          "gradeLevel": [
            "Grade 1"
          ],
          "concepts": [{
            "identifier": "LO4",
            "name": "Understanding of Grammar/Syntax"
          }],
          "conceptData": "(1) concepts selected",
          "searchText": "choose",
          "myQuestions": true
        };
        $scope.category = "MCQ";
        $scope.saveMetaData(metaDataEvent, metaDataObj);
        expect($scope.qFormData).toEqual(expectedMCQFormData);
      });
      it("should set metaData if it is FTB question", function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>The color of sky is [[blue]]</p>\n", "image": "", "audio": "", "keyboardConfig": { "keyboardType": "Device", "customKeys": [] } }, "answer": ["blue"], "parsedQuestion": { "text": "<p>The color of sky is <input type=\"text\" class=\"ans-field\" id=\"ans-field1\"></p>\n", "image": "", "audio": "" } };
        $scope.questionMetaData = { "name": "The color of sky is ____\n", "medium": "English", "level": "EASY", "description": "The color of sky is ____", "max_score": 1, "gradeLevel": ["Kindergarten"], "concepts": ["BIO3"], "searchText": "choose the" };
        $scope.category = "FTB";
        $scope.saveMetaData(metaDataEvent, metaDataObj);
        expect($scope.qFormData).toEqual(expectedFTBFormData);
      });
      it("should set metaData if it is MTF question", function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>Match the color</p>\n", "image": "", "audio": "", "hint": "" }, "option": { "optionsLHS": [{ "text": "Apple", "image": "", "audio": "", "hint": "", "index": 1, "$$hashKey": "object:903" }, { "text": "Sky", "image": "", "audio": "", "hint": "", "index": 2, "$$hashKey": "object:904" }, { "text": "Leaf", "image": "", "audio": "", "hint": "", "index": 3, "$$hashKey": "object:905" }], "optionsRHS": [{ "text": "Red", "image": "", "audio": "", "hint": "", "mapIndex": 1 }, { "text": "blue", "image": "", "audio": "", "hint": "", "mapIndex": 2 }, { "text": "Green", "image": "", "audio": "", "hint": "", "mapIndex": 3 }], "questionCount": 0 }, "media": [], "questionCount": 1 };
        $scope.questionMetaData = { "name": "Match the color\n", "medium": "English", "level": "EASY", "description": "Match the color", "max_score": 1, "gradeLevel": ["Kindergarten"], "concepts": [{ "identifier": "LO4", "name": "Understanding of Grammar/Syntax" }] };
        $scope.category = "MTF";
        $scope.saveMetaData(metaDataEvent, metaDataObj);
        expect($scope.qFormData).toEqual(expectedMTFFormData);
      });
    });
    describe("setPreviewData function", function() {
      beforeEach(function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>Choose the color of sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false }], "questionCount": 1, "media": [] };
        $scope.selectedTemplatePluginData.plugin = { "id": "org.ekstep.questionunit.mcq", "templateId": "horizontalMCQ", "version": "1.0" };
      });
      it("to be called", function() {
        $scope.questionMetadataScreen = true;
        $scope.setPreviewData();
        expect(ecEditor.dispatchEvent).toHaveBeenCalled();
      });
    });

    describe("showPreview function", function() {
      beforeEach(function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>Choose the color of sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false }], "questionCount": 1, "media": [] };
        $scope.selectedTemplatePluginData.plugin = { "id": "org.ekstep.questionunit.mcq", "templateId": "horizontalMCQ", "version": "1.0" };
      });
      it("should call set preview", function() {
        $scope.questionMetadataScreen = true;
        $scope.showPreview();
        expect($scope.setPreviewData).toHaveBeenCalled();
      });
      it("should validate form on click of preview", function() {
        $scope.questionMetadataScreen = false;
        $scope.showPreview();
        expect($scope.validateQuestionCreationForm).toHaveBeenCalled();
      });
    });
    describe("formIsValid function", function() {
      beforeEach(function() {
        $scope.questionCreationFormData = { "question": { "text": "<p>Choose the color of sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false }], "questionCount": 1, "media": [] };
        $scope.selectedTemplatePluginData.plugin = { "id": "org.ekstep.questionunit.mcq", "templateId": "horizontalMCQ", "version": "1.0" };
      });
      it("should call extractHTML to set title", function() {
        $scope.refreshPreview = false;
        $scope.formIsValid();
        expect($scope.extractHTML).toHaveBeenCalled();
      });
    });

  });

  describe("Question Edit on", function() {
    var questionData1 = {};
    beforeEach(function() {
      questionData1 = { "code": "NA", "name": "choose the color of the sky\n", "qlevel": "EASY", "title": "choose the color of the sky\n", "question": "<p>choose the color of the sky</p>\n", "max_score": 1, "isShuffleOption": false, "body": "{\"data\":{\"plugin\":{\"id\":\"org.ekstep.questionunit.mcq\",\"version\":\"1.0\",\"templateId\":\"horizontalMCQ\"},\"data\":{\"question\":{\"text\":\"<p>choose the color of the sky</p>\\n\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"blue\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:797\"},{\"text\":\"red\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:798\"}],\"questionCount\":1,\"media\":[]},\"config\":{\"metadata\":{\"category\":\"MCQ\",\"title\":\"choose the color of the sky\\n\",\"medium\":\"English\",\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\"}],\"description\":\"choose the color of the sky\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1},\"media\":[]}}", "medium": "English", "itemType": "UNIT", "version": 2, "category": "MCQ", "description": "choose the color of the sky", "createdBy": "390", "type": "mcq", "template": "NA", "template_id": "NA", "options": [{ "answer": true, "value": { "type": "text", "asset": "1" } }], "identifier": "do_112495621900836864142", "isSelected": true, "$$hashKey": "object:2145" };
      ctrl = $controller('QuestionCreationFormController', { $scope: $scope, instance: plugin, questionData: questionData1 });
      spyOn(ecEditor, "dispatchEvent").and.callThrough();
      spyOn($scope, "showQuestionForm").and.callThrough();
      spyOn($scope, "validateQuestionCreationForm").and.callThrough();
      spyOn($scope, "showPreview").and.callThrough();
      spyOn($scope, "createPluginInstance").and.callThrough();
    });

    it("should set $scope not to be undefined", function() {
      expect($scope).not.toBeUndefined();
    });

    it("should call showQuestionForm", function() {
      $scope.init();
      expect($scope.showQuestionForm).toHaveBeenCalled();
    });

    it("should call showQuestionForm", function() {
      var expectedQData = { "data": { "plugin": { "id": "org.ekstep.questionunit.mcq", "version": "1.0", "templateId": "horizontalMCQ" }, "data": { "question": { "text": "<p>choose the color of the sky</p>\n", "image": "", "audio": "", "hint": "" }, "options": [{ "text": "blue", "image": "", "audio": "", "hint": "", "isCorrect": true, "$$hashKey": "object:797" }, { "text": "red", "image": "", "audio": "", "hint": "", "isCorrect": false, "$$hashKey": "object:798" }], "questionCount": 1, "media": [] }, "config": { "metadata": { "category": "MCQ", "title": "choose the color of the sky\n", "medium": "English", "qlevel": "EASY", "gradeLevel": ["Grade 1"], "concepts": [{ "identifier": "LO4", "name": "Understanding of Grammar/Syntax" }], "description": "choose the color of the sky", "max_score": 1 }, "max_time": 0, "max_score": 1, "partial_scoring": true, "layout": "Horizontal", "isShuffleOption": false, "questionCount": 1 }, "media": [] }, "qcLanguage": "English", "questionTitle": "choose the color of the sky\n", "qcLevel": "EASY", "templateType": "Horizontal", "isPartialScore": true, "qcGrade": ["Grade 1"], "isShuffleOption": false, "concepts": [{ "identifier": "LO4", "name": "Understanding of Grammar/Syntax" }], "questionDesc": "choose the color of the sky", "questionMaxScore": 1 };
      $scope.showQuestionForm(expectedQData);
      expect($scope.questionData.isShuffleOption).toEqual(expectedQData.isShuffleOption);
    });

    it("should validate form on click of next", function() {
      $scope.showMetaform();
      expect($scope.validateQuestionCreationForm).toHaveBeenCalled();
    });

    it("should validate form on click of preview", function() {
      $scope.showPreview();
      expect($scope.validateQuestionCreationForm).toHaveBeenCalled();
    });

    it("should go back to template screen", function() {
      $scope.questionMetadataScreen = false;
      $scope.back();
    });

    it("should go back to template screen", function() {
      $scope.questionMetadataScreen = true;
      spyOn($.fn, "scope").and.returnValue({
        "contentMeta": {
          "name": "choose the color of the sky",
          "max_score": 1
        }
      });
      var metaFormScope = $('#question-meta-form #content-meta-form').scope();
      $scope.back();
      expect($scope.questionData.questionMaxScore).toEqual(metaFormScope.contentMeta.max_score);
    });

    it("should call saveQuestionV3", function() {
      var data = { "request": { "assessment_item": { "objectType": "AssessmentItem", "metadata": { "code": "NA", "name": "choose the color of the sky\n", "qlevel": "EASY", "title": "choose the color of the sky\n", "question": "<p>choose the color of the sky</p>\n", "max_score": 1, "isShuffleOption": false, "body": "{\"data\":{\"plugin\":{\"id\":\"org.ekstep.questionunit.mcq\",\"version\":\"1.0\",\"templateId\":\"horizontalMCQ\"},\"data\":{\"question\":{\"text\":\"<p>choose the color of the sky</p>\\n\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"blue\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:797\"},{\"text\":\"red\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:798\"}],\"questionCount\":1,\"media\":[]},\"config\":{\"metadata\":{\"category\":\"MCQ\",\"title\":\"choose the color of the sky\\n\",\"medium\":\"English\",\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\"}],\"description\":\"choose the color of the sky\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1},\"media\":[]}}", "medium": "English", "itemType": "UNIT", "version": 2, "category": "MCQ", "description": "choose the color of the sky", "createdBy": "390", "type": "mcq", "template": "NA", "template_id": "NA", "options": [{ "answer": true, "value": { "type": "text", "asset": "1" } }], "identifier": "do_112495621900836864142", "isSelected": true } } } };
      $scope.saveQuestion('do_112495621900836864142', data);
      expect(ecEditor.getService('assessment').saveQuestionV3).toHaveBeenCalled();
    });

  });
});

//# sourceURL=questionCtrl.spec.js