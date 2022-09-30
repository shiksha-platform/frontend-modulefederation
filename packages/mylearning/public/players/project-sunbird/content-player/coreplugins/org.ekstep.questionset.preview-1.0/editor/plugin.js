/**
 *
 * Plugin to create question set Quiz and add it to stage.
 * @class questionset
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Jagadish Pujari <jagadish.pujari@tarento.com>
 */
org.ekstep.questionsetPreview = {};
org.ekstep.questionsetPreview.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.questionset.preview",

  initialize: function () {},
  newInstance: function () {},
  getQuestionPreviwContent: function (questionSet) {
    var qAndMediaObj, questionMedia, pluginIds, pluginsUsed, pluginMedia;
    var story = {
      "theme": {
        "startStage": "splash",
        "id": "theme",
        "ver": 0.3,
        "stage": [{
          "id": "splash",
          "org.ekstep.questionset": {
            "x": 9,
            "y": 6,
            "w": 80,
            "h": 85
          },
          "x": 0,
          "y": 0,
          "w": 100,
          "h": 100
        }],
        "manifest": {
          "media": []
        },
        "plugin-manifest": {}
      }
    };
    qAndMediaObj = this.getQuestionList(questionSet['org.ekstep.question']);
    _.each(qAndMediaObj['org.ekstep.question'], function (questionArray, v) {
      if (_.has(questionArray.data, "__cdata"))
        var qdata = JSON.parse(questionArray.data.__cdata);
      if (_.has(qdata, "mediamanifest")) {
        var questionMediaArr = qdata.mediamanifest.media;
        if (_.isArray(questionMediaArr)) {
          _.each(questionMediaArr, function (mediaItem, v) {
            story.theme['manifest'].media.push(mediaItem);
          })
        }
      }
    });
    story.theme.stage[0]['org.ekstep.questionset']['isQuestionPreview'] = true;
    story.theme.stage[0]['org.ekstep.questionset']['org.ekstep.question'] = qAndMediaObj["org.ekstep.question"];
    questionMedia = _.uniqBy(qAndMediaObj.media);
    pluginIds = _.uniqBy(qAndMediaObj.pluginIds);
    pluginsUsed = {};
    _.forEach(pluginIds, function (plugin) {
      pluginsUsed[plugin] = plugin;
    });
    pluginsUsed["org.ekstep.questionset"] = "org.ekstep.questionset"; //Adding Question set plugin into plugin-manifest

    ManifestGenerator.generate(pluginsUsed); // eslint-disable-line no-undef
    pluginMedia = _.uniqBy(ManifestGenerator.getMediaManifest()); // eslint-disable-line no-undef
    if (questionMedia.length > 0) {
      story.theme.manifest.media.push(questionMedia);
    }
    if (pluginMedia.length > 0) {
      story.theme.manifest.media.push(pluginMedia);
    }

    story.theme['plugin-manifest'].plugin = ManifestGenerator.getPluginManifest(); // eslint-disable-line no-undef
    return story;
  },
  getQuestionList: function (data) {
    var object = {
      "org.ekstep.question": [],
      "media": [],
      "pluginIds": []
    };

    data.forEach(function (question) {
      var obj;
      obj = {
        "id": question.id,
        "pluginId": question.pluginId,
        "pluginVer": question.pluginVer,
        "templateId": question.templateId,
        "data": question.data,
        "config": question.config,
        "w": "80",
        "x": "9",
        "h": "85",
        "y": "6"
      }
      object.pluginIds.push(question.pluginId);
      if (question.media) {
        object.media.push(question.media);
      }
      object["org.ekstep.question"].push(obj);
    });
    object.pluginIds.push('org.ekstep.navigation');
    return object;
  }
});
//# sourceURL=questionsetpreview.js