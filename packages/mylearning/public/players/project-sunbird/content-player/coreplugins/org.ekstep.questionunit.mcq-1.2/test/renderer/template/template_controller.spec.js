describe('templateController', function() {
  var questionObj, gridobj;
  beforeAll(function(done) {
    gridobj = {
      "data": {
        "question": {
          "text": "v2 media",
          "image": "",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": ""
        },
        "topOptions": [{
          "option": {
            "text": "dfgfdg",
            "image": "",
            "audio": "",
            "isCorrect": false,
            "$$hashKey": "object:1721"
          },
          "keyIndex": 4
        }, {
          "option": {
            "text": "dfgfdgfd",
            "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
            "audio": "",
            "isCorrect": false,
            "$$hashKey": "object:1729"
          },
          "keyIndex": 5
        }, {
          "option": {
            "text": "dfgdfgdfg",
            "image": "",
            "audio": "",
            "isCorrect": false,
            "$$hashKey": "object:1737"
          },
          "keyIndex": 6
        }],
        "bottomOptions": [{
          "option": {
            "text": "dfgfdg",
            "image": "",
            "audio": "",
            "isCorrect": false,
            "$$hashKey": "object:1721"
          },
          "keyIndex": 4
        }, {
          "option": {
            "text": "dfgfdgfd",
            "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
            "audio": "",
            "isCorrect": false,
            "$$hashKey": "object:1729"
          },
          "keyIndex": 5
        }, {
          "option": {
            "text": "dfgdfgdfg",
            "image": "",
            "audio": "",
            "isCorrect": false,
            "$$hashKey": "object:1737"
          },
          "keyIndex": 6
        }]
      },
      "config": {
        "metadata": {
          "category": "MCQ",
          "title": "v2 media",
          "language": ["English"],
          "qlevel": "EASY",
          "gradeLevel": ["Grade 1"],
          "concepts": ["LO4"],
          "description": "v2 media",
          "max_score": 1
        },
        "max_time": 0,
        "max_score": 1,
        "partial_scoring": false,
        "layout": "Grid"
      },
      "qState": {
        "val": 0
      }
    }
    questionObj = {
      "data": {
        "question": {
          "text": "v2 media",
          "image": "",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": ""
        },
        "topOptions": [{
          "text": "v1",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": "",
          "isCorrect": true,
        }, {
          "text": "v2",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:769"
        }],
        "bottomOptions": [{
          "text": "v1",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": "",
          "isCorrect": true,
        }, {
          "text": "v2",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:769"
        }],
        "options": [{
          "text": "v1",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": "",
          "isCorrect": true,
          "$$hashKey": "object:768"
        }, {
          "text": "v2",
          "image": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "audio": "http://localhost:9877/assets/sounds/goodjob.mp3",
          "hint": "",
          "isCorrect": false,
          "$$hashKey": "object:769"
        }],
        "media": [{
          "id": 92415376,
          "src": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg",
          "assetId": "do_1123016850062950401107",
          "type": "image",
          "preload": false
        }]
      },
      "config": {
        "metadata": {
          "category": "MCQ",
          "title": "v2 media",
          "language": ["English"],
          "qlevel": "EASY",
          "gradeLevel": ["Grade 1"],
          "concepts": ["LO4"],
          "description": "v2 media",
          "max_score": 1
        },
        "max_time": 0,
        "max_score": 1,
        "partial_scoring": false,
        "layout": "Horizontal"
      },
      "qState": {
        "val": 0
      }
    };
    done();
  });
  beforeEach(function() {});
  afterEach(function() {});
  describe('loadTemplateContent', function() {
    it("should call the load template function", function() {
      var template = "<div id='qs-mcq-template'><div id='qc-mcqlayout'></div></div>";
      var html = MCQController.loadTemplateContent(); //eslint-disable-line no-undef
      expect(html).toEqual(template);
    })
  })
  describe('renderQuestion', function() {
    it("should call the renderQuestion function", function() {
      spyOn(MCQController, "renderQuestion"); //eslint-disable-line no-undef
      MCQController.renderQuestion(); //eslint-disable-line no-undef
      expect(MCQController.renderQuestion).toHaveBeenCalled(); //eslint-disable-line no-undef
    })
  })
  describe('renderTemplateLayout', function() {
    it("should call the renderTemplateLayout function", function() {
      spyOn(MCQController, "renderTemplateLayout"); //eslint-disable-line no-undef
      MCQController.renderTemplateLayout(questionObj); //eslint-disable-line no-undef
      expect(MCQController.renderTemplateLayout).toHaveBeenCalled(); //eslint-disable-line no-undef
    })
    it("should get the layout undefined", function() {
      questionObj.config.layout = undefined;
      MCQController.renderTemplateLayout(questionObj); //eslint-disable-line no-undef
    })
    it("should get the layout grid", function() {
      MCQController.renderTemplateLayout(gridobj); //eslint-disable-line no-undef
    })
    it("should get the layout vertical", function() {
      questionObj.config.layout = "Vertical";
      MCQController.renderTemplateLayout(questionObj); //eslint-disable-line no-undef
    })
  })
  describe('showImageModel', function() {
    it("shold call show image model", function() {
      var event = {
        "target": {
          "src": "https://dev.ekstep.in/assets/public/content/do_1123016850062950401107/artifact/black_city_by_fersy-d6vkj2j_1501670533324.jpg"
        }
      }
      MCQController.showImageModel(event.target.src); //eslint-disable-line no-undef
    })
  })
  describe('hideImageModel', function() {
    it("should remove element in body", function() {
      MCQController.hideImageModel(); //eslint-disable-line no-undef
      expect($("#image-model-popup").length).toEqual(0);
    })
  })
  describe('expandQuestion', function() {
    it("should call expand question", function() {
      var event = {
        "target": {
          "parentElement": "collapse-ques-text"
        }
      }
      expect(MCQController.expandQuestion(event)).toBe(undefined) //eslint-disable-line no-undef
    })
  })
});