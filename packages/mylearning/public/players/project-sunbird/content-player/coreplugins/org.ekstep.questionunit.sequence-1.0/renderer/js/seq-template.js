var SEQController = SEQController || {};
/**
 * intializes renderer template html controller and provides renderer plugin data with controller, 
 * @param {Object} pluginInstance
 * @memberof org.ekstep.questionunit.sequence.seq-template
 */
SEQController.initTemplate = function (pluginInstance) {
  SEQController.pluginInstance = pluginInstance;
};

/**
 * returns complete sequence plugin renderer html, 
 * @param {String} selectedLayout selected layout from editor
 * @param {Object} availableLayout provides list of layouts
 * @memberof org.ekstep.questionunit.sequence.seq-template
 */
SEQController.getQuestionTemplate = function (selectedLayout, availableLayout) {

  SEQController.selectedLayout = selectedLayout;
  var wrapperStart = '<div class="sequencing-content-container plugin-content-container" >';
  var wrapperStartQuestionComponent = '<div class="question-content-container">';
  var wrapperEndQuestionComponent = '</div>';
  var wrapperEnd = '</div><script>SEQController.onDomReady()</script>';
  var getLayout;
  if (availableLayout.horizontal == selectedLayout) {
    getLayout = SEQController.getOptionLayout('horizontal');
  } else {
    getLayout = SEQController.getOptionLayout('vertical');
  }
  return org.ekstep.questionunit.backgroundComponent.getBackgroundGraphics() + wrapperStart + wrapperStartQuestionComponent + org.ekstep.questionunit.questionComponent.generateQuestionComponent() + wrapperEndQuestionComponent + getLayout + wrapperEnd;
}

/**
 * returns sequence option html layout based it's type, 
 * @param {String} type either `horizotnal` or `vertical`
 * @memberof org.ekstep.questionunit.sequence.seq-template
 */
SEQController.getOptionLayout = function (type) {
  return '\
  <div class="option-container ' + type + '">' + '\
      <div class="option-block-container options-<%= question.data.options.length %>">\
      <% _.each(question.data.options,function(val,key){ %>\
          <div data-seqorder=<%= val.sequenceOrder %> class="option-block">\
            <span><%= val.text %></span>\
          </div>\
      <% }) %>\
      </div>\
  </div>';
}


SEQController.touchHandler = function(event){
  var touch = event.changedTouches[0];

  var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent({
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup"
  }[event.type], true, true, window, 1,
      touch.screenX, touch.screenY,
      touch.clientX, touch.clientY, false,
      false, false, false, 0, null);

  touch.target.dispatchEvent(simulatedEvent);
  event.preventDefault();
}

SEQController.touchConvertInit = function() {
  document.addEventListener("touchstart", SEQController.touchHandler, true);
  document.addEventListener("touchmove", SEQController.touchHandler, true);
  document.addEventListener("touchend", SEQController.touchHandler, true);
  document.addEventListener("touchcancel", SEQController.touchHandler, true);
}


SEQController.onDomReady = function () {
  $(document).ready(function () {
    SEQController.touchConvertInit();
    $(".option-block-container").sortable({
      stop: function(evt,ui){
        SEQController.logTelemetryInteract(evt);
      }
    });
    $(".option-block-container").disableSelection();
  });
};

SEQController.logTelemetryInteract = function (event) {
  QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.DRAG, {
    type: QSTelemetryLogger.EVENT_TYPES.DRAG,
    id: event.target.id
  }); // eslint-disable-line no-undef
};

//# sourceURL=questionunit.seq.renderer.seq-template-controller.js