"use strict";

describe("Quiz plugin instantiate and load stagePlugin:", function () {
  var stage,
    quizProto,
    pluginVersion = "1.0",
    $scope,
    controller,
    $controller;
  var pluginNames = { stage: "org.ekstep.stage", quiz: "org.ekstep.quiz" };
  var quiz = {
    create: pluginNames.quiz.concat(":create"),
    render: pluginNames.quiz.concat(":renderQuiz"),
    showPopup: pluginNames.quiz.concat(":showPopup"),
  };
  var path,
    ctrl,
    manifest =
      org.ekstep.pluginframework.pluginManager.getPluginManifest(
        "org.ekstep.quiz"
      );
  var quizTestInstance = {};
  quizTestInstance.data = {
    questionnaire: {
      items: {
        domain_62758: [
          {
            template: "org.ekstep.mtf.mixed.horizontal",
            code: "org.ekstep.assessmentitem.literacy_575578c63e74d",
            qlevel: "EASY",
            language: ["English"],
            media: [
              {
                id: "domain_62745",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219264_1465219265016.mp3",
                asset_id: "domain_62745",
                preload: "true",
              },
              {
                id: "domain_62746",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219265_1465219265451.mp3",
                asset_id: "domain_62746",
                preload: "true",
              },
              {
                id: "domain_62747",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219265_1465219265905.mp3",
                asset_id: "domain_62747",
                preload: "true",
              },
              {
                id: "domain_62748",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/icon_next_345_1465219266_1465219266362.png",
                asset_id: "domain_62748",
                preload: "true",
              },
              {
                id: "domain_62749",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219266_1465219266766.mp3",
                asset_id: "domain_62749",
                preload: "true",
              },
              {
                id: "domain_62750",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/micro_345_1465219266_1465219267120.png",
                asset_id: "domain_62750",
                preload: "true",
              },
              {
                id: "domain_62751",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219267_1465219267482.mp3",
                asset_id: "domain_62751",
                preload: "true",
              },
              {
                id: "domain_62752",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/icon_next_345_1465219267_1465219267936.png",
                asset_id: "domain_62752",
                preload: "true",
              },
              {
                id: "domain_62753",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219268_1465219268301.mp3",
                asset_id: "domain_62753",
                preload: "true",
              },
              {
                id: "domain_62754",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219268_1465219268700.mp3",
                asset_id: "domain_62754",
                preload: "true",
              },
              {
                id: "domain_62755",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219268_1465219269091.mp3",
                asset_id: "domain_62755",
                preload: "true",
              },
              {
                id: "domain_62756",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/micro_345_1465219269_1465219269536.png",
                asset_id: "domain_62756",
                preload: "true",
              },
              {
                id: "domain_62757",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219269_1465219269981.mp3",
                asset_id: "domain_62757",
                preload: "true",
              },
            ],
            type: "mtf",
            title: "zontal",
            createdOn: "2016-06-06T13:21:10.249+0000",
            objectType: "AssessmentItem",
            feedback: "",
            gradeLevel: ["Grade 1"],
            lastUpdatedOn: "2016-09-01T18:50:00.051+0000",
            used_for: "worksheet",
            model: null,
            rhs_options: [
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62752",
                  audio: "domain_62753",
                },
                answer: 0,
              },
              {
                value: {
                  type: "mixed",
                  text: "C",
                  count: "",
                  image: null,
                  audio: "domain_62754",
                },
                answer: 1,
              },
              {
                value: {
                  type: "mixed",
                  text: "D",
                  count: "",
                  image: null,
                  audio: "domain_62755",
                },
                answer: 2,
              },
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62756",
                  audio: "domain_62757",
                },
                answer: 3,
              },
            ],
            owner: "345",
            identifier: "domain_62758",
            question: "zontal zontal",
            portalOwner: "345",
            graph_id: "domain",
            nodeType: "DATA_NODE",
            lhs_options: [
              {
                value: {
                  type: "mixed",
                  text: "A",
                  count: "",
                  image: null,
                  audio: "domain_62746",
                },
                index: 0,
              },
              {
                value: {
                  type: "mixed",
                  text: "B",
                  count: "",
                  image: null,
                  audio: "domain_62747",
                },
                index: 1,
              },
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62748",
                  audio: "domain_62749",
                },
                index: 2,
              },
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62750",
                  audio: "domain_62751",
                },
                index: 3,
              },
            ],
            max_score: 1,
            name: "zontal",
            template_id: "domain_62743",
            node_id: 60954,
            question_audio: "domain_62745",
            es_metadata_id: "domain_62758",
            isSelected: true,
            $$hashKey: "object:261",
          },
        ],
      },
      item_sets: [{ count: 1, id: "domain_62758" }],
      title: "dfs",
      shuffle: false,
      showImmediateFeedback: true,
      myQuestions: false,
      concepts: "(0) Concepts",
      total_items: 1,
      max_score: 1,
      range: [1],
      optionShuffle: true,
    },
    template: [],
  };
  beforeAll(function () {
    ContentEditorTestFramework.cleanUp();
    stage = ecEditor.instantiatePlugin(pluginNames.stage);
    path = ecEditor.resolvePluginResource(
      "org.ekstep.quiz",
      "1.0",
      "editor/js/quizconfigapp.js"
    );
    quizProto =
      org.ekstep.pluginframework.pluginManager.plugins[pluginNames.quiz].p
        .prototype;
  });
  describe("Quiz plugin: render", function () {
    //var _assesmentData = { "data": { "questionnaire": { "items": { "do_1121893167451750401118": [{ "template": "org.ekstep.ftb.barakhadi", "identifier": "do_1121893167451750401118", "code": "org.ekstep.assessmentitem.do_1121893167451750401118", "question": "FIB   < > ddsdada <b>sam</b>", "qlevel": "EASY", "createdBy": "340", "description": "FIB check < > ddsdada <b>sam</b>", "language": ["English"], "title": "FIB check issue  anguler bracket", "type": "ftb", "graph_id": "domain", "nodeType": "DATA_NODE", "createdOn": "2017-02-24T16:28:24.245+0000", "objectType": "AssessmentItem", "gradeLevel": ["Grade 1"], "answer": { "ans1": { "value": "Anguler bracket is req.", "score": 1 } }, "max_score": 1, "name": "FIB check issue  anguler bracket", "lastUpdatedOn": "2017-02-25T11:24:36.902+0000", "model": { "divisor": "7", "dividend": "49", "Quotient_text": "Quotient", "Reminder_text": "Reminder", "keys": "0,1,2,3,4,5,6,7,8,9,+.-,*,/,=,<,+,." }, "used_for": "worksheet", "template_id": "domain_49025", "node_id": 95650, "concepts": ["C26"], "es_metadata_id": "do_1121893167451750401118" }] }, "item_sets": [{ "count": 1, "id": "do_1121893167451750401118" }], "title": "fsd", "shuffle": false, "showImmediateFeedback": true, "myQuestions": false, "concepts": "(0) Concepts", "total_items": 1, "max_score": 1, "range": [1], "optionShuffle": true }, "template": [{ "text": [{ "align": "center", "color": "black", "font": "Verdana", "fontsize": 70, "model": "item.title", "w": 80, "x": 10, "y": 6, "z-index": 101 }, { "align": "center", "color": "black", "font": "Verdana", "fontsize": 100, "h": 15, "id": "newText", "model": "item.ans1", "valign": "middle", "w": 35, "x": 58, "y": 68, "z-index": 100 }], "shape": [{ "event": { "type": "click" }, "h": 15, "hitArea": true, "opacity": 1, "w": 80, "x": 10, "y": 6, "z-index": 99 }, { "event": { "action": { "asset": "bKeyboard", "command": "custom", "id": "newText", "invoke": "switchTarget", "type": "command" }, "type": "click" }, "h": 15, "hitArea": true, "stroke": "black", "stroke-width": 5, "w": 35, "x": 58, "y": 67, "z-index": 99 }, { "event": { "action": { "asset_model": "item.question_audio", "command": "play", "type": "command" }, "type": "click" }, "h": 40, "hitArea": true, "stroke-width": 5, "w": 20, "x": 10, "y": 58, "z-index": 99 }], "keyboard": { "id": "bKeyboard", "keys": "item.keys", "limit": 10, "target": "newText", "type": "custom", "x": 5, "y": 15 }, "g": { "image": { "h": 75, "model": "item.question_image", "w": 100, "x": 0, "y": 0, "z-index": 102 }, "text": { "align": "center", "color": "black", "font": "Verdana", "fontsize": "2em", "h": 25, "model": "item.question", "valign": "middle", "w": 100, "x": 0, "y": 75, "z-index": 103 }, "h": 40, "w": 20, "x": 10, "y": 58 }, "id": "org.ekstep.ftb.barakhadi" }] }, "config": { "type": "items", "var": "item" } };
    var _assesmentData = {
      data: {
        questionnaire: {
          items: {
            domain_44140: [
              {
                owner: "346",
                template: "org.ekstep.mcq.ia_ta.tia10",
                identifier: "domain_44140",
                code: "org.ekstep.assessmentitem.numeracy_5729b6da54e20",
                question: "123",
                qlevel: "EASY",
                createdBy: "346",
                language: ["English"],
                type: "mcq",
                title: "सही संख्या की तीलियाँ चुनें",
                graph_id: "domain",
                nodeType: "DATA_NODE",
                createdOn: "2016-05-04T08:46:18.351+0000",
                objectType: "AssessmentItem",
                feedback: "",
                gradeLevel: ["Grade 1"],
                max_score: 1,
                options: [
                  {
                    marks: "1",
                    value: {
                      type: "mixed",
                      text: "12",
                      count: "",
                      image: null,
                      audio: null,
                    },
                    score: 1,
                    answer: true,
                  },
                  {
                    marks: "0",
                    value: {
                      type: "mixed",
                      text: "21",
                      count: "",
                      image: null,
                      audio: null,
                    },
                  },
                ],
                name: "सही संख्या की तीलियाँ चुनें",
                lastUpdatedOn: "2016-09-01T18:49:45.662+0000",
                used_for: "worksheet",
                template_id: "domain_43151",
                model: null,
                node_id: 42529,
                es_metadata_id: "domain_44140",
                isSelected: true,
                $$hashKey: "object:254",
              },
            ],
          },
          item_sets: [{ count: 1, id: "domain_44140" }],
          title: "dd",
          shuffle: false,
          showImmediateFeedback: true,
          myQuestions: false,
          concepts: "(0) Concepts",
          total_items: 1,
          max_score: 1,
          range: [1],
        },
      },
    };
    it("Quiz plugin initialization ", function () {
      expect(stage.children.length).toBe(0);
      ecEditor.dispatchEvent(quiz.create, _assesmentData);
      console.info("stage.childrens", stage.children.length);
      ecEditor.dispatchEvent(quiz.showPopup);
    });

    it("mock popup service", function (done) {
      angular.mock.module("oc.lazyLoad");
      angular.mock.module("Scope.safeApply");
      angular.mock.module("ui.sortable");
      inject(function ($ocLazyLoad, _$rootScope_, _$controller_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $ocLazyLoad
          .load([
            {
              type: "js",
              path: path,
            },
          ])
          .then(
            function () {
              ctrl = $controller("quizconfigcontroller", {
                $scope: $scope,
                quizInstance: quizTestInstance,
              });
              done();
            },
            function (error) {
              done();
            }
          );
        setInterval(function () {
          _$rootScope_.$digest();
        }, 10);
      });
    });

    it("Render quiz data", function () {
      var render = {
        items: [
          {
            question: {
              template: "org.ekstep.mcq.t.ta",
              code: "org.ekstep.assessmentitem.literacy_573c671964637",
              qlevel: "EASY",
              language: ["English"],
              media:
                '[{"id":"domain_49076","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344146.mp3","asset_id":"domain_49076"},{"id":"domain_49077","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344483.mp3","asset_id":"domain_49077"},{"id":"domain_49078","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344867.mp3","asset_id":"domain_49078"},{"id":"domain_49079","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576345_1463576345199.mp3","asset_id":"domain_49079"}]',
              type: "mcq",
              title: "हिंदी में सवाल है जो बहुत लंबा है",
              createdOn: "2016-05-18T12:59:05.435+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              options:
                '[{"marks":"1","value":{"type":"mixed","text":"option1","count":"","image":null,"audio":"domain_49076"},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"option2","count":"","image":null,"audio":"domain_49077"}},{"marks":"0","value":{"type":"mixed","text":"option3","count":"","image":null,"audio":"domain_49078"}},{"marks":"0","value":{"type":"mixed","text":"option4","count":"","image":null,"audio":"domain_49079"}}]',
              lastUpdatedOn: "2016-09-01T18:49:51.276+0000",
              used_for: "worksheet",
              model: "null",
              owner: "345",
              identifier: "domain_49080",
              question:
                "lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo",
              createdBy: "345",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              max_score: 1,
              name: "हिंदी में सवाल है जो बहुत लंबा है",
              template_id: "domain_49060",
              node_id: 47341,
              es_metadata_id: "domain_49080",
            },
            isSelected: true,
            $$hashKey: "object:723",
          },
          {
            question: {
              owner: "346",
              template: "org.ekstep.mcq.ia_ta.tia10",
              identifier: "domain_44140",
              code: "org.ekstep.assessmentitem.numeracy_5729b6da54e20",
              question: "123",
              qlevel: "EASY",
              createdBy: "346",
              language: ["English"],
              type: "mcq",
              title: "सही संख्या की तीलियाँ चुनें",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              createdOn: "2016-05-04T08:46:18.351+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              max_score: 1,
              options:
                '[{"marks":"1","value":{"type":"mixed","text":"12","count":"","image":null,"audio":null},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"21","count":"","image":null,"audio":null}}]',
              name: "सही संख्या की तीलियाँ चुनें",
              lastUpdatedOn: "2016-09-01T18:49:45.662+0000",
              used_for: "worksheet",
              template_id: "domain_43151",
              model: "null",
              node_id: 42529,
              es_metadata_id: "domain_44140",
            },
            isSelected: true,
            $$hashKey: "object:724",
          },
        ],
        config: {
          title: "dasdsa",
          shuffle: false,
          showImmediateFeedback: true,
          myQuestions: false,
          concepts: "(0) Concepts",
          total_items: 2,
          max_score: 2,
          range: [1, 2],
        },
      };
      ecEditor.dispatchEvent(quiz.render, render);
    });
  });
  describe("Quiz plugin: Invalid input test", function () {
    it("Quiz plugin with invalid template id", function () {
      var assesMendnotTemplate = {
        data: {
          questionnaire: {
            items: {
              do_1121893167451750401118: [
                {
                  template: "org.ekstep.ftb.barakhadi",
                  identifier: "do_1121893167451750401118",
                  code: "org.ekstep.assessmentitem.do_1121893167451750401118",
                  question: "FIB   < > ddsdada <b>sam</b>",
                  qlevel: "EASY",
                  createdBy: "340",
                  description: "FIB check < > ddsdada <b>sam</b>",
                  language: ["English"],
                  title: "FIB check issue  anguler bracket",
                  type: "ftb",
                  graph_id: "domain",
                  nodeType: "DATA_NODE",
                  createdOn: "2017-02-24T16:28:24.245+0000",
                  objectType: "AssessmentItem",
                  gradeLevel: ["Grade 1"],
                  answer: {
                    ans1: { value: "Anguler bracket is req.", score: 1 },
                  },
                  max_score: 1,
                  name: "FIB check issue  anguler bracket",
                  lastUpdatedOn: "2017-02-25T11:24:36.902+0000",
                  model: {
                    divisor: "7",
                    dividend: "49",
                    Quotient_text: "Quotient",
                    Reminder_text: "Reminder",
                    keys: "0,1,2,3,4,5,6,7,8,9,+.-,*,/,=,<,+,.",
                  },
                  used_for: "worksheet",
                  node_id: 95650,
                  concepts: ["C26"],
                  es_metadata_id: "do_1121893167451750401118",
                },
              ],
            },
            item_sets: [{ count: 1, id: "do_1121893167451750401118" }],
            title: "fsd",
            shuffle: false,
            showImmediateFeedback: true,
            myQuestions: false,
            concepts: "(0) Concepts",
            total_items: 1,
            max_score: 1,
            range: [1],
            optionShuffle: true,
          },
          template: [
            {
              text: [
                {
                  align: "center",
                  color: "black",
                  font: "Verdana",
                  fontsize: 70,
                  model: "item.title",
                  w: 80,
                  x: 10,
                  y: 6,
                  "z-index": 101,
                },
                {
                  align: "center",
                  color: "black",
                  font: "Verdana",
                  fontsize: 100,
                  h: 15,
                  id: "newText",
                  model: "item.ans1",
                  valign: "middle",
                  w: 35,
                  x: 58,
                  y: 68,
                  "z-index": 100,
                },
              ],
              shape: [
                {
                  event: { type: "click" },
                  h: 15,
                  hitArea: true,
                  opacity: 1,
                  w: 80,
                  x: 10,
                  y: 6,
                  "z-index": 99,
                },
                {
                  event: {
                    action: {
                      asset: "bKeyboard",
                      command: "custom",
                      id: "newText",
                      invoke: "switchTarget",
                      type: "command",
                    },
                    type: "click",
                  },
                  h: 15,
                  hitArea: true,
                  stroke: "black",
                  "stroke-width": 5,
                  w: 35,
                  x: 58,
                  y: 67,
                  "z-index": 99,
                },
                {
                  event: {
                    action: {
                      asset_model: "item.question_audio",
                      command: "play",
                      type: "command",
                    },
                    type: "click",
                  },
                  h: 40,
                  hitArea: true,
                  "stroke-width": 5,
                  w: 20,
                  x: 10,
                  y: 58,
                  "z-index": 99,
                },
              ],
              keyboard: {
                id: "bKeyboard",
                keys: "item.keys",
                limit: 10,
                target: "newText",
                type: "custom",
                x: 5,
                y: 15,
              },
              g: {
                image: {
                  h: 75,
                  model: "item.question_image",
                  w: 100,
                  x: 0,
                  y: 0,
                  "z-index": 102,
                },
                text: {
                  align: "center",
                  color: "black",
                  font: "Verdana",
                  fontsize: "2em",
                  h: 25,
                  model: "item.question",
                  valign: "middle",
                  w: 100,
                  x: 0,
                  y: 75,
                  "z-index": 103,
                },
                h: 40,
                w: 20,
                x: 10,
                y: 58,
              },
              id: "org.ekstep.ftb.barakhadi",
            },
          ],
        },
        config: { type: "items", var: "item" },
      };
      ecEditor.dispatchEvent(quiz.create, assesMendnotTemplate);
      console.info("stage.childrens", stage.children);
    });
    it("When media is not array", function () {
      var mediaData = {
        items: [
          {
            question: {
              template: "org.ekstep.mcq.t.ta",
              code: "org.ekstep.assessmentitem.literacy_573c671964637",
              qlevel: "EASY",
              language: ["English"],
              media:
                '{"id":"domain_49076","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344146.mp3","asset_id":"domain_49076"}',
              type: "mcq",
              title: "हिंदी में सवाल है जो बहुत लंबा है",
              createdOn: "2016-05-18T12:59:05.435+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              options:
                '[{"marks":"1","value":{"type":"mixed","text":"option1","count":"","image":null,"audio":"domain_49076"},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"option2","count":"","image":null,"audio":"domain_49077"}},{"marks":"0","value":{"type":"mixed","text":"option3","count":"","image":null,"audio":"domain_49078"}},{"marks":"0","value":{"type":"mixed","text":"option4","count":"","image":null,"audio":"domain_49079"}}]',
              lastUpdatedOn: "2016-09-01T18:49:51.276+0000",
              used_for: "worksheet",
              model: "null",
              owner: "345",
              identifier: "domain_49080",
              question:
                "lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo",
              createdBy: "345",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              max_score: 1,
              name: "हिंदी में सवाल है जो बहुत लंबा है",
              template_id: "domain_49060",
              node_id: 47341,
              es_metadata_id: "domain_49080",
            },
            isSelected: true,
            $$hashKey: "object:723",
          },
          {
            question: {
              owner: "346",
              template: "org.ekstep.mcq.ia_ta.tia10",
              identifier: "domain_44140",
              code: "org.ekstep.assessmentitem.numeracy_5729b6da54e20",
              question: "123",
              qlevel: "EASY",
              createdBy: "346",
              language: ["English"],
              type: "mcq",
              title: "सही संख्या की तीलियाँ चुनें",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              createdOn: "2016-05-04T08:46:18.351+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              max_score: 1,
              options:
                '[{"marks":"1","value":{"type":"mixed","text":"12","count":"","image":null,"audio":null},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"21","count":"","image":null,"audio":null}}]',
              name: "सही संख्या की तीलियाँ चुनें",
              lastUpdatedOn: "2016-09-01T18:49:45.662+0000",
              used_for: "worksheet",
              template_id: "domain_43151",
              model: "null",
              node_id: 42529,
              es_metadata_id: "domain_44140",
            },
            isSelected: true,
            $$hashKey: "object:724",
          },
        ],
        config: {
          title: "dasdsa",
          shuffle: false,
          showImmediateFeedback: true,
          myQuestions: false,
          concepts: "(0) Concepts",
          total_items: 2,
          max_score: 2,
          range: [1, 2],
        },
      };
      ecEditor.dispatchEvent(quiz.render, mediaData);
    });
    it("Quiz convert when passing null object", function () {
      spyOn(quizProto, "convert").and.callThrough();
      quizProto.convert(null);
      expect(quizProto.convert).toHaveBeenCalled();
    });
    it("Template data validateion", function () {
      var temp = [
        {
          id: "theme",
          version: "1.0",
          startStage: "38b93083-c8ed-41a0-a802-c61da3b2bc58",
          stage: [
            {
              x: 0,
              y: 0,
              w: 100,
              h: 100,
              id: "38b93083-c8ed-41a0-a802-c61da3b2bc58",
              r: null,
              config: {
                __cdata:
                  '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true}',
              },
              param: [{ name: "instructions", value: "" }],
              "org.ekstep.funtoot.numerals.counting": [
                {
                  w: 100,
                  h: 100,
                  x: 0,
                  y: 0,
                  r: null,
                  id: "6468320e-1325-4782-bb4e-4556d60a1a01",
                  data: {
                    __cdata:
                      '{"total_items":6,"item_sets":[{"id":"set1","count":"6"}],"items":{"set1":[{"langid":"en","identifier":"number_counting","qid":0,"type":"ftb","template_id":"","template":"numeralsCounting","title":"Fill in the missing numbers","question_audio":"","question_image":"","model":{"numbers":"$nums","langId":"en","numberType":"","rows":3,"cols":3,"hintMsg":"Think of the numbers from 0 to 9 and check which are missing.","tileImgPrefix":"tile","mask":[2],"variables":{"$expr":"\'[0 - 9]\'","$totalNums":"3*3","$numberType":"\'\'","$nums":"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)"}}},{"langid":"en","identifier":"number_counting","qid":0,"type":"ftb","template_id":"","template":"numeralsCounting","title":"Fill in the missing numbers","question_audio":"","question_image":"","model":{"numbers":"$nums","langId":"en","numberType":"","rows":3,"cols":3,"hintMsg":"Think of the numbers from 0 to 9 and check which are missing.","tileImgPrefix":"tile","mask":[2],"variables":{"$expr":"\'[0 - 9]\'","$totalNums":"3*3","$numberType":"\'\'","$nums":"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)"}}},{"langid":"en","identifier":"number_counting","qid":0,"type":"ftb","template_id":"","template":"numeralsCounting","title":"Fill in the missing numbers","question_audio":"","question_image":"","model":{"numbers":"$nums","langId":"en","numberType":"","rows":3,"cols":3,"hintMsg":"Think of the numbers from 0 to 9 and check which are missing.","tileImgPrefix":"tile","mask":[2],"variables":{"$expr":"\'[0 - 9]\'","$totalNums":"3*3","$numberType":"\'\'","$nums":"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)"}}},{"langid":"en","identifier":"number_counting","qid":0,"type":"ftb","template_id":"","template":"numeralsCounting","title":"Fill in the missing numbers","question_audio":"","question_image":"","model":{"numbers":"$nums","langId":"en","numberType":"","rows":3,"cols":3,"hintMsg":"Think of the numbers from 0 to 9 and check which are missing.","tileImgPrefix":"tile","mask":[2],"variables":{"$expr":"\'[0 - 9]\'","$totalNums":"3*3","$numberType":"\'\'","$nums":"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)"}}},{"langid":"en","identifier":"number_counting","qid":0,"type":"ftb","template_id":"","template":"numeralsCounting","title":"Fill in the missing numbers","question_audio":"","question_image":"","model":{"numbers":"$nums","langId":"en","numberType":"","rows":3,"cols":3,"hintMsg":"Think of the numbers from 0 to 9 and check which are missing.","tileImgPrefix":"tile","mask":[2],"variables":{"$expr":"\'[0 - 9]\'","$totalNums":"3*3","$numberType":"\'\'","$nums":"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)"}}},{"langid":"en","identifier":"number_counting","qid":0,"type":"ftb","template_id":"","template":"numeralsCounting","title":"Fill in the missing numbers","question_audio":"","question_image":"","model":{"numbers":"$nums","langId":"en","numberType":"","rows":3,"cols":3,"hintMsg":"Think of the numbers from 0 to 9 and check which are missing.","tileImgPrefix":"tile","mask":[2],"variables":{"$expr":"\'[0 - 9]\'","$totalNums":"3*3","$numberType":"\'\'","$nums":"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)"}}}]}}',
                  },
                  config: {
                    __cdata:
                      '{"title":"Fill in the correct missing numbers","count":6,"type":"items","var":"item"}',
                  },
                },
              ],
            },
          ],
          manifest: {
            media: [
              {
                id: "funtoot-splash",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/funtoot-splash.jpg",
              },
              {
                id: "eraser",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/eraser.png",
              },
              {
                id: "tile3x3",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/tile3x3.png",
              },
              {
                id: "tile3x4",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/tile3x4.png",
              },
              {
                id: "micro-hint",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/micro-hint.png",
              },
              {
                id: "hint",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/hint.png",
              },
              {
                id: "solImg",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/solImg.png",
              },
              {
                id: "microHint",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/microHint.png",
              },
              {
                id: "x",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/x.png",
              },
              {
                id: "slate",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/slate.png",
              },
              {
                id: "close",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/close.png",
              },
              {
                id: "submit",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/icn_submit.png",
              },
              {
                id: "editable",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/editable.png",
              },
              {
                id: "nonEditable",
                type: "image",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/nonEditable.png",
              },
              {
                id: "ftPlugin",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftBasePlugin.js",
              },
              {
                id: "ftFibBasePlugin",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftFibBasePlugin.js",
              },
              {
                id: "nkeyboard",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/CustomNumKeyboard.js",
              },
              {
                id: "ftFib",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftFib.js",
              },
              {
                id: "ftPluginHelper",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftPluginHelper.js",
              },
              {
                id: "ftGrid",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.numerals.grid-1.0/renderer/ftGrid.js",
              },
              {
                id: "keyboard_css",
                type: "css",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/css/numerickeyboard.css",
              },
              {
                id: "ftHint",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftHint.js",
              },
              {
                id: "ftMicroHint",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftMicroHint.js",
              },
              {
                id: "ftPopup",
                type: "plugin",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftPopup.js",
              },
              {
                id: "org.ekstep.funtoot.numerals.counting",
                ver: "1.0",
                src: "http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/renderer/numeralsCounting.js",
                type: "plugin",
              },
            ],
          },
        },
      ];
      spyOn(quizProto, "getTemplateData").and.callThrough();
      quizProto.getTemplateData(temp);
      expect(quizProto.getTemplateData).toHaveBeenCalled();
    });
    xit("Get the Question count details when the invalid template id are present", function () {
      var questionnaire = {
        items: {
          domain_49080: [
            {
              template: "org.ekstep.mcq.t.ta",
              code: "org.ekstep.assessmentitem.literacy_573c671964637",
              qlevel: "EASY",
              language: ["English"],
              media: [
                {
                  id: "domain_49076",
                  type: "audio",
                  src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344146.mp3",
                  asset_id: "domain_49076",
                  preload: "true",
                },
                {
                  id: "domain_49077",
                  type: "audio",
                  src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344483.mp3",
                  asset_id: "domain_49077",
                  preload: "true",
                },
                {
                  id: "domain_49078",
                  type: "audio",
                  src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344867.mp3",
                  asset_id: "domain_49078",
                  preload: "true",
                },
                {
                  id: "domain_49079",
                  type: "audio",
                  src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576345_1463576345199.mp3",
                  asset_id: "domain_49079",
                  preload: "true",
                },
              ],
              type: "mcq",
              title: "हिंदी में सवाल है जो बहुत लंबा है",
              createdOn: "2016-05-18T12:59:05.435+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              options: [
                {
                  marks: "1",
                  value: {
                    type: "mixed",
                    text: "option1",
                    count: "",
                    image: null,
                    audio: "domain_49076",
                  },
                  score: 1,
                  answer: true,
                },
                {
                  marks: "0",
                  value: {
                    type: "mixed",
                    text: "option2",
                    count: "",
                    image: null,
                    audio: "domain_49077",
                  },
                },
                {
                  marks: "0",
                  value: {
                    type: "mixed",
                    text: "option3",
                    count: "",
                    image: null,
                    audio: "domain_49078",
                  },
                },
                {
                  marks: "0",
                  value: {
                    type: "mixed",
                    text: "option4",
                    count: "",
                    image: null,
                    audio: "domain_49079",
                  },
                },
              ],
              lastUpdatedOn: "2016-09-01T18:49:51.276+0000",
              used_for: "worksheet",
              model: null,
              owner: "345",
              identifier: "domain_49080",
              question:
                "lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo",
              createdBy: "345",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              max_score: 1,
              name: "हिंदी में सवाल है जो बहुत लंबा है",
              template_id: "domain_49060",
              node_id: 47341,
              es_metadata_id: "domain_49080",
            },
            {
              owner: "346",
              template: "org.ekstep.mcq.ia_ta.tia10",
              identifier: "domain_44140",
              code: "org.ekstep.assessmentitem.numeracy_5729b6da54e20",
              question: "123",
              qlevel: "EASY",
              createdBy: "346",
              language: ["English"],
              type: "mcq",
              title: "सही संख्या की तीलियाँ चुनें",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              createdOn: "2016-05-04T08:46:18.351+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              max_score: 1,
              options: [
                {
                  marks: "1",
                  value: {
                    type: "mixed",
                    text: "12",
                    count: "",
                    image: null,
                    audio: null,
                  },
                  score: 1,
                  answer: true,
                },
                {
                  marks: "0",
                  value: {
                    type: "mixed",
                    text: "21",
                    count: "",
                    image: null,
                    audio: null,
                  },
                },
              ],
              name: "सही संख्या की तीलियाँ चुनें",
              lastUpdatedOn: "2016-09-01T18:49:45.662+0000",
              used_for: "worksheet",
              template_id: "domain_43151",
              model: null,
              node_id: 42529,
              es_metadata_id: "domain_44140",
            },
            {
              owner: "346",
              template: "org.ekstep.mcq.ia_ta.tia10",
              identifier: "domain_44141",
              code: "org.ekstep.assessmentitem.numeracy_5729b7189079c",
              question: "123",
              qlevel: "EASY",
              createdBy: "346",
              language: ["English"],
              type: "mcq",
              title: "सही संख्या की तीलियाँ चुनें",
              graph_id: "domain",
              nodeType: "DATA_NODE",
              createdOn: "2016-05-04T08:47:20.591+0000",
              objectType: "AssessmentItem",
              feedback: "",
              gradeLevel: ["Grade 1"],
              max_score: 1,
              options: [
                {
                  marks: "1",
                  value: {
                    type: "mixed",
                    text: "123",
                    count: "",
                    image: null,
                    audio: null,
                  },
                  score: 1,
                  answer: true,
                },
                {
                  marks: "0",
                  value: {
                    type: "mixed",
                    text: "1234",
                    count: "",
                    image: null,
                    audio: null,
                  },
                },
              ],
              name: "सही संख्या की तीलियाँ चुनें",
              lastUpdatedOn: "2016-09-01T18:49:45.679+0000",
              used_for: "worksheet",
              template_id: "domain_43151",
              model: null,
              node_id: 42530,
              es_metadata_id: "domain_44141",
            },
          ],
        },
        item_sets: [{ count: 3, id: "domain_49080" }],
        title: "hhh",
        shuffle: false,
        showImmediateFeedback: true,
        myQuestions: false,
        concepts: "(0) Concepts",
        total_items: 3,
        max_score: 3,
        range: [1, 2, 3],
        optionShuffle: true,
      };
      var errTemplateids = ["undefined", "undefined"];
      spyOn(quizProto, "getInvlidQuestioncount").and.callThrough();
      quizProto.getInvlidQuestioncount(questionnaire, errTemplateids);
      expect(quizProto.getInvlidQuestioncount).toHaveBeenCalled();
    });
    /*it('Quiz ClearItem Test',function(){
            var questionnaire = {"items":{"domain_49080":[{"template":"org.ekstep.mcq.t.ta","code":"org.ekstep.assessmentitem.literacy_573c671964637","qlevel":"EASY","language":["English"],"media":[{"id":"domain_49076","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344146.mp3","asset_id":"domain_49076","preload":"true"},{"id":"domain_49077","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344483.mp3","asset_id":"domain_49077","preload":"true"},{"id":"domain_49078","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344867.mp3","asset_id":"domain_49078","preload":"true"},{"id":"domain_49079","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576345_1463576345199.mp3","asset_id":"domain_49079","preload":"true"}],"type":"mcq","title":"हिंदी में सवाल है जो बहुत लंबा है","createdOn":"2016-05-18T12:59:05.435+0000","objectType":"AssessmentItem","feedback":"","gradeLevel":["Grade 1"],"options":[{"marks":"1","value":{"type":"mixed","text":"option1","count":"","image":null,"audio":"domain_49076"},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"option2","count":"","image":null,"audio":"domain_49077"}},{"marks":"0","value":{"type":"mixed","text":"option3","count":"","image":null,"audio":"domain_49078"}},{"marks":"0","value":{"type":"mixed","text":"option4","count":"","image":null,"audio":"domain_49079"}}],"lastUpdatedOn":"2016-09-01T18:49:51.276+0000","used_for":"worksheet","model":null,"owner":"345","identifier":"domain_49080","question":"lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo","createdBy":"345","graph_id":"domain","nodeType":"DATA_NODE","max_score":1,"name":"हिंदी में सवाल है जो बहुत लंबा है","template_id":"domain_49060","node_id":47341,"es_metadata_id":"domain_49080"},{"owner":"346","template":"org.ekstep.mcq.ia_ta.tia10","identifier":"domain_44140","code":"org.ekstep.assessmentitem.numeracy_5729b6da54e20","question":"123","qlevel":"EASY","createdBy":"346","language":["English"],"type":"mcq","title":"सही संख्या की तीलियाँ चुनें","graph_id":"domain","nodeType":"DATA_NODE","createdOn":"2016-05-04T08:46:18.351+0000","objectType":"AssessmentItem","feedback":"","gradeLevel":["Grade 1"],"max_score":1,"options":[{"marks":"1","value":{"type":"mixed","text":"12","count":"","image":null,"audio":null},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"21","count":"","image":null,"audio":null}}],"name":"सही संख्या की तीलियाँ चुनें","lastUpdatedOn":"2016-09-01T18:49:45.662+0000","used_for":"worksheet","template_id":"domain_43151","model":null,"node_id":42529,"es_metadata_id":"domain_44140"},{"owner":"346","template":"org.ekstep.mcq.ia_ta.tia10","identifier":"domain_44141","code":"org.ekstep.assessmentitem.numeracy_5729b7189079c","question":"123","qlevel":"EASY","createdBy":"346","language":["English"],"type":"mcq","title":"सही संख्या की तीलियाँ चुनें","graph_id":"domain","nodeType":"DATA_NODE","createdOn":"2016-05-04T08:47:20.591+0000","objectType":"AssessmentItem","feedback":"","gradeLevel":["Grade 1"],"max_score":1,"options":[{"marks":"1","value":{"type":"mixed","text":"123","count":"","image":null,"audio":null},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"1234","count":"","image":null,"audio":null}}],"name":"सही संख्या की तीलियाँ चुनें","lastUpdatedOn":"2016-09-01T18:49:45.679+0000","used_for":"worksheet","template_id":"domain_43151","model":null,"node_id":42530,"es_metadata_id":"domain_44141"}]},"item_sets":[{"count":3,"id":"domain_49080"}],"title":"hhh","shuffle":false,"showImmediateFeedback":true,"myQuestions":false,"concepts":"(0) Concepts","total_items":3,"max_score":3,"range":[1,2,3],"optionShuffle":true};
            var errTemplateids = ["undefined",'undefined'];
            quizProto.getInvlidQuestioncount(questionnaire,errTemplateids);
        });*/
  });
  describe("Quiz plugin: Valid input data test", function () {
    it("Quiz convert when valid object XML response", function () {
      var xmlResponse = {
        data: {
          id: "ekstep.content.info",
          ver: "2.0",
          ts: "2017-04-07T16:05:30ZZ",
          params: {
            resmsgid: "a52f94a1-ca71-4f89-b579-58bc031787df",
            msgid: null,
            err: null,
            status: "successful",
            errmsg: null,
          },
          responseCode: "OK",
          result: {
            content: {
              identifier: "domain_43151",
              body: '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<theme id="theme" ver="0.2">\n    <manifest>\n\t\t\n\t\t\t\n    </manifest>\n    \n\t<controller id="assessment" name="assessment" type="items"/>\n\t\n\t\n\t<template id="org.ekstep.mcq.ia_ta.tia10">\n\t\t\t\t\n\t\t<text align="center" color="black" font="Verdana" fontsize="50" model="item.title" valign="middle" w="80" x="10" y="10"/>\n\t\t\t\t\n\t\t<text align="center" color="black" font="Verdana" fontsize="60" model="item.question" valign="middle" w="80" x="10" y="20"/>\n\t\t<shape h="10" hitArea="true" id="retry" type="rect" visible="true" w="80" x="10" y="17">\t\n\t\t\t<event type="click">\n\t\t\t\t<action asset_model="item.question_audio" command="play" type="command"/>\n\t\t\t</event>\n\t\t</shape>\n\t\t\n\t\t<image h="30" model="item.question_image" x="35" y="27">\n\t\t\t\n\t\t</image> \n\t\t\t\n\t\t<mcq model="item" multi_select="false">\n            <options cols="5" h="40" layout="table" marginX="5" marginY="5" options="options" w="80" x="10" y="60">\n                <image h="75" model="option.value.image" x="20" y="0"/>\n                \n\t\t\t\t<text align="center" font="Georgia" fontsize="350" h="10" model="option.value.text" w="100" weight="bold" x="0" y="75"/>\n\t\t\t\t<event type="click">\n\t\t\t\t\t<action asset_model="option.value.audio" command="play" type="command"/>\n\t\t\t\t</event>\n            </options>\n        </mcq>\n\t\t\n\t</template>\n\n    <stage h="100" id="stage1" iterate="assessment" var="item" w="100" x="0" y="0">\t\t\t\t\t\t\t\n       \n\t\t<embed template="item" var-item="item"/>\n\t\t\n\t</stage>\n\t\n</theme>\n',
              languageCode: "en",
            },
          },
        },
        status: 200,
        config: {
          method: "GET",
          transformRequest: [null],
          transformResponse: [null],
          headers: {
            "user-id": "content-editor",
            Accept: "application/json, text/plain, */*",
          },
          url: "https://dev.ekstep.in/api/learning/v2/content/domain_43151?taxonomyId=literacy_v2&fields=body,editorState,templateId,languageCode",
          requestTimestamp: 1491581125393,
          responseTimestamp: 1491581125606,
        },
        statusText: "OK",
      };
      spyOn(quizProto, "convert").and.callThrough();
      quizProto.convert(xmlResponse);
      expect(quizProto.convert).toHaveBeenCalled();
    });
    it("Quiz convert when valid JSON response", function () {
      var jsonResponse = {
        data: {
          id: "ekstep.content.info",
          ver: "2.0",
          ts: "2017-04-07T16:05:30ZZ",
          params: {
            resmsgid: "9fe11dd4-a60a-4a63-b9bf-4208d837e4ee",
            msgid: null,
            err: null,
            status: "successful",
            errmsg: null,
          },
          responseCode: "OK",
          result: {
            content: {
              identifier: "domain_49060",
              body: '{"theme":{"id":"theme","version":"1.0","startStage":"38b93083-c8ed-41a0-a802-c61da3b2bc58","stage":[{"x":0,"y":0,"w":100,"h":100,"id":"38b93083-c8ed-41a0-a802-c61da3b2bc58","r":null,"config":{"__cdata":"{\\"opacity\\":100,\\"strokeWidth\\":1,\\"stroke\\":\\"rgba(255, 255, 255, 0)\\",\\"autoplay\\":false,\\"visible\\":true}"},"param":[{"name":"instructions","value":""}],"org.ekstep.funtoot.numerals.counting":[{"w":100,"h":100,"x":0,"y":0,"r":null,"id":"6468320e-1325-4782-bb4e-4556d60a1a01","data":{"__cdata":"{\\"total_items\\":6,\\"item_sets\\":[{\\"id\\":\\"set1\\",\\"count\\":\\"6\\"}],\\"items\\":{\\"set1\\":[{\\"langid\\":\\"en\\",\\"identifier\\":\\"number_counting\\",\\"qid\\":0,\\"type\\":\\"ftb\\",\\"template_id\\":\\"\\",\\"template\\":\\"numeralsCounting\\",\\"title\\":\\"Fill in the missing numbers\\",\\"question_audio\\":\\"\\",\\"question_image\\":\\"\\",\\"model\\":{\\"numbers\\":\\"$nums\\",\\"langId\\":\\"en\\",\\"numberType\\":\\"\\",\\"rows\\":3,\\"cols\\":3,\\"hintMsg\\":\\"Think of the numbers from 0 to 9 and check which are missing.\\",\\"tileImgPrefix\\":\\"tile\\",\\"mask\\":[2],\\"variables\\":{\\"$expr\\":\\"\'[0 - 9]\'\\",\\"$totalNums\\":\\"3*3\\",\\"$numberType\\":\\"\'\'\\",\\"$nums\\":\\"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)\\"}}},{\\"langid\\":\\"en\\",\\"identifier\\":\\"number_counting\\",\\"qid\\":0,\\"type\\":\\"ftb\\",\\"template_id\\":\\"\\",\\"template\\":\\"numeralsCounting\\",\\"title\\":\\"Fill in the missing numbers\\",\\"question_audio\\":\\"\\",\\"question_image\\":\\"\\",\\"model\\":{\\"numbers\\":\\"$nums\\",\\"langId\\":\\"en\\",\\"numberType\\":\\"\\",\\"rows\\":3,\\"cols\\":3,\\"hintMsg\\":\\"Think of the numbers from 0 to 9 and check which are missing.\\",\\"tileImgPrefix\\":\\"tile\\",\\"mask\\":[2],\\"variables\\":{\\"$expr\\":\\"\'[0 - 9]\'\\",\\"$totalNums\\":\\"3*3\\",\\"$numberType\\":\\"\'\'\\",\\"$nums\\":\\"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)\\"}}},{\\"langid\\":\\"en\\",\\"identifier\\":\\"number_counting\\",\\"qid\\":0,\\"type\\":\\"ftb\\",\\"template_id\\":\\"\\",\\"template\\":\\"numeralsCounting\\",\\"title\\":\\"Fill in the missing numbers\\",\\"question_audio\\":\\"\\",\\"question_image\\":\\"\\",\\"model\\":{\\"numbers\\":\\"$nums\\",\\"langId\\":\\"en\\",\\"numberType\\":\\"\\",\\"rows\\":3,\\"cols\\":3,\\"hintMsg\\":\\"Think of the numbers from 0 to 9 and check which are missing.\\",\\"tileImgPrefix\\":\\"tile\\",\\"mask\\":[2],\\"variables\\":{\\"$expr\\":\\"\'[0 - 9]\'\\",\\"$totalNums\\":\\"3*3\\",\\"$numberType\\":\\"\'\'\\",\\"$nums\\":\\"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)\\"}}},{\\"langid\\":\\"en\\",\\"identifier\\":\\"number_counting\\",\\"qid\\":0,\\"type\\":\\"ftb\\",\\"template_id\\":\\"\\",\\"template\\":\\"numeralsCounting\\",\\"title\\":\\"Fill in the missing numbers\\",\\"question_audio\\":\\"\\",\\"question_image\\":\\"\\",\\"model\\":{\\"numbers\\":\\"$nums\\",\\"langId\\":\\"en\\",\\"numberType\\":\\"\\",\\"rows\\":3,\\"cols\\":3,\\"hintMsg\\":\\"Think of the numbers from 0 to 9 and check which are missing.\\",\\"tileImgPrefix\\":\\"tile\\",\\"mask\\":[2],\\"variables\\":{\\"$expr\\":\\"\'[0 - 9]\'\\",\\"$totalNums\\":\\"3*3\\",\\"$numberType\\":\\"\'\'\\",\\"$nums\\":\\"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)\\"}}},{\\"langid\\":\\"en\\",\\"identifier\\":\\"number_counting\\",\\"qid\\":0,\\"type\\":\\"ftb\\",\\"template_id\\":\\"\\",\\"template\\":\\"numeralsCounting\\",\\"title\\":\\"Fill in the missing numbers\\",\\"question_audio\\":\\"\\",\\"question_image\\":\\"\\",\\"model\\":{\\"numbers\\":\\"$nums\\",\\"langId\\":\\"en\\",\\"numberType\\":\\"\\",\\"rows\\":3,\\"cols\\":3,\\"hintMsg\\":\\"Think of the numbers from 0 to 9 and check which are missing.\\",\\"tileImgPrefix\\":\\"tile\\",\\"mask\\":[2],\\"variables\\":{\\"$expr\\":\\"\'[0 - 9]\'\\",\\"$totalNums\\":\\"3*3\\",\\"$numberType\\":\\"\'\'\\",\\"$nums\\":\\"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)\\"}}},{\\"langid\\":\\"en\\",\\"identifier\\":\\"number_counting\\",\\"qid\\":0,\\"type\\":\\"ftb\\",\\"template_id\\":\\"\\",\\"template\\":\\"numeralsCounting\\",\\"title\\":\\"Fill in the missing numbers\\",\\"question_audio\\":\\"\\",\\"question_image\\":\\"\\",\\"model\\":{\\"numbers\\":\\"$nums\\",\\"langId\\":\\"en\\",\\"numberType\\":\\"\\",\\"rows\\":3,\\"cols\\":3,\\"hintMsg\\":\\"Think of the numbers from 0 to 9 and check which are missing.\\",\\"tileImgPrefix\\":\\"tile\\",\\"mask\\":[2],\\"variables\\":{\\"$expr\\":\\"\'[0 - 9]\'\\",\\"$totalNums\\":\\"3*3\\",\\"$numberType\\":\\"\'\'\\",\\"$nums\\":\\"getNumberSequence($expr, $totalNums, 1,\'en\', $numberType)\\"}}}]}}"},"config":{"__cdata":"{\\"title\\":\\"Fill in the correct missing numbers\\",\\"count\\":6,\\"type\\":\\"items\\",\\"var\\":\\"item\\"}"}}]}],"manifest":{"media":[{"id":"funtoot-splash","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/funtoot-splash.jpg"},{"id":"eraser","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/eraser.png"},{"id":"tile3x3","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/tile3x3.png"},{"id":"tile3x4","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/tile3x4.png"},{"id":"micro-hint","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/micro-hint.png"},{"id":"hint","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/hint.png"},{"id":"solImg","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/solImg.png"},{"id":"microHint","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/microHint.png"},{"id":"x","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/x.png"},{"id":"slate","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/slate.png"},{"id":"close","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/close.png"},{"id":"submit","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/icn_submit.png"},{"id":"editable","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/editable.png"},{"id":"nonEditable","type":"image","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/asset/nonEditable.png"},{"id":"ftPlugin","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftBasePlugin.js"},{"id":"ftFibBasePlugin","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftFibBasePlugin.js"},{"id":"nkeyboard","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/CustomNumKeyboard.js"},{"id":"ftFib","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftFib.js"},{"id":"ftPluginHelper","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftPluginHelper.js"},{"id":"ftGrid","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.numerals.grid-1.0/renderer/ftGrid.js"},{"id":"keyboard_css","type":"css","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/css/numerickeyboard.css"},{"id":"ftHint","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftHint.js"},{"id":"ftMicroHint","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftMicroHint.js"},{"id":"ftPopup","type":"plugin","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/../org.ekstep.funtoot.common-1.0/renderer/ftPopup.js"},{"id":"org.ekstep.funtoot.numerals.counting","ver":"1.0","src":"http://localhost:3000/plugins/org.ekstep.funtoot.numerals.counting-1.0/renderer/numeralsCounting.js","type":"plugin"}]}}}',
              languageCode: "en",
            },
          },
        },
        status: 200,
        config: {
          method: "GET",
          transformRequest: [null],
          transformResponse: [null],
          headers: {
            "user-id": "content-editor",
            Accept: "application/json, text/plain, */*",
          },
          url: "https://dev.ekstep.in/api/learning/v2/content/domain_49060?taxonomyId=literacy_v2&fields=body,editorState,templateId,languageCode",
          requestTimestamp: 1491581125393,
          responseTimestamp: 1491581365841,
        },
        statusText: "OK",
      };
      spyOn(quizProto, "convert").and.callThrough();
      quizProto.convert(jsonResponse);
      expect(quizProto.convert).toHaveBeenCalled();
    });
    it("Add media config test when passing valid object from the instance", function () {
      var obj = {
        data: {
          __cdata:
            '{"questionnaire":{"items":{"domain_49080":[{"template":"org.ekstep.mcq.t.ta","code":"org.ekstep.assessmentitem.literacy_573c671964637","qlevel":"EASY","language":["English"],"media":[{"id":"domain_49076","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344146.mp3","asset_id":"domain_49076"},{"id":"domain_49077","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344483.mp3","asset_id":"domain_49077"},{"id":"domain_49078","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344867.mp3","asset_id":"domain_49078"},{"id":"domain_49079","type":"audio","src":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576345_1463576345199.mp3","asset_id":"domain_49079"}],"type":"mcq","title":"हिंदी में सवाल है जो बहुत लंबा है","createdOn":"2016-05-18T12:59:05.435+0000","objectType":"AssessmentItem","feedback":"","gradeLevel":["Grade 1"],"options":[{"marks":"1","value":{"type":"mixed","text":"option1","count":"","image":null,"audio":"domain_49076"},"score":1,"answer":true},{"marks":"0","value":{"type":"mixed","text":"option2","count":"","image":null,"audio":"domain_49077"}},{"marks":"0","value":{"type":"mixed","text":"option3","count":"","image":null,"audio":"domain_49078"}},{"marks":"0","value":{"type":"mixed","text":"option4","count":"","image":null,"audio":"domain_49079"}}],"lastUpdatedOn":"2016-09-01T18:49:51.276+0000","used_for":"worksheet","model":null,"owner":"345","identifier":"domain_49080","question":"lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo","createdBy":"345","graph_id":"domain","nodeType":"DATA_NODE","max_score":1,"name":"हिंदी में सवाल है जो बहुत लंबा है","template_id":"domain_49060","node_id":47341,"es_metadata_id":"domain_49080"}]},"item_sets":[{"count":1,"id":"domain_49080"}],"title":"d","shuffle":false,"showImmediateFeedback":true,"myQuestions":false,"concepts":"(0) Concepts","total_items":1,"max_score":1,"range":[1]}}',
        },
        config: {
          __cdata: '{"type":"items","var":"item"}',
          media: {
            keyboard: {
              assetId: "domain_49025_keyboard",
              id: "keyboard",
              src: "/assets/public/content/1463562666028CustomKeyboard.js",
              type: "plugin",
              preload: "true",
              plugin: "org.ekstep.quiz",
              ver: "1.0",
            },
            keyboard_css: {
              assetId: "domain_49025_keyboard_css",
              id: "keyboard_css",
              src: "/assets/public/content/1463562665758keyboard.css",
              type: "css",
              preload: "true",
              plugin: "org.ekstep.quiz",
              ver: "1.0",
            },
          },
        },
      };
      ecEditor.dispatchEvent(quiz.create, obj);
    });
    it("When Element Template data is array", function () {
      var templateArray = [
        {
          manifest: "",
          controller: { id: "assessment", name: "assessment", type: "items" },
          template: [
            '[{"manifest":"","controller":{"id":"assessment","name":"assessment","type":"items"},"template":{"text":[{"align":"center","color":"black","font":"Verdana","fontsize":50,"model":"item.title","valign":"middle","w":80,"x":10,"y":10},{"align":"center","color":"black","font":"Verdana","fontsize":60,"model":"item.question","valign":"middle","w":80,"x":10,"y":20}],"shape":{"event":{"action":{"asset_model":"item.question_audio","command":"play","type":"command"},"type":"click"},"h":10,"hitArea":true,"id":"retry","type":"rect","visible":true,"w":80,"x":10,"y":17},"image":{"h":30,"model":"item.question_image","x":35,"y":27},"mcq":{"options":{"image":{"h":75,"model":"option.value.image","x":20,"y":0},"text":{"align":"center","font":"Georgia","fontsize":350,"h":10,"model":"option.value.text","w":100,"weight":"bold","x":0,"y":75},"event":{"action":{"asset_model":"option.value.audio","command":"play","type":"command"},"type":"click"},"cols":5,"h":40,"layout":"table","marginX":5,"marginY":5,"options":"options","w":80,"x":10,"y":60},"model":"item","multi_select":false},"id":"org.ekstep.mcq.ia_ta.tia10"},"stage":{"embed":{"template":"item","var-item":"item"},"h":100,"id":"stage1","iterate":"assessment","var":"item","w":100,"x":0,"y":0},"id":"theme","ver":0.2}]',
            "test",
          ],
          stage: {
            embed: { template: "item", "var-item": "item" },
            h: 100,
            id: "stage1",
            iterate: "assessment",
            var: "item",
            w: 100,
            x: 0,
            y: 0,
          },
          id: "theme",
          ver: 0.2,
        },
      ];
      quizProto.getTemplateData(templateArray);
    });
  });
  describe("Quiz question configuration", function () {
    describe("question edit", function () {
      it("Removing of the particualr question", function () {
        var question = {
          template: "org.ekstep.mtf.mixed.horizontal",
          code: "org.ekstep.assessmentitem.literacy_575578c63e74d",
          qlevel: "EASY",
          language: ["English"],
          media: [
            {
              id: "domain_62745",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219264_1465219265016.mp3",
              asset_id: "domain_62745",
              preload: "true",
            },
            {
              id: "domain_62746",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219265_1465219265451.mp3",
              asset_id: "domain_62746",
              preload: "true",
            },
            {
              id: "domain_62747",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219265_1465219265905.mp3",
              asset_id: "domain_62747",
              preload: "true",
            },
            {
              id: "domain_62748",
              type: "image",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/icon_next_345_1465219266_1465219266362.png",
              asset_id: "domain_62748",
              preload: "true",
            },
            {
              id: "domain_62749",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219266_1465219266766.mp3",
              asset_id: "domain_62749",
              preload: "true",
            },
            {
              id: "domain_62750",
              type: "image",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/micro_345_1465219266_1465219267120.png",
              asset_id: "domain_62750",
              preload: "true",
            },
            {
              id: "domain_62751",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219267_1465219267482.mp3",
              asset_id: "domain_62751",
              preload: "true",
            },
            {
              id: "domain_62752",
              type: "image",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/icon_next_345_1465219267_1465219267936.png",
              asset_id: "domain_62752",
              preload: "true",
            },
            {
              id: "domain_62753",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219268_1465219268301.mp3",
              asset_id: "domain_62753",
              preload: "true",
            },
            {
              id: "domain_62754",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219268_1465219268700.mp3",
              asset_id: "domain_62754",
              preload: "true",
            },
            {
              id: "domain_62755",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219268_1465219269091.mp3",
              asset_id: "domain_62755",
              preload: "true",
            },
            {
              id: "domain_62756",
              type: "image",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/micro_345_1465219269_1465219269536.png",
              asset_id: "domain_62756",
              preload: "true",
            },
            {
              id: "domain_62757",
              type: "audio",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219269_1465219269981.mp3",
              asset_id: "domain_62757",
              preload: "true",
            },
          ],
          type: "mtf",
          title: "zontal",
          createdOn: "2016-06-06T13:21:10.249+0000",
          objectType: "AssessmentItem",
          feedback: "",
          gradeLevel: ["Grade 1"],
          lastUpdatedOn: "2016-09-01T18:50:00.051+0000",
          used_for: "worksheet",
          model: null,
          rhs_options: [
            {
              value: {
                type: "mixed",
                text: "",
                count: "",
                image: "domain_62752",
                audio: "domain_62753",
              },
              answer: 0,
            },
            {
              value: {
                type: "mixed",
                text: "C",
                count: "",
                image: null,
                audio: "domain_62754",
              },
              answer: 1,
            },
            {
              value: {
                type: "mixed",
                text: "D",
                count: "",
                image: null,
                audio: "domain_62755",
              },
              answer: 2,
            },
            {
              value: {
                type: "mixed",
                text: "",
                count: "",
                image: "domain_62756",
                audio: "domain_62757",
              },
              answer: 3,
            },
          ],
          owner: "345",
          identifier: "domain_62758",
          question: "zontal zontal",
          portalOwner: "345",
          graph_id: "domain",
          nodeType: "DATA_NODE",
          lhs_options: [
            {
              value: {
                type: "mixed",
                text: "A",
                count: "",
                image: null,
                audio: "domain_62746",
              },
              index: 0,
            },
            {
              value: {
                type: "mixed",
                text: "B",
                count: "",
                image: null,
                audio: "domain_62747",
              },
              index: 1,
            },
            {
              value: {
                type: "mixed",
                text: "",
                count: "",
                image: "domain_62748",
                audio: "domain_62749",
              },
              index: 2,
            },
            {
              value: {
                type: "mixed",
                text: "",
                count: "",
                image: "domain_62750",
                audio: "domain_62751",
              },
              index: 3,
            },
          ],
          max_score: 1,
          name: "zontal",
          template_id: "domain_62743",
          node_id: 60954,
          question_audio: "domain_62745",
          es_metadata_id: "domain_62758",
          isSelected: true,
          $$hashKey: "object:261",
        };
        ctrl.removeItem(question);
        var isItemavailable = _.filter(ctrl.cart.items, question);
        expect(isItemavailable.length).toBe(0);
      });

      it("Updating score to each question", function () {
        var question = [
          {
            template: "org.ekstep.mtf.mixed.horizontal",
            code: "org.ekstep.assessmentitem.literacy_575578c63e74d",
            qlevel: "EASY",
            language: ["English"],
            media: [
              {
                id: "domain_62745",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219264_1465219265016.mp3",
                asset_id: "domain_62745",
                preload: "true",
              },
              {
                id: "domain_62746",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219265_1465219265451.mp3",
                asset_id: "domain_62746",
                preload: "true",
              },
              {
                id: "domain_62747",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219265_1465219265905.mp3",
                asset_id: "domain_62747",
                preload: "true",
              },
              {
                id: "domain_62748",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/icon_next_345_1465219266_1465219266362.png",
                asset_id: "domain_62748",
                preload: "true",
              },
              {
                id: "domain_62749",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219266_1465219266766.mp3",
                asset_id: "domain_62749",
                preload: "true",
              },
              {
                id: "domain_62750",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/micro_345_1465219266_1465219267120.png",
                asset_id: "domain_62750",
                preload: "true",
              },
              {
                id: "domain_62751",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219267_1465219267482.mp3",
                asset_id: "domain_62751",
                preload: "true",
              },
              {
                id: "domain_62752",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/icon_next_345_1465219267_1465219267936.png",
                asset_id: "domain_62752",
                preload: "true",
              },
              {
                id: "domain_62753",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219268_1465219268301.mp3",
                asset_id: "domain_62753",
                preload: "true",
              },
              {
                id: "domain_62754",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219268_1465219268700.mp3",
                asset_id: "domain_62754",
                preload: "true",
              },
              {
                id: "domain_62755",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1465219268_1465219269091.mp3",
                asset_id: "domain_62755",
                preload: "true",
              },
              {
                id: "domain_62756",
                type: "image",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/micro_345_1465219269_1465219269536.png",
                asset_id: "domain_62756",
                preload: "true",
              },
              {
                id: "domain_62757",
                type: "audio",
                src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1465219269_1465219269981.mp3",
                asset_id: "domain_62757",
                preload: "true",
              },
            ],
            type: "mtf",
            title: "zontal",
            createdOn: "2016-06-06T13:21:10.249+0000",
            objectType: "AssessmentItem",
            feedback: "",
            gradeLevel: ["Grade 1"],
            lastUpdatedOn: "2016-09-01T18:50:00.051+0000",
            used_for: "worksheet",
            model: null,
            rhs_options: [
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62752",
                  audio: "domain_62753",
                },
                answer: 0,
              },
              {
                value: {
                  type: "mixed",
                  text: "C",
                  count: "",
                  image: null,
                  audio: "domain_62754",
                },
                answer: 1,
              },
              {
                value: {
                  type: "mixed",
                  text: "D",
                  count: "",
                  image: null,
                  audio: "domain_62755",
                },
                answer: 2,
              },
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62756",
                  audio: "domain_62757",
                },
                answer: 3,
              },
            ],
            owner: "345",
            identifier: "domain_62758",
            question: "zontal zontal",
            portalOwner: "345",
            graph_id: "domain",
            nodeType: "DATA_NODE",
            lhs_options: [
              {
                value: {
                  type: "mixed",
                  text: "A",
                  count: "",
                  image: null,
                  audio: "domain_62746",
                },
                index: 0,
              },
              {
                value: {
                  type: "mixed",
                  text: "B",
                  count: "",
                  image: null,
                  audio: "domain_62747",
                },
                index: 1,
              },
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62748",
                  audio: "domain_62749",
                },
                index: 2,
              },
              {
                value: {
                  type: "mixed",
                  text: "",
                  count: "",
                  image: "domain_62750",
                  audio: "domain_62751",
                },
                index: 3,
              },
            ],
            max_score: 1,
            name: "zontal",
            template_id: "domain_62743",
            node_id: 60954,
            question_audio: "domain_62745",
            es_metadata_id: "domain_62758",
            isSelected: true,
            $$hashKey: "object:261",
          },
        ];
        var index = 0;
        ctrl.handleQuestionScoreConfig(index, question);
        expect(ctrl.currentQuestion).not.toBe(undefined);
      });

      it("update score when option having more", function () {
        var options = [
          {
            marks: "1",
            value: {
              type: "mixed",
              text: "text",
              count: "",
              image: "",
              audio: "domain_44737",
            },
            score: 1,
            answer: true,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "with",
              count: "",
              image: "",
              audio: "domain_44738",
            },
            score: 1,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "audio",
              count: "",
              image: "",
              audio: "domain_44739",
            },
            score: 1,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "file",
              count: "",
              image: "",
              audio: "domain_44740",
            },
            score: 1,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "hello",
              count: "",
              image: null,
              audio: "domain_44744",
            },
            score: 1,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "helo",
              count: "",
              image: null,
              audio: "domain_44745",
            },
            score: 1,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "enter",
              count: "",
              image: null,
              audio: "domain_44746",
            },
            score: 1,
          },
          {
            marks: "0",
            value: {
              type: "mixed",
              text: "answer",
              count: "",
              image: null,
              audio: "domain_44747",
            },
            score: 1,
          },
        ];
        ctrl.distributedScore(options, 4);
        jQuery.each(options, function (index, val) {
          if (!_.isUndefined(val) || !_.isEmpty(val)) {
            expect(val.score).not.toBeGreaterThan(1);
            expect(val.score).not.toBe(undefined);
          }
        });
      });

      it("Loading of the questions onclick of the config", function () {
        ctrl.loadSelectedQuestions();
        expect(ctrl.activityOptions).not.toBe(undefined);
      });

      it("enable question config", function () {
        ctrl.showQuestionConfig();
        expect(ctrl.enableQuestionConfig).toBe(true);
      });
      xit("sort of the question", function () {
        $scope.sortableOptions.update();
      });
    });
    describe("Quiz plugin log Telemetry ", function () {
      it("Valid data", function () {
        var data = { type: "click", subtype: "preview", target: "question" };
        ctrl.generateTelemetry(data);
      });
      it("undefined data", function () {
        var data = undefined;
        ctrl.generateTelemetry(data);
      });
      it("invalid data", function () {
        var data = { drag: "yes", preview: "yes" };
        ctrl.generateTelemetry(data);
      });
    });
    describe("quiz preview question", function () {
      xit("on model open", function () {
        spyOn($scope, "$on");
        $scope.$emit("ngDialog.opened");
        expect($scope.$on).toHaveBeenCalled();
        $scope.on("ngDialog.opened");
      });
      it("Preview of the question", function () {
        var question = {
          owner: "346",
          template: "org.ekstep.mcq.ia_ta.tia10",
          identifier: "domain_44140",
          code: "org.ekstep.assessmentitem.numeracy_5729b6da54e20",
          question: "123",
          qlevel: "EASY",
          portalOwner: "346",
          language: ["English"],
          type: "mcq",
          title: "सही संख्या की तीलियाँ चुनें",
          graph_id: "domain",
          nodeType: "DATA_NODE",
          createdOn: "2016-05-04T08:46:18.351+0000",
          objectType: "AssessmentItem",
          feedback: "",
          gradeLevel: ["Grade 1"],
          max_score: 1,
          options: [
            {
              marks: "1",
              value: {
                type: "mixed",
                text: "12",
                count: "",
                image: null,
                audio: null,
              },
              score: 1,
              answer: true,
            },
            {
              marks: "0",
              value: {
                type: "mixed",
                text: "21",
                count: "",
                image: null,
                audio: null,
              },
            },
          ],
          name: "सही संख्या की तीलियाँ चुनें",
          lastUpdatedOn: "2016-09-01T18:49:45.662+0000",
          used_for: "worksheet",
          template_id: "domain_43151",
          model: null,
          node_id: 42529,
          es_metadata_id: "domain_44140",
          isSelected: true,
          $$hashKey: "object:741",
        };
        ctrl.previewItem(question);
        expect(ctrl.enableQuestionConfig).toBe(false);
      });

      it("Quiz prview util", function () {
        ecEditor.getCurrentObject().media = {
          id: "domain_39703",
          type: "image",
          src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1461218304_1461218302364.jpg",
          asset_id: "domain_39703",
          preload: "true",
        };
        var templateData = [
          {
            text: {
              align: "center",
              color: "black",
              font: "Verdana",
              fontsize: 70,
              model: "item.title",
              w: 80,
              x: 10,
              y: 6,
            },
            shape: {
              event: {
                action: {
                  asset_model: "item.question_audio",
                  command: "play",
                  type: "command",
                },
                type: "click",
              },
              h: 15,
              hitArea: true,
              id: "retry",
              type: "rect",
              visible: true,
              w: 80,
              x: 10,
              y: 2,
            },
            image: [
              { asset: "targetImage", h: 20, w: 50, x: 10, y: 17 },
              { asset: "targetImage", h: 20, w: 50, x: 10, y: 37 },
              { asset: "targetImage", h: 20, w: 50, x: 10, y: 57 },
              { asset: "targetImage", h: 20, w: 50, x: 10, y: 77 },
            ],
            mtf: {
              option: [
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  h: 15.5,
                  option: "lhs_options[0]",
                  snapX: 180,
                  snapY: 0,
                  w: 10,
                  x: 15,
                  y: 20,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  h: 15.5,
                  option: "lhs_options[1]",
                  snapX: 180,
                  snapY: 0,
                  w: 10,
                  x: 15,
                  y: 40,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  h: 15.5,
                  option: "lhs_options[2]",
                  snapX: 180,
                  snapY: 0,
                  w: 10,
                  x: 15,
                  y: 60,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  h: 15.5,
                  option: "lhs_options[3]",
                  snapX: 180,
                  snapY: 0,
                  w: 10,
                  x: 15,
                  y: 80,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  event: {
                    action: {
                      "asset-model": "option.value.audio",
                      command: "play",
                      type: "command",
                    },
                    type: "click",
                  },
                  h: 15.5,
                  option: "rhs_options[0]",
                  w: 10,
                  x: 70,
                  y: 20,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  event: {
                    action: {
                      "asset-model": "option.value.audio",
                      command: "play",
                      type: "command",
                    },
                    type: "click",
                  },
                  h: 15.5,
                  option: "rhs_options[1]",
                  w: 10,
                  x: 70,
                  y: 40,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  event: {
                    action: {
                      "asset-model": "option.value.audio",
                      command: "play",
                      type: "command",
                    },
                    type: "click",
                  },
                  h: 15.5,
                  option: "rhs_options[2]",
                  w: 10,
                  x: 70,
                  y: 60,
                },
                {
                  text: {
                    align: "center",
                    font: "Georgia",
                    fontsize: 700,
                    h: 15.5,
                    model: "option.value.asset",
                    w: 10,
                    weight: "bold",
                    x: 35,
                    y: 0,
                  },
                  event: {
                    action: {
                      "asset-model": "option.value.audio",
                      command: "play",
                      type: "command",
                    },
                    type: "click",
                  },
                  h: 15.5,
                  option: "rhs_options[3]",
                  w: 10,
                  x: 70,
                  y: 80,
                },
              ],
              force: false,
              model: "item",
            },
            id: "org.ekstep.mtf.text.text",
          },
        ];
        var item = {
          template: "org.ekstep.mtf.text.text",
          code: "org.ekstep.assessmentitem.literacy_57186c0162b62",
          qlevel: "EASY",
          language: ["English"],
          media: [
            {
              id: "domain_39703",
              type: "image",
              src: "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/_345_1461218304_1461218302364.jpg",
              asset_id: "domain_39703",
              preload: "true",
            },
            { id: null, type: "audio", src: null, asset_id: null },
          ],
          type: "mtf",
          title: "zenfone",
          createdOn: "2016-04-21T05:58:22.646+0000",
          objectType: "AssessmentItem",
          feedback: "",
          gradeLevel: ["Grade 1"],
          lastUpdatedOn: "2016-09-01T18:49:37.570+0000",
          used_for: "worksheet",
          model: {},
          rhs_options: [
            { value: { type: "text", asset: "b" }, answer: "1" },
            { value: { type: "text", asset: "a" }, answer: "0" },
            { value: { type: "text", asset: "d" }, answer: "3" },
            { value: { type: "text", asset: "c" }, answer: "2" },
          ],
          owner: "345",
          identifier: "domain_39704",
          question: "match the following words",
          portalOwner: "345",
          graph_id: "domain",
          nodeType: "DATA_NODE",
          lhs_options: [
            { value: { type: "text", asset: "A" }, index: 0 },
            { value: { type: "text", asset: "B" }, index: 1 },
            { value: { type: "text", asset: "C" }, index: 2 },
            { value: { type: "text", asset: "D" }, index: 3 },
          ],
          max_score: 1,
          name: "zenfone",
          template_id: "domain_37699",
          node_id: 38136,
          question_image: "domain_39703",
          es_metadata_id: "domain_39704",
          isSelected: true,
          $$hashKey: "object:1062",
        };
        quizBrowserUtil.getQuestionPreviwContent(templateData, item);
      });
    });
    describe("Close config windo", function () {
      it("done editing", function () {
        $scope.closeThisDialog = jasmine.createSpy();
        ctrl.doneConfig();
        expect($scope.closeThisDialog).toHaveBeenCalled();
      });
    });
  });
});
