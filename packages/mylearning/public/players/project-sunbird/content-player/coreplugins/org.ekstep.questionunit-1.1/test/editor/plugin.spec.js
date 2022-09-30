describe("EditorPlugin", function() {
  var plugin, data, compiled;
  beforeEach(module('org.ekstep.questionunit'));
  beforeEach(function() {
    plugin = new org.ekstep.contenteditor.questionUnitPlugin({}, {}, {});
    data = {
      "plugin": {
        "id": "org.ekstep.questionunit.ftb",
        "version": "1.0",
        "templateId": "ftbtemplate"
      },
      "data": {
        "question": {
          "text": "a"
        },
        "answer": [{
          "text": "a"
        }]
      },
      "config": {
        "metadata": {
          "category": "ftb",
          "title": "xcvxvx",
          "language": "English",
          "qlevel": "Easy",
          "gradeLevel": ["Kindergarten"],
          "concepts": ["do_112300246933831680110"],
          "description": "cvcbcbc",
          "max_score": 1
        },
        "max_time": 0,
        "max_score": 1,
        "partial_scoring": false
      }
    }
    spyOn(plugin, "initialize").and.callThrough();
    spyOn(plugin, "beforeInit").and.callThrough();
    spyOn(plugin, "afterInit").and.callThrough();
    spyOn(plugin, "renderForm").and.callThrough();
    spyOn(plugin, "validateForm").and.callThrough();
    spyOn(ecEditor, "dispatchEvent").and.callThrough();
    spyOn(ecEditor, "addEventListener").and.callThrough();
    compiled = jasmine.createSpy('org.ekstep.questionunit.mcq:compiled');
    window.addEventListener('org.ekstep.questionunit.mcq:compiled', function() {
      compiled();
    });
  });
  describe("Plugin initialize", function() {
    it("should call beforeInit and afterInit", function() {
      plugin.initialize();
      expect(plugin.beforeInit).toHaveBeenCalled();
      expect(plugin.afterInit).toHaveBeenCalled();
    });
  });
  describe("Render form for edit question", function() {
    it("should render form function to load question form", function() {
      plugin.renderForm(data);
      ecEditor.dispatchEvent("org.ekstep.questionunit.mcq:editquestion", data);
    });
  });
  describe("Validate question unit form ", function() {
    it("should call validate function", function() {
      plugin.validateForm();
      ecEditor.dispatchEvent("org.ekstep.questionunit:validateform", data);
    });
  });
});
//# sourceURL=questionUnitPlugin.js