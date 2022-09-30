describe("FTB Editor template controller", function() {
  var $controller, $scope, ctrl, $rootScope, telemetryService;
  beforeEach(module('ftbApp'));
  beforeEach(function(done) {
    setTimeout(function() {
      inject(function(_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $scope.closeThisDialog = function() {};
        $scope.$safeApply = function() {};
        done();
      });
    }, 2000);
  });
  describe("FTB Question Creation", function() {
    beforeEach(function() {
      if (!org.ekstep.pluginframework.pluginManager.pluginManifests["org.ekstep.keyboard"]) {
        org.ekstep.pluginframework.pluginManager.pluginManifests["org.ekstep.keyboard"] = {};
      }
      org.ekstep.pluginframework.pluginManager.pluginManifests["org.ekstep.keyboard"].m = JSON.parse('{"id":"org.ekstep.keyboard","ver":"1.0","author":"Jagadish","type":"plugin","title":"Keyboard","description":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/style.css"},{"type":"js","src":"editor/keyboard.js"}],"menu":[],"configManifest":[]},"renderer":{"main":"renderer/plugin.js","dependencies":[{"type":"js","src":"renderer/keyboard.js","scope":"renderer"},{"type":"css","src":"renderer/style/style.css","scope":"renderer"}]},"icon":"assets/icon.png","languages":["English"],"categories":[""],"keywords":[""]}')
      org.ekstep.pluginframework.pluginManager.pluginManifests["org.ekstep.questionunit.ftb"] = {};
      org.ekstep.pluginframework.pluginManager.pluginManifests["org.ekstep.questionunit.ftb"].m = JSON.parse('{"id":"org.ekstep.questionunit.ftb","ver":"1.0","author":"Jagadish","type":"plugin","title":"Keyboard","description":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/style.css"},{"type":"js","src":"editor/keyboard.js"}],"menu":[],"configManifest":[]},"renderer":{"main":"renderer/plugin.js","dependencies":[{"type":"js","src":"renderer/keyboard.js","scope":"renderer"},{"type":"css","src":"renderer/style/style.css","scope":"renderer"}]},"icon":"assets/icon.png","languages":["English"],"categories":[""],"keywords":[""]}')
      ctrl = $controller('ftbQuestionFormController', {
        $scope: $scope,
        $rootScope: $rootScope
      });
      spyOn($scope, "generateTelemetry").and.callThrough();
      telemetryService = jasmine.createSpyObj("telemetry", ["interact"]);
      spyOn(ecEditor, "getService").and.callFake(function() {
        return telemetryService;
      });
      spyOn(CKEDITOR, "replace").and.callThrough(); // eslint-disable-line no-undef
      $scope.ftbForm = {
        $invalid: true,
        $name: "ftbForm",
        $pending: undefined,
        $pristine: true,
        submitted: false,
        $valid: false,
        ftbQuestion: {
          $valid: false
        }
      };
      $scope.ftbFormData.question.text = "a [[b]] c [[d]]";
    });
    it("should set ctrl not to be undefined", function() {
      expect(ctrl).not.toBeUndefined();
    });
    it("should call init function", function() {
      spyOn($scope, "init");
      $scope.init();
      expect($scope.init).toHaveBeenCalled();
    });
    it("should check isvalidateform event", function() {
      $scope.init();
      expect(EventBus.hasEventListener("org.ekstep.questionunit.ftb:validateform")).toBeTruthy();
    })
    describe("should call editFtbQuestion", function() {
      it("should check editquestion listner", function() {
        $scope.init();
        expect(EventBus.hasEventListener("org.ekstep.questionunit.ftb:editquestion")).toBeTruthy();
      });
      it("should dispatch ftb:validateform event", function() {
        var callbackFn = function() {};
        spyOn($scope, "editFtbQuestion")
        ecEditor.dispatchEvent("org.ekstep.questionunit.ftb:validateform", callbackFn);
        $scope.editFtbQuestion();
        expect($scope.editFtbQuestion).toHaveBeenCalled();
      });
      it("should call editftb question", function() {
        var data = {
          "plugin": {
            "id": "org.ekstep.questionunit.ftb",
            "version": "1.0",
            "templateId": "ftbtemplate"
          },
          "data": {
            "question": {
              "text": "testing english [[test1]] and [[1]]",
              "image": "",
              "audio": "",
              "keyboardConfig": {
                "keyboardType": "English",
                "customKeys": []
              }
            },
            "answer": ["test1", "1"],
            "parsedQuestion": {
              "text": "testing english <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly=\"readonly\"> and <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly=\"readonly\">",
              "image": "",
              "audio": ""
            }
          },
          "config": {
            "metadata": {
              "category": "FTB",
              "title": "testing english ____ and ____",
              "language": ["English"],
              "qlevel": "EASY",
              "gradeLevel": ["Kindergarten"],
              "concepts": [{
                "identifier": "BIO3",
                "name": "Human_Welfare"
              }],
              "description": "sdf",
              "max_score": 1
            },
            "max_time": 0,
            "max_score": 1,
            "partial_scoring": true,
            "layout": "Horizontal",
            "isShuffleOption": false
          }
        };
        $scope.editFtbQuestion(event, data);
      })
      it("should set ctrl not to be undefined", function() {
        $scope.createAnswerArray();
        var matches = $scope.splitAnswer("a [[b]] c [[d]]", /(?:^|)\[\[(.*?)(?:\]\]|$)/g, 1);
        expect(matches).not.toBeUndefined();
      });
      it("checkform validation true function", function() {
        $scope.formValidation();
        expect($scope.formVaild).toBe(false);
      })
      it("checkform validation false function", function() {
        $scope.ftbFormData.question.text = "";
        $scope.formValidation();
        expect($scope.formVaild).toBe(false);
      })
      it("should generate telemetry with data", function() {
        var data = {
          "type": "TOUCH",
          "id": "input",
          "target": {
            "id": "questionunit-ftb-question",
            "ver": "",
            "type": "input"
          }
        };
        $scope.ftbPluginInstance={
          id:"ftb",
          ver:1.0
        }
        $scope.generateTelemetry(data);
        expect(ecEditor.getService).toHaveBeenCalledWith('telemetry');
      })
      it("should call generate telemetry without data", function() {
        $scope.generateTelemetry();
        expect(ecEditor.getService).not.toHaveBeenCalledWith('telemetry');
      });
    });
  });
});
//# sourceURL=ftb-controller.spec.js