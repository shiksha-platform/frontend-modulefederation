describe("MTF Editor template controller", function() {
  var $controller, $scope, ctrl, $rootScope, telemetryService;
  beforeEach(module('mtfApp'));
  beforeEach(function(done) {
    inject(function(_$rootScope_, _$controller_) {
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      $scope.closeThisDialog = function() {};
      $scope.$safeApply = function() {};
      done();
    });
  });
  describe("FTB Question Creation", function() {
    beforeEach(function() {
      var dataimage = {
        "asset": "do_21244188730232012811910",
        "assetMedia": {
          "id": "do_21244188730232012811910",
          "src": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/do_21244188730232012811910/artifact/113-600x337_1518785071391.jpg",
          "type": "image"
        }
      }
      $scope.fn = function(event, data) {
        if (data && data.callback) data.callback(dataimage);
      };
      $scope.mtfFormData = {
        "question": {
          "text": "<p>What do you despise in life?&nbsp;</p>\n",
          "image": "",
          "audio": "",
          "hint": ""
        },
        "option": {
          "optionsLHS": [{
            "text": "Life",
            "image": "",
            "audio": "",
            "hint": "",
            "index": 1,
            "$$hashKey": "object:1308"
          }, {
            "text": "What is life",
            "image": "",
            "audio": "",
            "hint": "",
            "index": 2,
            "$$hashKey": "object:1309"
          }, {
            "text": "fellow humans",
            "image": "",
            "audio": "",
            "hint": "",
            "index": 4,
            "$$hashKey": "object:1328"
          }],
          "optionsRHS": [{
            "text": "life of pi",
            "image": "",
            "audio": "",
            "hint": "",
            "mapIndex": 1
          }, {
            "text": "What is despise",
            "image": "",
            "audio": "",
            "hint": "",
            "mapIndex": 2
          }, {
            "text": "rules",
            "image": "",
            "audio": "",
            "hint": "",
            "mapIndex": 4
          }],
          "questionCount": 0
        },
        "media": []
      };
      telemetryService = jasmine.createSpyObj("telemetry", ["interact"]);
      spyOn(ecEditor, "getService").and.callFake(function() {
        return telemetryService;
      });
      $scope.mtfForm = {
        $valid: true
      }
      $scope.questionMedia = {};
      ctrl = $controller('mtfQuestionFormController', {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });
    it("should set ctrl not to be undefined", function() {
      expect(ctrl).not.toBeUndefined();
    });
    it("should call init function", function() {
      $scope.init();
      expect(EventBus.hasEventListener("org.ekstep.questionunit.mtf:validateform")).toBeTruthy();
    });
    it("should dispatch ftb:validateform event", function() {
      var callbackFn = function() {};
      spyOn($scope, "editMtfQuestion")
      ecEditor.dispatchEvent("org.ekstep.questionunit.mtf:validateform", callbackFn);
      $scope.editMtfQuestion();
      expect($scope.editMtfQuestion).toHaveBeenCalled();
    })
    it("should call editmtf question", function() {
      var data = {
        "data": {
          "question": {
            "text": "<p>What do you despise in life?&nbsp;</p>\n",
            "image": "",
            "audio": "",
            "hint": ""
          },
          "option": {
            "optionsLHS": [{
              "text": "Life",
              "image": "",
              "audio": "",
              "hint": "",
              "index": 1,
              "$$hashKey": "object:1308"
            }, {
              "text": "What is life",
              "image": "",
              "audio": "",
              "hint": "",
              "index": 2,
              "$$hashKey": "object:1309"
            }, {
              "text": "fellow humans",
              "image": "",
              "audio": "",
              "hint": "",
              "index": 4,
              "$$hashKey": "object:1328"
            }],
            "optionsRHS": [{
              "text": "life of pi",
              "image": "",
              "audio": "",
              "hint": "",
              "mapIndex": 1
            }, {
              "text": "What is despise",
              "image": "",
              "audio": "",
              "hint": "",
              "mapIndex": 2
            }, {
              "text": "rules",
              "image": "",
              "audio": "",
              "hint": "",
              "mapIndex": 4
            }],
            "questionCount": 0
          },
          "media": [],
          "questionCount": 1
        }
      };
      $scope.editMtfQuestion(event, data);
    });
    it("checkform validation true function", function() {
      var validform = $scope.formValidation();
      expect(validform.isValid).toBe(true);
    })
    it("checkform validation false function", function() {
      $scope.mtfForm.$valid = false
      var validform = $scope.formValidation();
      expect(validform.isValid).toBe(false);
    })
    it("should add media in array", function() {
      $scope.questionMedia.image = ["image"];
      $scope.questionMedia.audio = ["audio"];
      $scope.formValidation();
    })
    describe("deletePair function called", function() {
      it("should call delete pair function ", function() {
        $scope.deletePair(1)
        expect($scope.mtfFormData.option.optionsLHS.length).toBe(2);
      })
    });
    describe("deleteImage function called", function() {
      it("should call delete question Image", function() {
        $scope.deleteImage('', 'q');
        expect($scope.mtfFormData.question.image).toBe('');
      })
      it("should call delete option Image", function() {
        $scope.deleteImage('1', 'LHS');
        expect($scope.mtfFormData.option.optionsLHS[1].image).toBe('');
      })
      it("should call delete option Image", function() {
        $scope.deleteImage('1', 'RHS');
        expect($scope.mtfFormData.option.optionsRHS[1].image).toBe('');
      })
    });
    describe("deleteAudio  function called", function() {
      it("should call delete question Image", function() {
        $scope.deleteAudio('q', '');
        expect($scope.mtfFormData.question.audio).toBe('');
      })
      it("should call delete option Image", function() {
        $scope.deleteAudio('1', 'LHS');
        expect($scope.mtfFormData.option.optionsLHS[1].audio).toBe('');
      })
      it("should call delete option Image", function() {
        $scope.deleteAudio('1', 'RHS');
        expect($scope.mtfFormData.option.optionsRHS[1].audio).toBe('');
      })
    });
    describe("Add Audio  function called", function() {
      it("should call add audio function", function(done) {
        ecEditor.addEventListener('org.ekstep.assetbrowser:show', $scope.fn, $scope);
        $scope.addAudio('1', 'LHS');
        expect($scope.mtfFormData.option.optionsLHS[1].audio).not.toBeNull();
        $scope.addImage('1', 'LHS');
        expect($scope.mtfFormData.option.optionsLHS[1].image).not.toBeNull();
        $scope.addAudio('2', 'RHS');
        expect($scope.mtfFormData.option.optionsRHS[2].audio).not.toBeNull();
        $scope.addImage('2', 'RHS');
        expect($scope.mtfFormData.option.optionsRHS[2].image).not.toBeNull();
        $scope.addAudio('', 'q');
        expect($scope.mtfFormData.question.audio).not.toBeNull();
        $scope.addImage('', 'q');
        expect($scope.mtfFormData.question.image).not.toBeNull();
        setTimeout(function() {
          done();
        }, 1000);
      });
    });
    describe("AddPair function called", function() {
      it("should call add pair function with adding 4 option", function() {
        $scope.indexPair = 4;
        $scope.addPair();
        expect($scope.mtfFormData.option.optionsLHS.length).toBe(4);
      })
    });
    describe("generateTelemetry", function() {
      it("should generate telemetry with data", function() {
        var data = {
          "type": "TOUCH",
          "id": "input",
          "target": {
            "id": "questionunit-mtf-question",
            "ver": "",
            "type": "input"
          }
        };
        $scope.mtfPluginInstance = {
          id: "mtf",
          ver: 1.0
        }
        $scope.generateTelemetry(data);
        expect(ecEditor.getService).toHaveBeenCalledWith('telemetry');
      })
      it("should call generate telemetry without data", function() {
        $scope.generateTelemetry();
        expect(ecEditor.getService).not.toHaveBeenCalledWith('telemetry');
      });
    })
  });
});
//# sourceURL=mtf-controller.spec.js