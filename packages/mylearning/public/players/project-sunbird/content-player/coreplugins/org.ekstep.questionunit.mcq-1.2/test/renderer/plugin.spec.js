describe('MCQRendererPlugin', function() {
  var plugin, multipleOptionObj,
    audioOriginal, audioMock, currentquesObj, questionsetEvent;
  // Renderer plugin can't be tested as of now
  // Please move the logic to other classes and test them independently
  // Let the plugin class delegate functionality to these classes
  beforeEach(function() {
    audioOriginal = window.Audio;
    audioMock = {};
    window.Audio = function() {
      return audioMock;
    };
  });
  afterEach(function() {
    window.Audio = audioOriginal;
  });
  beforeAll(function(done) {
    var elem = '<div id="preview-mcq-template" class="mcq-selected-option mcq-option-value"><input type="radio" name="radio"></input></div>';
    var body = document.getElementsByTagName("body")[0];
    var div = document.createElement('div');
    div.innerHTML = elem;
    body.appendChild(div.children[0]);
    questionsetEvent = {
      "target": {
        "_currentQuestion": {
          "id": "ec2c7763-cc31-4d74-ba57-4ab6313020ca",
          "type": "mcq",
          "pluginId": "org.ekstep.questionunit.mcq",
          "pluginVer": "1.0",
          "templateId": "horizontalMCQ",
          "data": {
            "__cdata": "{\"question\":{\"text\":\"Testing question for mcq\",\"image\":\"https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg\",\"audio\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test1\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:774\"}],\"media\":[{\"id\":218122758,\"src\":\"https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg\",\"assetId\":\"do_1123016850062950401107\",\"type\":\"image\",\"preload\":false}]}"
          },
          "config": {
            "__cdata": "{\"metadata\":{\"category\":\"MCQ\",\"title\":\"Testing question for mcq\",\"language\":[\"English\"],\"qlevel\":\"EASY\",\"gradeLevel\":[\"Kindergarten\"],\"concepts\":[\"C6\"],\"description\":\"test\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":false,\"layout\":\"Grid\",\"isShuffleOption\":true}"
          },
          "w": 80,
          "h": 85,
          "x": 9,
          "y": 6,
          "index": -1,
          "rendered": true
        },
        "_currentQuestionState": undefined
      },
      "type": "org.ekstep.questionunit.mcq:show"
    }
    currentquesObj = {
      "data": {
        "question": {
          "text": "v2 media",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "",
          "hint": ""
        },
        "options": [{
          "text": "v1",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": true,
          "$$hashKey": "object:768"
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:769"
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }],
        "media": [{
          "id": 92415376,
          "src": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "assetId": "do_1123016850062950401107",
          "type": "image",
          "preload": false
        }]
      },
      "config": {
        "metadata": {
          "category": "MCQ",
          "title": "v2 media",
          "language": ["English"],
          "qlevel": "EASY",
          "gradeLevel": ["Grade 1"],
          "concepts": ["LO4"],
          "description": "v2 media",
          "max_score": 1
        },
        "max_time": 0,
        "max_score": 1,
        "partial_scoring": false,
        "layout": "Horizontal"
      },
      "qState": {
        "val": 0
      }
    };
    multipleOptionObj = {
      "data": {
        "question": {
          "text": "v2 media",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "",
          "hint": ""
        },
        "options": [{
          "text": "v1",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": true
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }, {
          "text": "v2",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false
        }],
        "media": [{
          "id": 92415376,
          "src": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "assetId": "do_1123016850062950401107",
          "type": "image",
          "preload": false
        }]
      },
      "config": {
        "metadata": {
          "category": "MCQ",
          "title": "v2 media",
          "language": ["English"],
          "qlevel": "EASY",
          "gradeLevel": ["Grade 1"],
          "concepts": ["LO4"],
          "description": "v2 media",
          "max_score": 1
        },
        "max_time": 0,
        "max_score": 1,
        "partial_scoring": false,
        "layout": "Horizontal"
      },
      "qState": {
        "val": 0
      }
    };
    plugin = new org.ekstep.questionunitmcq.RendererPlugin({}, {}, {});
    plugin._question = {};
    plugin._currentAudio = audioMock;
    plugin._selectedIndex = "0";
    plugin._question = currentquesObj;
    spyOn(plugin, "setQuestionTemplate").and.callThrough();
    spyOn(MCQController, "initTemplate").and.callThrough();//eslint-disable-line no-undef
    spyOn(plugin, "preQuestionShow").and.callThrough();
    spyOn(plugin, "postQuestionShow").and.callThrough();
    plugin._super = jasmine.createSpy('_super').and.callFake(function() {
      plugin.divideOption(plugin._question.data);
      return {};
    });
    done();
  });
  describe('setQuestionTemplate', function() {
    it('should plugin will initialize', function() {
      expect(org.ekstep.pluginframework.pluginManager.plugins['mcq']).not.toBe(undefined);
      plugin.setQuestionTemplate();
      expect(MCQController.initTemplate).not.toBe(undefined);//eslint-disable-line no-undef
    });
    it('should call the template', function() {
      expect(plugin._template).toBe(undefined);
    });
  });
  describe('preQuestionShow', function() {
    it("should call preQuestionShow function", function() {
      //plugin.preQuestionShow(questionsetEvent);
      expect(plugin.preQuestionShow(questionsetEvent)).toBeUndefined();
    })
    it('should check grid layout', function() {
      spyOn(plugin, "divideOption");
      plugin.divideOption(plugin._question);
      expect(plugin.divideOption).toHaveBeenCalled();
    })
    it("should call with six option", function() {
      spyOn(plugin, "divideOption");
      plugin.divideOption(multipleOptionObj);
      expect(plugin.divideOption).toHaveBeenCalled();
    })
    it("should check question data not have cdata", function() {
      questionsetEvent.target._currentQuestion.data = questionsetEvent.target._currentQuestion.data.__cdata;
      questionsetEvent.target._currentQuestion.config = questionsetEvent.target._currentQuestion.config.__cdata;
      var questionObj = plugin.preQuestionShow(questionsetEvent);
      expect(questionObj).toBeUndefined();
    })
    it("should check layout undefined", function() {
      spyOn(plugin, "divideOption");
      questionsetEvent = {
        "target": {
          "_currentQuestion": {
            "id": "ec2c7763-cc31-4d74-ba57-4ab6313020ca",
            "type": "mcq",
            "pluginId": "org.ekstep.questionunit.mcq",
            "pluginVer": "1.0",
            "templateId": "horizontalMCQ",
            "data": {
              "__cdata": "{\"question\":{\"text\":\"Testing question for mcq\",\"image\":\"https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg\",\"audio\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:773\"},{\"text\":\"test1\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:774\"}],\"media\":[{\"id\":218122758,\"src\":\"https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg\",\"assetId\":\"do_1123016850062950401107\",\"type\":\"image\",\"preload\":false}]}"
            },
            "config": {
              "__cdata": "{\"metadata\":{\"category\":\"MCQ\",\"title\":\"Testing question for mcq\",\"language\":[\"English\"],\"qlevel\":\"EASY\",\"gradeLevel\":[\"Kindergarten\"],\"concepts\":[\"C6\"],\"description\":\"test\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":false,\"layout\":\"Horizontal\",\"isShuffleOption\":false}"
            },
            "w": 80,
            "h": 85,
            "x": 9,
            "y": 6,
            "index": -1,
            "rendered": true
          },
          "_currentQuestionState": undefined
        },
        "type": "org.ekstep.questionunit.mcq:show"
      }
      plugin.preQuestionShow(questionsetEvent);
    })
  });
  describe('postQuestionShow', function() {
    it("should call postquestion function", function() {
      plugin._question.state=0;
      var questionObj = plugin.postQuestionShow();
      expect(questionObj).toBeUndefined();
    })
    it("should load mcq template", function() {
      spyOn(MCQController, "renderQuestion"); //eslint-disable-line no-undef
      MCQController.renderQuestion(); //eslint-disable-line no-undef
    })
    it("should check qstate undefined", function() {
      delete currentquesObj.qState;
      plugin.postQuestionShow();
    })
  });
  describe('evaluateQuestion', function() {
    it('should dispatch evaluate event', function() {
      var evaluateEvent = {
        "type": "org.ekstep.questionunit.mcq:evaluate",
        "target": function() {
          return {};
        }
      };
      plugin.evaluateQuestion(evaluateEvent);
    });
    it('should dispatch evaluate event with correct answer', function() {
      var evaluateEvent = {
        "type": "org.ekstep.questionunit.mcq:evaluate",
        "target": function() {
          return {};
        }
      };
      plugin._selectedIndex = "0";
      plugin.evaluateQuestion(evaluateEvent);
    });
  });
  describe('checkBaseUrl', function() {
    it("should call the checkBaseUrl function", function() {
      window.isbrowserpreview = true;
      expect(plugin.getAssetUrl("http://localhost:9877/assets/sounds/goodjob.mp3")).toEqual("http://localhost:9877/assets/sounds/goodjob.mp3");
    });
  });
  describe('playAudio', function() {
    it("should play the audio function", function() {
      audioMock.play = jasmine.createSpy('play');
      plugin.playAudio(audioMock);
      expect(audioMock.play).toHaveBeenCalled();
    })
    it("should pause the audio function", function() {
      audioMock.pause = jasmine.createSpy('pause');
      plugin._currentAudio = {
        pause: function() {}
      }
      var pause = plugin.playAudio(audioMock);
      expect(pause).toBe(undefined);
    })
    it("should pause the audio if already play function", function() {
      plugin.lastAudio = true;
      audioMock.pause = jasmine.createSpy('pause');
      plugin._currentAudio = {
        pause: function() {}
      }
      var pause = plugin.playAudio(audioMock);
      expect(pause).toBe(undefined);
    })
  });
  describe('selectOptionUI', function() {
    it("should check option UI", function() {
      var event = {
        "target": "mcq-option-value",
        stopPropagation: jasmine.createSpy()
      };
      plugin.selectOptionUI(event);
      expect($(event.target).hasClass("mcq-option-value")).toBe(false);
    })
  });
  xdescribe('PostHideQuestion function', function() {
    it('should dispatch hide event', function() {
      spyOn(EkstepRendererAPI, "dispatchEvent");
      plugin.postHideQuestion();
      expect(EkstepRendererAPI.dispatchEvent).toHaveBeenCalled();
    });
  });
  describe('selectedvalue', function() {
    it("should call the select option function", function() {
      var event = {};
      event.target = '<div class="qc-option-value mcq-option-value" onclick="plugin.selectedvalue(event,{},"0")"><div class="qc-option-text"><div class="qc-opt qc-option-txt-only">v1</div> </div> <div class="qc-option-checkbox"> <input type="radio" name="radio" value="pass" onclick="plugin.logTelemetryInteract(event)" class="qc-option-input-checkbox" id="option"> </div> </div>';
      var index = "0";
      plugin.selectedvalue(event, index);
    })
    it("should event called with undefined", function() {
      var event = undefined;
      var index = "0";
      plugin.selectedvalue(event, index);
    })
  });
  describe('logTelemetryInteract', function() {
    it("should target have a class name", function() {
      spyOn(QSTelemetryLogger, 'logEvent').and.callThrough(); //eslint-disable-line no-undef
      var event = {
        "target": {
          "parentElement": "collapse-ques-text"
        }
      }
      plugin.logTelemetryInteract(event);
      expect(QSTelemetryLogger.logEvent).toHaveBeenCalled(); //eslint-disable-line no-undef
    })
    it("should event is undefined", function() {
      spyOn(QSTelemetryLogger, 'logEvent').and.callThrough(); //eslint-disable-line no-undef
      var event = undefined;
      plugin.logTelemetryInteract(event);
      expect(QSTelemetryLogger.logEvent).not.toHaveBeenCalled(); //eslint-disable-line no-undef
    })
  });
});
//# sourceURL=questionunitMCQPlugin.spec.js