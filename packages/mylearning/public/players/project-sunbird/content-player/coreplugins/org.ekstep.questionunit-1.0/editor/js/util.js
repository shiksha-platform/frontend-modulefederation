/**
 * Angular Service to help reuse code across MTF, FTB and MCQ templates for logging 
 * telemetry events and also to invoke the asset browser. This is a place holder for
 * any functionality that needs to be reused across these templates.
 * 
 * @author: Siva K (sivashanmugam.kannan@funtoot.com), Ram J (ram.j@funtoot.com)
 */
angular.module('org.ekstep.question').service('questionServices', ['$http', function ($http) {
    this.invokeAssetBrowser = function (callbackObj) {
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', callbackObj);
    }

    this.generateTelemetry = function (data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "id": data.id,
            "pageid": data.form,
            "target": {
                "id": data.target.id,
                "ver": data.target.ver,
                "type": data.target.type
            },
            "plugin": data.plugin
        })
    }
}]);

/**
 * Angular directive for uniform handling of media (image and audio) selected into 
 * question elements (Question or Options). 
 *
 * @author: Siva K (sivashanmugam.kannan@funtoot.com), Ram J (ram.j@funtoot.com)
 */
angular.module('org.ekstep.question').directive('selectedMediaContainer', function () {
    return {
        scope: {
            formdata: '=',
            callbacks: '=mediaCallbacks',
            qEleType: '@mediaType',
            mediaIndex: '@mediaIndex'
        },
        template: '<div ng-if="(formdata.image.length > 0) || (formdata.audio.length > 0)">\
      <div class="question-selected-media-container">\
        <div class="selected-image-container" ng-if="formdata.image.length > 0">\
            <div class="image-container">\
                <img ng-click="callbacks.addMedia(qEleType, mediaIndex, \'image\');" src="{{formdata.image}}" class="selected-image" />\
            </div>\
            <div class="delete-media-container">\
                <a href="" ng-click="callbacks.deleteMedia(qEleType, mediaIndex, \'image\');" class="deleteMedia" data-tooltip="Delete image" data-inverted="">\
                    <i class="trash alternate outline large icon delete-icon" ></i>\
                </a>\
            </div>\
        </div>\
        <div class="selected-audio-container" ng-if="formdata.audio.length > 0">\
          <div class="audio-name-delete-container">\
            <div class="audio-container">\
              <audio src="{{formdata.audio}}" controls controlsList="nodownload" preload="none" class="selected-audio"\
                 data-tooltip="Play audio" data-inverted="">\
              </audio>\
              <i ng-click="callbacks.addMedia(qEleType, mediaIndex, \'audio\');" class="music icon"></i><p ng-click="callbacks.addMedia(qEleType, mediaIndex, \'audio\');">{{formdata.audioName}}</p>\
                </div>\
                <div class="delete-media-container">\
                    <a href="" ng-click="callbacks.deleteMedia(qEleType, mediaIndex, \'audio\');" class="deleteMedia" data-tooltip="Delete audio" data-inverted="">\
                        <i class="trash alternate outline large icon delete-icon"></i>\
                    </a>\
                </div>\
            </div>\
        </div>\
      </div>\
    </div>\
  '
    };
});

//# sourceURL=questionunit-util.js