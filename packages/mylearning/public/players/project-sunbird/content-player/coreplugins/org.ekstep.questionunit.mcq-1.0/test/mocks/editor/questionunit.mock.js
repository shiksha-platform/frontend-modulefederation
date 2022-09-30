org.ekstep.contenteditor.questionUnitPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.contenteditor.questionUnitPlugin"
});

var CKEDITOR = {};
CKEDITOR.replace = function(object) { // eslint-disable-line no-unused-vars
 var questionInput = document.createElement('textarea');
 questionInput.setAttribute("name", "mcqQuestion");
 return $(questionInput);
};