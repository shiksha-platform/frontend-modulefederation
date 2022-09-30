describe('FTBController', function() {
  var qsFTBTemplate = FTBController; // eslint-disable-line no-undef
  beforeEach(function() {
    spyOn(qsFTBTemplate, "invokeKeyboard").and.callThrough();
    spyOn(qsFTBTemplate, "generateHTML").and.callThrough();
    spyOn(qsFTBTemplate, "keyboardCallback").and.callThrough();
    spyOn(qsFTBTemplate, "logTelemetryInteract").and.callThrough();
    // spyOn(qsFTBTemplate, "nativeKeyboardHide").and.callThrough();
    // spyOn(qsFTBTemplate, "nativeKeyboardShow").and.callThrough();
    //spyOn(qsFTBTemplate, "setStateInput").and.callThrough();
    spyOn(QSTelemetryLogger, "logEvent").and.callThrough(); // eslint-disable-line no-undef
    spyOn(EkstepRendererAPI, "dispatchEvent").and.callThrough();
    spyOn(window, "addEventListener");
    spyOn($.fn, "removeClass");
    spyOn($.fn, "addClass");
    spyOn($.fn, "find");
  });

  describe('Question with English keyboard', function() {
    var quesData, expectedQuesData;
    beforeEach(function() {
      quesData = {
        "question": {
          "text": "<p>English a [[b]] c [[d]]</p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "English",
            "customKeys": []
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>English a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
      expectedQuesData = {
        "question": {
          "text": "<p>English a  <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"> c  <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"></p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "English",
            "customKeys": []
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>English a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
    });

    // TODO: Has to be fixed
    xit("should generateHTML for English Keyboard", function() {

      expect(qsFTBTemplate.generateHTML(quesData)).toEqual(expectedQuesData);
    });

    xit("should call keyboardCallback and remove alignment", function() {
      qsFTBTemplate.keyboardCallback("B");
      expect($(FTBController.constant.qsFtbContainer).removeClass).toHaveBeenCalledWith("align-question"); // eslint-disable-line no-undef
    });
    // TODO: Has to be fixed

    it("should call logTelemetryInteract on interact", function() {
      var event = {
        "target": {
          "id": "ans-field1"
        }
      }
      qsFTBTemplate.logTelemetryInteract(event);
      expect(QSTelemetryLogger.logEvent).toHaveBeenCalled(); // eslint-disable-line no-undef
    });

  });

  describe('Question with Device keyboard', function() {
    var quesData, expectedQuesData;
    beforeEach(function() {
      quesData = {
        "question": {
          "text": "<p>Device a [[b]] c [[d]]</p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "Device",
            "customKeys": []
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>Device a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
      expectedQuesData = {
        "question": {
          "text": "<p>Device a  <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" onclick=\"FTBController.logTelemetryInteract(event);\"> c  <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" onclick=\"FTBController.logTelemetryInteract(event);\"></p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "Device",
            "customKeys": []
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>Device a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
    });
    it("should generateHTML for Device Keyboard", function() {

      expect(qsFTBTemplate.generateHTML(quesData)).toEqual(expectedQuesData);
    });
  });

  describe('Question with Custom keyboard', function() {
    var quesData, expectedQuesData;
    beforeEach(function() {
      quesData = {
        "question": {
          "text": "<p>Custom a [[b]] c [[d]]</p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "Custom",
            "customKeys": "b,d"
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>Custom a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
      expectedQuesData = {
        "question": {
          "text": "<p>Custom a  <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"> c  <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\" onclick=\"FTBController.logTelemetryInteract(event);\"></p>\n",
          "image": "",
          "audio": "",
          "keyboardConfig": {
            "keyboardType": "Custom",
            "customKeys": "b,d"
          }
        },
        "answer": [
          "b",
          "d"
        ],
        "parsedQuestion": {
          "text": "<p>Custom a <input type=\"text\" class=\"ans-field\" id=\"ans-field1\" readonly style=\"cursor: pointer;\"> c <input type=\"text\" class=\"ans-field\" id=\"ans-field2\" readonly style=\"cursor: pointer;\"></p>\n",
          "image": "",
          "audio": ""
        }
      };
    });
    it("should generateHTML for English Keyboard", function() {

      expect(qsFTBTemplate.generateHTML(quesData)).toEqual(expectedQuesData);
    });
  });
});