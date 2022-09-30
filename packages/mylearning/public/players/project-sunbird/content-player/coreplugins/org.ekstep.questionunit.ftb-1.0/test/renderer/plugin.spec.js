describe('RendererPlugin', function() {
  // Renderer plugin can't be tested as of now
  // Please move the logic to other classes and test them independently
  // Let the plugin class delegate functionality to these classes
  var plugin, qsFTBTemplate, showFTBEvent, evaluateEvent;

  beforeEach(function() {
    plugin = new org.ekstep.questionunitFTB.RendererPlugin({}, {}, {});
    qsFTBTemplate = FTBController; // eslint-disable-line no-undef
    spyOn(plugin, "setQuestionTemplate").and.callThrough();
    spyOn(plugin, "preQuestionShow").and.callThrough();
    spyOn(plugin, "postQuestionShow").and.callThrough();
    spyOn(plugin, "evaluateQuestion").and.callThrough();
    spyOn(qsFTBTemplate, "setStateInput").and.callThrough();
    spyOn(EkstepRendererAPI, "dispatchEvent").and.callThrough();
    spyOn(FTBController, "generateHTML").and.callThrough(); // eslint-disable-line no-undef
    plugin._super = jasmine.createSpy('_super').and.callFake(function() {
      return {};
    });
    plugin.saveQuestionState = jasmine.createSpy('saveQuestionState').and.callFake(function() {
      return {};
    });
    showFTBEvent = {
      "type": "org.ekstep.questionunit.ftb:show",
      "target": function() {
        return {};
      }
    };
    evaluateEvent = {
      "type": "org.ekstep.questionunit.ftb:evaluate",
      "target": function() {
        return {};
      }
    };
    plugin._question = {
      "template": "<div id=\"ftb-template\">  <div class=\"qs-ftb-container\">    <div class=\"qs-ftb-content\">        <div class=\"qs-ftb-question\" id=\"qs-ftb-question\">          <%= question.data.question.text %>        </div>    </div>  </div></div>",
      "data": {
        "question": {
          "text": "<p>English a [[b]] c [[d]]</p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "English",
            "customKeys": []
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>English a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
          "image": "",
          "audio": ""
        }
      },
      "config": {
        "metadata": {
          "category": "FTB",
          "title": "English a ____ c ____\n",
          "language": [
            "English"
          ],
          "qlevel": "EASY",
          "gradeLevel": [
            "Kindergarten"
          ],
          "concepts": [{
            "identifier": "do_112300246933831680110",
            "name": "abcd"
          }],
          "description": "English a ____ c ____",
          "max_score": 1
        },
        "max_time": 0,
        "max_score": 1,
        "partial_scoring": true,
        "layout": "Horizontal",
        "isShuffleOption": false
      }
    };
  });
  describe('setQuestionTemplate', function() {

    it('should ?', function() {
      plugin.setQuestionTemplate();
      expect(plugin._question.template).not.toBe(undefined);
    });
    it('should set questionData', function() {
      var expectedQuesData = {
        "question": {
          "text": "<p>English a  <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"> c  <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"></p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "English",
            "customKeys": []
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>English a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
      plugin.preQuestionShow(showFTBEvent); // eslint-disable-line no-unused-vars
      expect(plugin._question.data).toEqual(expectedQuesData);
    });
    it('should call generateHTML', function() {

      plugin.preQuestionShow(showFTBEvent); // eslint-disable-line no-unused-vars
      expect(FTBController.generateHTML).toHaveBeenCalledWith(plugin._question.data); // eslint-disable-line no-undef
    });
  });

  describe('PostQuestion function', function() {

    it('should not set state when navigating to next Question', function() {

      plugin.postQuestionShow(showFTBEvent);
      expect(qsFTBTemplate.setStateInput).not.toHaveBeenCalled();
    });

    it('should set state when navigating to previous Question', function() {
      plugin._question = {
        "template": "<div id=\"ftb-template\">  <div class=\"qs-ftb-container\">    <div class=\"qs-ftb-content\">        <div class=\"qs-ftb-question\" id=\"qs-ftb-question\">          <%= question.data.question.text %>        </div>    </div>  </div></div>",
        "data": {
          "question": {
            "text": "<p>English a  <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"> c  <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"></p>\n",
            "image": "",
            "audio": "",
            "keyboardConfig": {
              "keyboardType": "English",
              "customKeys": []
            }
          },
          "answer": [
            "b",
            "d"
          ],
          "parsedQuestion": {
            "text": "<p>English a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
            "image": "",
            "audio": ""
          }
        },
        "config": {
          "metadata": {
            "category": "FTB",
            "title": "English a ____ c ____\n",
            "language": [
              "English"
            ],
            "qlevel": "EASY",
            "gradeLevel": [
              "Kindergarten"
            ],
            "concepts": [{
              "identifier": "do_112300246933831680110",
              "name": "abcd"
            }],
            "description": "English a ____ c ____",
            "max_score": 1
          },
          "max_time": 0,
          "max_score": 1,
          "partial_scoring": true,
          "layout": "Horizontal",
          "isShuffleOption": false
        },
        "state": {
          "val": [
            "b",
            "d"
          ]
        }
      };
      plugin.postQuestionShow(showFTBEvent); // eslint-disable-line no-unused-vars
      expect(qsFTBTemplate.setStateInput).toHaveBeenCalled();
    });
  });

  describe('PostHideQuestion function', function() {
    it('should dispatch hide event', function() {
      plugin.postHideQuestion();
      expect(EkstepRendererAPI.dispatchEvent).toHaveBeenCalled();
    });
  });
  describe('evaluateQuestion function', function() {
    beforeEach(function() {
      var questionset = document.createElement('div');
      questionset.setAttribute("id", "questionset");
      $(document.body).append(questionset);
      var template = _.template(FTBController.template); // eslint-disable-line no-undef
      plugin._question.data = qsFTBTemplate.generateHTML(plugin._question.data);
      $("#questionset").html(template({ question: plugin._question }));
      $("#ans-field1").val("b");
      $("#ans-field2").val("d");
    })

    it('should dispatch evaluate event', function() {
      var resultState = {
        "val": [
          "b",
          "d"
        ]
      };
      plugin.evaluateQuestion(evaluateEvent);
      expect(plugin.saveQuestionState).toHaveBeenCalledWith(resultState);
    });
  });
});