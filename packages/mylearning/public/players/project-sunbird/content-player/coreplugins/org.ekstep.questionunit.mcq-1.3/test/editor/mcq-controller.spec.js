describe("MCQ Editor template controller", function() {
  var $controller, $scope, ctrl, $rootScope, telemetryService,data;

  beforeEach(module('mcqApp'));
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
  describe("MCQ Question Creation", function() {
    beforeEach(function() {
      $scope.mcqFormData = {
        "question": {
          "text": "Find A",
          "image": "",
          "audio": "",
          "hint": ""
        },
        "options": [
        {
          "text": "A",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": true,
          "$$hashKey": "object:716"
        },
        {
          "text": "B",
          "image": "",
          "audio": "",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:717"
        }
        ],
        "questionCount": 0,
        "media": []
      };
      data = {
        "plugin": {
          "id": "org.ekstep.questionunit.mcq",
          "version": "1.0",
          "templateId": "horizontalMCQ"
        },
        "data": {
          "question": {
            "text": "Find A",
            "image": "",
            "audio": "",
            "hint": ""
          },
          "options": [
          {
            "text": "A",
            "image": "",
            "audio": "",
            "hint": "",
            "isCorrect": true,
            "$$hashKey": "object:716"
          },
          {
            "text": "B",
            "image": "",
            "audio": "",
            "hint": "",
            "isCorrect": false,
            "$$hashKey": "object:717"
          }
          ],
          "media": []
        },
        "config": {
          "metadata": {
            "category": "MCQ",
            "title": "ydghfgg",
            "language": [
            "English"
            ],
            "qlevel": "EASY",
            "gradeLevel": [
            "Grade 1"
            ],
            "description": "jfvjhfj",
            "max_score": 1
          },
          "max_time": 0,
          "max_score": 1,
          "partial_scoring": false,
          "layout": "Horizontal",
          "isShuffleOption": false
        },
        "media": []
      };
      telemetryService = jasmine.createSpyObj("telemetry", ["interact"]);
      spyOn(ecEditor, "getService").and.callFake(function() {
        return telemetryService;
      });
      var audioData = {
        "asset": "do_1122260077950894081341",
        "assetMedia": {
          "name": "clap",
          "id": "do_1122260077950894081341",
          "src": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1122260077950894081341/artifact/audio_1492432568778_1492432592346.mp3",
          "type": "audio"
        }
      };
      $scope.audio = function(event, data) {
       if (data && data.callback) data.callback(audioData);
      };
      var imageData = {
       "asset": "do_21244188730232012811910",
       "assetMedia": {
         "id": "do_21244188730232012811910",
         "src": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/do_21244188730232012811910/artifact/113-600x337_1518785071391.jpg",
         "type": "image"
        }
      }
      $scope.image = function(event, data) {
       if (data && data.callback) data.callback(imageData);
      };
      $scope.mcqForm = {
        $valid: true
      };
      $scope.questionMedia={};
      ctrl = $controller('mcqQuestionFormController', {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });
    it("should set ctrl not to be undefined", function() {
      expect(ctrl).not.toBeUndefined();
    });
    it("should call init function", function() {
      $scope.init();
      expect(EventBus.hasEventListener("org.ekstep.questionunit.mcq:validateform")).toBeTruthy();
    });
    it("should dispatch mcq:validateform event", function() {
      var callbackFn = function() {};
      spyOn($scope, "editMcqQuestion")
      ecEditor.dispatchEvent("org.ekstep.questionunit.mcq:validateform", callbackFn);
      $scope.editMcqQuestion();
      expect($scope.editMcqQuestion).toHaveBeenCalled();
    });
    it("should call edit MCQ question", function() {
      $scope.editMcqQuestion(event, data);
    });
    it("checkform validation true function", function() {
      var validform = $scope.formValidation();
      expect(validform.isValid).toBe(false);
    });
    it("checkform validation false function", function() {
      $scope.mcqForm.$valid= false
      var validform = $scope.formValidation();
      expect(validform.isValid).toBe(false);
    });
    it("should add media in array",function(){
     $scope.questionMedia.image=["image"];
     $scope.questionMedia.audio=["audio"];
     $scope.formValidation();
   });
    it("should add hint",function(){
     var id = 'q';
     $scope.addHint(id);
     expect($scope.qHint).toBe(true);
     id=1;
     $scope.addHint(id);
     expect($scope.oHint[id]).toBe(true);
   });
    it("should delete hint",function(){
     var id = 'q';
     $scope.deleteHint(id);
     expect($scope.qHint).toBe(false);
     id=1;
     $scope.deleteHint(id);
     expect($scope.oHint[id]).toBe(false);
   });
    it("should delete image",function(){
     var id = 'q';
     $scope.deleteImage(id);
     expect($scope.mcqFormData.question.image).toBe('');
     id=1;
     $scope.deleteImage(id);
     expect($scope.mcqFormData.options[id].image).toBe('');
   });
    it("should delete audio",function(){
     var id = 'q';
     $scope.deleteAudio(id);
     expect($scope.mcqFormData.question.audio).toBe('');
     expect($scope.isPlayingQ).toBe(false);
     id=1;
     $scope.deleteAudio(id);
     expect($scope.mcqFormData.options[id].audio).toBe('');
   });
    it("Should add answer", function() {
      $scope.addAnswerField();
    });
    it("Should delete answer", function() {
      var id = 1;
      $scope.deleteAnswer(id);
    });
    it("Should addAudio", function(done) {
      var id = 'q';
      ecEditor.addEventListener('org.ekstep.assetbrowser:show', $scope.audio, $scope);
      $scope.addAudio(id);
      id=1;
      $scope.addAudio(id);
      setTimeout(function(){
        done();
       }, 1000);

    });
    it("Should addImage", function(done) {
      var id = 'q';
      ecEditor.addEventListener('org.ekstep.assetbrowser:show', $scope.image, $scope);
      $scope.addImage(id);
      id=1;
      $scope.addImage(id);
      setTimeout(function(){
        done();
       }, 1000);
    });
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
      $scope.mcqPluginInstance={
        id:"mcq",
        ver:1.0
      };
      $scope.generateTelemetry(data);
      expect(ecEditor.getService).toHaveBeenCalledWith('telemetry');
    });
    it("should call generate telemetry without data", function() {
      $scope.generateTelemetry();
      expect(ecEditor.getService).not.toHaveBeenCalledWith('telemetry');
    });
  });
});
//# sourceURL=mcq-controller.spec.js