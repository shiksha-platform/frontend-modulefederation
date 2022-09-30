/*
 * Plugin to create MTF question
 * @class org.ekstep.questionunitmcq:mtfQuestionFormController
 * Sachin<sachin.kumar@goodworklabs.com>
 */
angular.module('orgEkstepQuestion').controller('mtfQuestionFormController', ['$scope', '$rootScope', 'questionServices', function ($scope, $rootScope, questionServices) {
  $scope.mtfConfiguartion = {
    'questionConfig': {
      'isText': true,
      'isImage': true,
      'isAudio': true,
      'isHint': false
    },
    'optionsConfig': [{
      'isText': true,
      'isImage': true,
      'isAudio': true,
      'isHint': false
    }, {
      'isText': true,
      'isImage': true,
      'isAudio': true,
      'isHint': false
    }]
  };
  $scope.mtfFormData = {
    'question': {
      'text': '',
      'image': '',
      'audio': '',
      'audioName': '',
      'hint': ''
    },
    'option': {
      'optionsLHS': [{
        'text': '',
        'image': '',
        'audio': '',
        'audioName': '',
        'hint': '',
        'index': 1
      }, {
        'text': '',
        'image': '',
        'audio': '',
        'audioName': '',
        'hint': '',
        'index': 2
      }, {
        'text': '',
        'image': '',
        'audio': '',
        'audioName': '',
        'hint': '',
        'index': 3
      }],
      'optionsRHS': [{
        'text': '',
        'image': '',
        'audio': '',
        'audioName': '',
        'hint': '',
        'mapIndex': 1
      }, {
        'text': '',
        'image': '',
        'audio': '',
        'audioName': '',
        'hint': '',
        'mapIndex': 2
      }, {
        'text': '',
        'image': '',
        'audio': '',
        'audioName': '',
        'hint': '',
        'mapIndex': 3
      }],
      'questionCount': 0
    }
  };
  $scope.questionMedia = {};
  $scope.optionsMedia = {
    'image': [],
    'audio': []
  };

  $scope.lhsMedia = {
    'image': [],
    'audio': []
  }

  $scope.rhsMedia = {
    'image': [],
    'audio': []
  }
  $scope.ckConfig = { // eslint-disable-line no-undef
    customConfig: ecEditor.resolvePluginResource('org.ekstep.questionunit', '1.0', "editor/ckeditor-config.js"),
    skin: 'moono-lisa,' + CKEDITOR.basePath + "skins/moono-lisa/", // eslint-disable-line no-undef
    contentsCss: CKEDITOR.basePath + "contents.css" // eslint-disable-line no-undef
  };
  $scope.mtfFormData.media = [];
  $scope.editMedia = [];
  var questionInput = CKEDITOR.replace('mtfQuestion', $scope.ckConfig);
  questionInput.on('change', function () {
    $scope.mtfFormData.question.text = this.getData();
  });
  questionInput.on('focus', function () {
    $scope.generateTelemetry({
      type: 'TOUCH',
      id: 'input',
      target: {
        id: 'questionunit-mtf-question',
        ver: '',
        type: 'input'
      }
    })
  });
  angular.element('.innerScroll').on('scroll', function () {
    $scope.generateTelemetry({
      type: 'SCROLL',
      id: 'form',
      target: {
        id: 'questionunit-mtf-form',
        ver: '',
        type: 'form'
      }
    })
  });
  $scope.init = function () {
    /**
     * editor:questionunit.mtf:call form validation.
     * @event org.ekstep.questionunit.mtf:validateform
     * @memberof org.ekstep.questionunit.mtf.horizontal_controller
     */
    $scope.mtfPluginInstance = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.questionunit.mtf");
    EventBus.listeners['org.ekstep.questionunit.mtf:validateform'] = [];
    ecEditor.addEventListener('org.ekstep.questionunit.mtf:validateform', function (event, callback) {
      var validationRes = $scope.formValidation();
      callback(validationRes.isValid, validationRes.formData);
    }, $scope);
    /**
     * editor:questionunit.ftb:call form edit the question.
     * @event org.ekstep.questionunit.ftb:editquestion
     * @memberof org.ekstep.questionunit.ftb.horizontal_controller
     */
    EventBus.listeners['org.ekstep.questionunit.mtf:editquestion'] = [];
    ecEditor.addEventListener('org.ekstep.questionunit.mtf:editquestion', $scope.editMtfQuestion, $scope);
    ecEditor.dispatchEvent("org.ekstep.questionunit:ready");
    $scope.BindCkeditor();
  }
  /**
   * for edit flow
   * @memberof org.ekstep.questionunit.mtf.horizontal_controller
   * @param {event} event data.
   * @param {question} data data.
   */
  $scope.editMtfQuestion = function (event, data) {
    var qdata = data.data;
    $scope.mtfFormData.question = qdata.question;
    $scope.mtfFormData.option = qdata.option;
    $scope.editMedia = qdata.media;
  }
  /**
   * add the pair in mtf
   * @memberof org.ekstep.questionunit.mtf.horizontal_controller
   */
  $scope.addPair = function () {
    var optionLHS = {
      'text': '',
      'image': '',
      'audio': '',
      'audioName': '',
      'hint': '',
      'index': $scope.mtfFormData.option.optionsLHS.length + 1
    };
    var optionRHS = {
      'text': '',
      'image': '',
      'audio': '',
      'audioName': '',
      'hint': '',
      'mapIndex': $scope.mtfFormData.option.optionsRHS.length + 1
    };
    if ($scope.mtfFormData.option.optionsLHS.length < 5) {
      $scope.mtfFormData.option.optionsLHS.push(optionLHS);
      $scope.mtfFormData.option.optionsRHS.push(optionRHS);
    }
    $scope.BindCkeditor();
  }
  /**
   * check form validation
   * @memberof org.ekstep.questionunit.mtf.horizontal_controller
   * @returns {Object} question data.
   */
  $scope.formValidation = function () {
    var formConfig = {},
      temp, tempArray = [],
      formValid;

    //Add media to options Media
    $scope.optionsMedia['image'] = $scope.rhsMedia['image'].concat($scope.lhsMedia['image']);
    $scope.optionsMedia['audio'] = $scope.rhsMedia['audio'].concat($scope.lhsMedia['audio']);
    //check form valid and lhs should be more than 3
    formValid = $scope.mtfForm.$valid && $scope.mtfFormData.option.optionsLHS.length > 2;
    $scope.mtfFormData.question.text=_.isUndefined($scope.mtfFormData.question.text)?"":$scope.mtfFormData.question.text;
    if(!($scope.mtfFormData.question.text.length || $scope.mtfFormData.question.image.length || $scope.mtfFormData.question.audio.length)){
      $('.questionTextBox').addClass("ck-error");
    }else{
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
    $scope.mtfFormData.media = $scope.editMedia;
    formConfig.formData = $scope.mtfFormData;
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
   * delete the pair in mtf
   * @memberof org.ekstep.questionunit.mtf.horizontal_controller
   * @param {Integer} id data.
   */
  $scope.deletePair = function (id) {
    $scope.mtfFormData.option.optionsLHS.splice(id, 1);
    $scope.mtfFormData.option.optionsRHS.splice(id, 1);
    $scope.updatedMapIndex();
    $scope.BindCkeditor();
  }

  $scope.updatedMapIndex = function(){
    _.each($scope.mtfFormData.option.optionsLHS, function(lhs, id){
      lhs.index = id+1;
    })
    _.each($scope.mtfFormData.option.optionsRHS, function(rhs, id){
      rhs.mapIndex = id+1;
    })
  }

  /**
   * invokes the asset browser to pick an image to add to either the question or the options
   * @param {string} type if `q` for Question, `LHS` for LHS option, `RHS` for RHS option
   * @param {string} index if `type` is not `q`, then it denotes the index of either 'LHS' or 'RHS' option
   * @param {string} mediaType `image` or `audio`
   */
  $scope.addMedia = function (type, index, mediaType) {
    var mediaObject = {
      type: mediaType,
      search_filter: {} // All composite keys except mediaType
    }
    //Defining the callback function of mediaObject before invoking asset browser
    mediaObject.callback = function (data) {
      var telemetryObject = { type: 'TOUCH', id: 'button', target: { id: '', ver: '', type: 'button' } };
      var media = {
        "id": Math.floor(Math.random() * 1000000000), // Unique identifier
        "src": org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src), // Media URL
        "assetId": data.assetMedia.id, // Asset identifier
        "type": data.assetMedia.type, // Type of asset (image, audio, etc)
        "preload": false // true or false
      };

      if (type == 'q') {
        telemetryObject.target.id = 'questionunit-mtf-add-' + data.assetMedia.type;
        $scope.mtfFormData.question[data.assetMedia.type] = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src);
        $scope.mtfFormData.question.audioName = data.assetMedia.type == 'audio' ? data.assetMedia.name : '';
        $scope.questionMedia[data.assetMedia.type] = media;
      } else if (type == 'LHS') {
        telemetryObject.target.id = 'questionunit-mtf-lhs-add-' + data.assetMedia.type;
        $scope.mtfFormData.option.optionsLHS[index][data.assetMedia.type] = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src);
        $scope.mtfFormData.option.optionsLHS[index].audioName = data.assetMedia.type == 'audio' ? data.assetMedia.name : '';
        $scope.lhsMedia[data.assetMedia.type][index] = media;
      } else if (type == 'RHS') {
        telemetryObject.target.id = 'questionunit-mtf-rhs-add-' + data.assetMedia.type;
        $scope.mtfFormData.option.optionsRHS[index][data.assetMedia.type] = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(data.assetMedia.src);
        $scope.mtfFormData.option.optionsLHS[index].audioName = data.assetMedia.type == 'audio' ? data.assetMedia.name : '';
        $scope.rhsMedia[data.assetMedia.type][index] = media;
      }
      if(!$scope.$$phase) {
        $scope.$digest()
      }
      $scope.generateTelemetry(telemetryObject)
    }
    questionServices.invokeAssetBrowser(mediaObject);
  }

  /**
   * Deletes the selected media from the question element (question, LHS or RHS options)
   * @param {string} type
   * @param {Integer} index
   * @param {string} mediaType
   */
  $scope.deleteMedia = function (type, index, mediaType) {
    var telemetryObject = { type: 'TOUCH', id: 'button', target: { id: '', ver: '', type: 'button' } };
    if (type == 'q') {
      telemetryObject.target.id = 'questionunit-mtf-delete' + mediaType;
      $scope.mtfFormData.question[mediaType] = '';
      delete $scope.questionMedia[mediaType];
    } else if (type == 'LHS') {
      telemetryObject.target.id = 'questionunit-mtf-lhs-delete-' + mediaType;
      $scope.mtfFormData.option.optionsLHS[index][mediaType] = '';
      delete $scope.lhsMedia[data.assetMedia.type][index];
    } else if (type == 'RHS') {
      telemetryObject.target.id = 'questionunit-mtf-rhs-delete-' + mediaType;
      $scope.mtfFormData.option.optionsRHS[index][mediaType] = '';
      delete $scope.rhsMedia[data.assetMedia.type][index];
    }
    $scope.generateTelemetry(telemetryObject)
  }

  /**
   * Callbacks object to be passed to the directive to manage selected media
   */
  $scope.callbacks = {
    deleteMedia: $scope.deleteMedia,
    addMedia: $scope.addMedia,
    qtype: 'mtf'
  }

  /**
   * Helper function to generate telemetry event
   * @param {Object} data telemetry data
   */
  $scope.generateTelemetry = function (data) {
    if (data) {
      data.plugin = data.plugin || {
        "id": $scope.mtfPluginInstance.id,
        "ver": $scope.mtfPluginInstance.ver
      }
      data.form = data.form || 'question-creation-mtf-form';
      questionServices.generateTelemetry(data);
    }
  }

  $scope.ckEditorEventHandler = function (index) {
    index = index*2;
    // set input options for both LHS and RHS
    $scope.setEditorInputOptions(index);
    $scope.setEditorInputOptions(index+1);

  }

  $scope.setEditorInputOptions = function(index){
    var optionelement = $(".mtfoption-text-ck")[index];
    // if index value is even number then LHS else RHS
    var optionSide = (index%2 == 0)?'optionsLHS':'optionsRHS';
    $scope.ckConfig.title = "Set Answer";
    $scope.ckConfig.wordcount = {
      showParagraphs: false,
      showWordCount: false,
      showCharCount: true,
      maxCharCount: 25
    }

    var optionInput = CKEDITOR.inline(optionelement.id, $scope.ckConfig);
    //assign value to LHS or RHS input box based on index
    CKEDITOR.instances[optionelement.id].setData($scope.mtfFormData.option[optionSide][parseInt(index/2)].text);
    //if RHS adjust the position of ckeditor to left side
    if(optionSide == 'optionsRHS'){
      optionInput.on('focus', function () {
        var popUpWidth = parseInt($($('.cke_float')[index]).css("width"));
        var inputWidth = parseInt($($('.mtfoption-text-ck')[index]).css('width'));
        if(popUpWidth > inputWidth){
          var popupPosition = inputWidth - popUpWidth;
          $($('.cke_float')[index]).css('margin-left',popupPosition+'px');
        }
        $scope.generateTelemetry({
          type: 'TOUCH',
          id: 'input',
          target: {
            id: 'questionunit-mtf-question-' + optionSide,
            ver: '',
            type: 'input'
          }
        })
      });
    }
    optionInput.on('change', function () {
      //on changes get index id and assign to model
      var optionSide = (this.name.indexOf('LHS')>=0)?'optionsLHS':'optionsRHS';
      var idx = this.name.split('_')[2];
      $scope.mtfFormData.option[optionSide][idx].text = CKEDITOR.instances[this.name].getData();
      $scope.$safeApply();
    });
    optionInput.on('blur', function () {
      ecEditor.jQuery('.cke_float').hide();
    });
    $(".innerScroll").scroll(function () {
      ecEditor.jQuery('.cke_float').hide();
    });
    optionInput.focus();
  }

  /**
   * destroy ckeditor apart from question
   * on click delete option we need to destroy all ckeditor option
   * we are not destroy question ckedit
   */
  $scope.destroyCkEditor = function () {
    for (var name in CKEDITOR.instances) {
      if (name != "mtfQuestion") {
        CKEDITOR.instances[name].destroy(true);
      }
    }
  }

  $scope.deleteAnswer = function (id) {
    if (id >= 0) $scope.mtfFormData.option.splice(id, 1);
    if (parseInt($scope.selectedOption) == id) {
      $scope.selectedOption = undefined;
    }
    $scope.BindCkeditor();
  }
  /**
   * bind ckeditor in all option
   */
  $scope.BindCkeditor = function () {
    angular.element(document).ready(function () {
      $scope.destroyCkEditor();
      for (var index = 0; index < $(".mtfoption-text-ck-lhs").length; index++) {
        $scope.ckEditorEventHandler(index);
      }
    });
  }

}]);
//# sourceURL=mtf-controller.js