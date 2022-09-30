var MCQController = MCQController || {};
MCQController.getHorizontalTemplate = function () {
return "<div class='mcq-horizontal-container'><div class='q-container'>\
  <div class='question'>\
    <% if ( question.data.question.image){ %> \
      <div class='q-media'>\
      <div class='q-image'>\
        <img src=<%=MCQController.pluginInstance.getAssetUrl( question.data.question.image) %> /> \
      </div>\
      </div>\
    <% } %> \
    <% if (question.data.question.image && question.data.question.audio){ %> \
      <div class='q-audio'>\
        <img src='<%=MCQController.pluginInstance.getDefaultAsset('audio-icon.png') %>' onclick=MCQController.pluginInstance.playAudio('<%= question.data.question.audio %>') />\
      </div>\
    <% } %> \
    <% if (question.data.question.audio && !question.data.question.image){ %> \
       <div class='q-media-audio'>\
      <div class='q-audio-only'>\
        <img src='<%=MCQController.pluginInstance.getDefaultAsset('audio-icon.png') %>' onclick=MCQController.pluginInstance.playAudio('<%= question.data.question.audio %>') />\
      </div>\
      </div>\
    <% } %> \
    <div class='q-text'>\
      <div class='q-text-content multiline-ellipsis two-line'><%= question.data.question.text %></div>\
    </div>\
    <div class='expand'>\
      <img src='<%=MCQController.pluginInstance.getDefaultAsset('expand-icon.png') %>' onclick=MCQController.openPopup('question') />\
    </div>\
</div>\
<hr style='clear:both;' />\
<div class='a-container'>\
  <div class='answers'>\
  <% _.each(question.data.options, function(val,key,index) { %> \
    <div class='qc-hmcq-option qc-initial-text option' onclick=MCQController.pluginInstance.logTelemetryInteract(event);MCQController.pluginInstance.selectedvalue(event,<%= key %>)>\
      <input type='radio' name='radio' style='display: none;'/>\
      <div class='qc-option-handler'>\
        <% if ( val.image){ %> \
          <div class='a-media'>\
          <div class='a-image'>\
            <img src=<%=MCQController.pluginInstance.getAssetUrl(val.image)%>>\
          </div>\
          </div>\
        <%}%>\
        <% if (val.image && val.audio){ %> \
          <div class='a-audio'>\
            <img src='<%=MCQController.pluginInstance.getDefaultAsset('audio-icon.png') %>' onclick=MCQController.pluginInstance.playAudio('<%= val.audio %>') />\
          </div>\
        <%}%>\
      <% if (val.audio && !val.image){ %> \
          <div class='q-media-audio'>\
        <div class='a-audio-only'>\
          <img src='<%=MCQController.pluginInstance.getDefaultAsset('audio-icon.png') %>' onclick=MCQController.pluginInstance.playAudio('<%= val.audio %>') />\
        </div>\
        </div> \
      <%}%>\
      <div class='a-text'>\
        <div class='a-text-content multiline-ellipsis single-line'><%=val.text%></div>\
      </div>\
      </div>\
      <div class='option-expand'>\
        <img src='<%=MCQController.pluginInstance.getDefaultAsset('expand-icon.png') %>' onclick=MCQController.openPopup(<%= key %>) />\
      </div>\
    </div>\
    <%});%>\
  </div>\
</div></div>\
";
};