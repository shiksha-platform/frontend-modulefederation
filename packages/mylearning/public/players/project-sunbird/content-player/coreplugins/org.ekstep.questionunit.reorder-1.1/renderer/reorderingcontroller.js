var ReorderingController = {};
ReorderingController.initTemplate = function (pluginInstance) {
  ReorderingController.pluginInstance = pluginInstance;
};

ReorderingController.getQuestionTemplate = function () {
  return '\
  <div class="reorder-screen reorder-table plugin-content-container" onselectstart="return false">\
    <div class="reorder-question">' +
    org.ekstep.questionunit.questionComponent.generateQuestionComponent() +
    '</div>\
    <div class="reorder-gutter1"></div>\
    <div class="reorder-table" id="reorder-editor">\
      <div id="reorder-tarea"></div>\
      <img class="reorder-table-cell" id="reorder-backspace" onclick="ReorderingController.backspaceClick(event)" src="<%=ReorderingController.pluginInstance.getAudioIcon("renderer/assets/backspace.png") %>">\
    </div>\
    <div class="reorder-table reorder-keyboard">\
      <div class="reorder-table-cell">\
        <div class="reorder-tabContainer reorder-scroll">\
        <% _.each(question.data.sentence.tabs,function(val,key){ %>\
          <span onclick="ReorderingController.wordClick(\'w<%= val.id %>\', event)" class="reorder-words-tabs" id="w<%= val.id %>"><%= val.text %></span>\
        <% });%>\
        </div>\
      </div>\
    </div>\
  </div>';
}

/**
 * renderer:questionunit.reorder:handle click event on words.
 * @event renderer:questionunit.reorder:show
 * @memberof org.ekstep.questionunit.reorder
 */
ReorderingController.wordClick = function (id, event) {
  if (!$("#" + id).hasClass('reorder-active')) {
    $("#" + id).addClass('reorder-active reorder-remove-shadow');
    ReorderingController.pluginInstance.onWordSelect($("#" + id).attr('id'));
  }
  if (event) {
    ReorderingController.logTelemetryInteract(event)
  }
};

/**
 * renderer:questionunit.reorder:handle click event on backspace.
 * @event renderer:questionunit.reorder:show
 * @memberof org.ekstep.questionunit.reorder
 */
ReorderingController.backspaceClick = function (event) {
  ReorderingController.pluginInstance.onBackspaceClick();
  ReorderingController.logTelemetryInteract(event)
};

/**
 * logs telemetry 
 * @memberof org.ekstep.questionunit.reorder.ReorderingController
 * @param {Object} event js event object
 */
ReorderingController.logTelemetryInteract = function (event) {
  QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.TOUCH, {
    type: QSTelemetryLogger.EVENT_TYPES.TOUCH,
    id: event.target.id
  }); // eslint-disable-line no-undef
};

//# sourceURL=reordering-renderer-Controller.js