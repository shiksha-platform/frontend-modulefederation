/*
 * Plugin to create sequencial order question
 * @class org.ekstep.questionunitsequence:seqQuestionFormController
 * Sivashanmugam Kannan<sivashanmugam.kannan@funtoot.com>
 */
angular.module('seqApp', ['org.ekstep.question']).controller('seqQuestionFormController', ['$scope', '$rootScope', 'questionServices', function ($scope, $rootScope, questionServices) {
  var generalDataObj = {
    'text': '',
    'image': '',
    'audio': '',
    'audioName': '',
    'hint': ''
  }
  $scope.seqFormData = {
    'question': {},
    'options': []
  };
  $scope.seqFormData.question = angular.copy(generalDataObj);
  $scope.questionMedia = {};
  $scope.optionsMedia = {
    'image': [],
    'audio': []
  };
  $scope.seqFormData.media = [];
  $scope.editMedia = [];

  var questionInput = CKEDITOR.replace('seqQuestion', {// eslint-disable-line no-undef
    customConfig: ecEditor.resolvePluginResource('org.ekstep.questionunit', '1.0', "editor/ckeditor-config.js"),
    skin: 'moono-lisa,' + CKEDITOR.basePath + "skins/moono-lisa/",// eslint-disable-line no-undef
    contentsCss: CKEDITOR.basePath + "contents.css"// eslint-disable-line no-undef
  });
  questionInput.on('change', function () {
    $scope.seqFormData.question.text = this.getData();
  });
  questionInput.on('focus', function () {
    $scope.generateTelemetry({ type: 'TOUCH', id: 'input', target: { id: 'questionunit-sequence-question-on-focus', ver: '', type: 'input' } })
  });
  angular.element('.innerScroll').on('scroll', function () {
    $scope.generateTelemetry({
      type: 'SCROLL', id: 'form', target: { id: 'questionunit-sequence-form-scroll', ver: '', type: 'form' }
    })
  });
  $scope.init = function () {
    /**
     * editor:questionunit.sequence:call form validation.
     * @event org.ekstep.questionunit.sequence:validateform
     * @memberof org.ekstep.questionunit.sequence.seq-controller
     */
    $scope.seqPluginInstance = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.questionunit.sequence");
    EventBus.listeners['org.ekstep.questionunit.sequence:validateform'] = [];
    ecEditor.addEventListener('org.ekstep.questionunit.sequence:validateform', function (event, callback) {
      var validationRes = $scope.formValidation();
      callback(validationRes.isValid, validationRes.formData);
    }, $scope);
    
    //adds two options
    $scope.addOption();
    $scope.addOption();
    /**
     * editor:questionunit.sequence:call form edit the question.
     * @event org.ekstep.questionunit.sequence:editquestion
     * @memberof org.ekstep.questionunit.sequence.seq-controller
     */
    EventBus.listeners['org.ekstep.questionunit.sequence:editquestion'] = [];
    ecEditor.addEventListener('org.ekstep.questionunit.sequence:editquestion', $scope.editSEQQuestion, $scope);
    ecEditor.dispatchEvent("org.ekstep.questionunit:ready");
  }
  /**
   * for edit flow
   * @memberof org.ekstep.questionunit.sequence
   * @param {event} event data.
   * @param {question} data data.
   */
  $scope.editSEQQuestion = function (event, data) {
    var qdata = data.data;
    $scope.seqFormData.question = qdata.question;
    $scope.seqFormData.options = qdata.options;
    $scope.editMedia = qdata.media;
  }
  /**
   * add the pair in seq
   * @memberof org.ekstep.questionunit.sequence
   */
  $scope.addOption = function (index) {
    var telemetryObject = { type: 'TOUCH', id: 'button', target: { id: 'questionunit-sequence-add-sequence', ver: '', type: 'button' } };
    if ($scope.seqFormData.options.length < 4) {
      if (index) {
        $scope.seqFormData.options[index] = angular.copy(generalDataObj);
      } else {
        $scope.seqFormData.options.push(angular.copy(generalDataObj));
      }
    }
    $scope.generateTelemetry(telemetryObject);
  }
  /**
   * check form validation
   * @memberof org.ekstep.questionunit.sequence.seq-controller
   * @returns {Object} question data.
   */
  $scope.formValidation = function () {
    var formConfig = {},
      temp, tempArray = [],
      formValid;
    //check form valid and lhs should be more than 3
    formValid = $scope.seqForm.$valid && $scope.seqFormData.options.length > 1;
    if (!($scope.seqFormData.question.text.length || $scope.seqFormData.question.image.length || $scope.seqFormData.question.audio.length)) {
      $('.questionTextBox').addClass("ck-error");
    } else {
      $('.questionTextBox').removeClass("ck-error");
    }
    $scope.submitted = true;
    _.isEmpty($scope.questionMedia.image) ? 0 : tempArray.push($scope.questionMedia.image);
    _.isEmpty($scope.questionMedia.audio) ? 0 : tempArray.push($scope.questionMedia.audio);
    _.each($scope.optionsMedia.image, function (key) {
      tempArray.push(key);
    });
    _.each($scope.optionsMedia.audio, function (key) {
      tempArray.push(key);
    });
    temp = tempArray.filter(function (element) {
      return element !== undefined;
    });
    $scope.editMedia = _.union($scope.editMedia, temp);
    $scope.seqFormData.media = $scope.editMedia;
    formConfig.formData = $scope.seqFormData;
    if (formValid) {
      $scope.selLbl = 'success';
      formConfig.isValid = true;
    } else {
      $scope.selLbl = 'error';
      formConfig.isValid = false;
    }
    return formConfig;
  }
  /**
   * delete the pair in sequence
   * @memberof org.ekstep.questionunit.sequence.seq-controller
   * @param {Integer} id data.
   */
  $scope.deleteOption = function (id, $repeatScope) {
    var telemetryObject = { type: 'TOUCH', id: 'button', target: { id: 'questionunit-sequence-delete-sequence', ver: '', type: 'button' } };
    if($scope.seqFormData.options.length > 2 ){
      $scope.seqFormData.options.splice(id, 1);
    }else{
      $scope.seqFormData.options[id].$error.required = true;
      $timeout(function() {
        $scope.seqFormData.options[id].$error.required = false;
     }, 1000);
    }
    $scope.generateTelemetry(deleteOption);
  }

  /**
   * invokes the asset browser to pick an image to add to either the question or the options
   * @param {string} type if `q` for Question, `LHS` for LHS option, `RHS` for RHS option 
   * @param {string} index if `type` is not `q`, then it denotes the index of either 'LHS' or 'RHS' option
   * @param {string} mediaType `image` or `audio`
   */
  $scope.addMedia = function (type, index, mediaType) {
    var telemetryObject = { type: 'TOUCH', id: 'button', target: { id: 'questionunit-sequence-add-' + mediaType, ver: '', type: 'button' } };
    var mediaObject = {
      type: mediaType,
      search_filter: {} // All composite keys except mediaType
    }
    //Defining the callback function of mediaObject before invoking asset browser
    mediaObject.callback = function (data) {
      var media = {
        "id": Math.floor(Math.random() * 1000000000), // Unique identifier
        "src": org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src), // Media URL
        "assetId": data.assetMedia.id, // Asset identifier
        "type": data.assetMedia.type, // Type of asset (image, audio, etc)
        "preload": false // true or false
      };

      if (type == 'q') {
        telemetryObject.target.id = 'questionunit-sequence-question-add-' + data.assetMedia.type;
        $scope.seqFormData.question[data.assetMedia.type] = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src);
        data.assetMedia.type == 'audio' ? $scope.seqFormData.question.audioName = data.assetMedia.name : '';
        $scope.questionMedia[data.assetMedia.type] = media;
      } else {
        telemetryObject.target.id = 'questionunit-sequence-option-add-' + data.assetMedia.type;
        $scope.seqFormData.options[index][data.assetMedia.type] = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src);
        data.assetMedia.type == 'audio' ? $scope.seqFormData.options[index].audioName = data.assetMedia.name : '';
        $scope.optionsMedia[data.assetMedia.type][index] = media;
      }
      if (!$scope.$$phase) {
        $scope.$digest()
      }
      $scope.generateTelemetry(telemetryObject)
    }
    questionServices.invokeAssetBrowser(mediaObject);
  }

  /**
   * Deletes the selected media from the question element (question, options)
   * @param {string} type 
   * @param {Integer} index 
   * @param {string} mediaType 
   */
  $scope.deleteMedia = function (type, index, mediaType) {
    var telemetryObject = { type: 'TOUCH', id: 'button', target: { id: 'questionunit-sequence-delete-' + mediaType, ver: '', type: 'button' } };
    if (type == 'q') {
      telemetryObject.target.id = 'questionunit-sequence-delete' + mediaType;
      $scope.seqFormData.question[mediaType] = '';
      delete $scope.questionMedia[mediaType];
    } else {
      telemetryObject.target.id = 'questionunit-sequence-option-delete-' + mediaType;
      $scope.seqFormData.options[index][mediaType] = '';
      delete $scope.optionsMedia[mediaType][index];
    }
    $scope.generateTelemetry(telemetryObject)
  }

  /**
   * Callbacks object to be passed to the directive to manage selected media
   */
  $scope.callbacks = {
    deleteMedia: $scope.deleteMedia,
    addMedia: $scope.addMedia,
    qtype: 'sequence'
  }

  /**
   * Helper function to generate telemetry event
   * @param {Object} data telemetry data
   */
  $scope.generateTelemetry = function (data) {
    if (data) {
      data.plugin = data.plugin || {
        "id": $scope.seqPluginInstance.id,
        "ver": $scope.seqPluginInstance.ver
      }
      data.form = data.form || 'question-creation-sequence-form';
      questionServices.generateTelemetry(data);
    }
  }
}]);
//# sourceURL=questionunit.sequence.editor.controller.js