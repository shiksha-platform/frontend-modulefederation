var MCQController = MCQController || {};

/**
 * Initializes the controller with the plugin instance
 * @param {Object} pluginInstance 
 */
MCQController.initTemplate = function (pluginInstance) {
  MCQController.pluginInstance = pluginInstance;
};

/**
 * loads the template content html
 */
MCQController.loadTemplateContent = function () {
  return '<div id="mcq-question-container"></div>';
};

/**
 * initializes the presence of audio or image in the question
 * @param {object} question 
 */
MCQController.isMediaAsset = function (question) {
  MCQController.isAudioIcon = !_.isUndefined(_.find(question.data.options, "audio")) ? true : false;
  MCQController.isImageIcon = !_.isUndefined(_.find(question.data.options, "image")) ? true : false;
};

/**
 * renders the question html template by invoking the appropriate layout renderer
 */
MCQController.renderQuestion = function () {
  MCQController.renderTemplateLayout(MCQController.pluginInstance._question);
};

/**
 * render template using underscore
 * @param {Object} question from question set.
 * @memberof org.ekstep.questionunit.mcq.template_controller
 */
MCQController.renderTemplateLayout = function (question) {
  MCQController.isMediaAsset(question);
  var layout = question.config.layout;
  MCQController[layout.toLowerCase()].preRender(question);
  var strTemplate = MCQController[layout.toLowerCase()].getTemplate(question)
  var template = _.template(strTemplate);
  $("#mcq-question-container").append(template({
    question: question
  }));
  MCQController[layout.toLowerCase()].postRender(question);
};

/**
* image will be shown in popup
* @memberof org.ekstep.questionunit.mcq.template_controller
*/
MCQController.showImageModel = function () {
  var eventData = event.target.src;
  var modelTemplate = "<div class='popup image-model-popup' id='image-model-popup' onclick='MCQController.hideImageModel()'><div class='popup-overlay' onclick='MCQController.hideImageModel()'></div> \
    <div class='popup-full-body'> \
      <div class='font-lato assess-popup assess-goodjob-popup'> \
        <img class='qc-question-fullimage' src=<%= src %> /> \
        <div onclick='MCQController.hideImageModel()' class='qc-popup-close-button'>&times;</div> \
      </div>\
    </div>";
  var template = _.template(modelTemplate);
  var templateData = template({
    src: eventData
  })
  $("#mcq-question-container").append(templateData);
};
/**
 * onclick overlay or X button the popup will be hide
 * @memberof org.ekstep.questionunit.mcq.template_controller
 */
MCQController.hideImageModel = function () {
  $("#image-model-popup").remove();
};
/**
 * question text if long then handle using ellipse
 * @memberof org.ekstep.questionunit.mcq.template_controller
 * @param {Object} event from question set.
 */
MCQController.expandQuestion = function (event) {
  if ($(event.target.parentElement).hasClass('collapse-ques-text')) {
    $(event.target.parentElement).removeClass("collapse-ques-text");
    $(event.target.parentElement).addClass("qc-expand-ques-text");
    $("#mcq-question").css('height', '65vh');
  } else {
    $(event.target.parentElement).addClass("collapse-ques-text");
    $(event.target.parentElement).removeClass("qc-expand-ques-text");
    $("#mcq-question").css('height', '17.7vh');
  }
};

MCQController.openPopup = function (id) {
  var data = undefined;
  MCQController.currentPopUp = id;
  if (id == 'question') {
    data = MCQController.pluginInstance._question.data.question;
  } else {
    data = MCQController.pluginInstance._question.data.options[id];
  }
  var mcqpopupTemplate = " <div class='mcq-expand-popup'>\
  <div class='popup' style='z-index: 9999999'>\
   <div class='popup-overlay'></div>\
   <div class='mcq-popup-full-body'>\
    <div class = 'mcq-popup-container'>\
      <div class = 'mcq-popup-text'>\
        <%if(!_.isEmpty(data.image)){%> \
          <div class = 'mcq-popup-image'>\
            <img src=<%=MCQController.pluginInstance.getAssetUrl( data.image) %>>\
          </div>\
        <%}%>\
        <%if(!_.isEmpty(data.audio)){%> \
          <div class ='mcq-popup-audio'>\
            <img src='<%=MCQController.pluginInstance.getDefaultAsset('audio-icon.png') %>' onclick=MCQController.pluginInstance.playAudio('<%= data.audio %>')>\
          </div>\
        <%}%>\
        <div class='mcq-popup-text-content'>\
        <%= data.text %>\
        </div>\
        </div>\
      <div class = 'mcq-popup-actions'>\
        <button class = 'mcq-popup-back-button' onclick=MCQController.closePopup();><%= (MCQController.currentPopUp == 'question') ? 'Answer' : 'Back' %></button>\
       </div>\
    </div>\
     </div>\
       </div>\
  </div>";
  var template = _.template(mcqpopupTemplate);

  var templateData = template({
    data: data
  })
  $("#questionset").append(templateData);
  EkstepRendererAPI.dispatchEvent('org.ekstep.questionunit:rendermath');
};

MCQController.closePopup = function () {
  $(".mcq-expand-popup").remove();
};

//# sourceURL=MCQController.js
