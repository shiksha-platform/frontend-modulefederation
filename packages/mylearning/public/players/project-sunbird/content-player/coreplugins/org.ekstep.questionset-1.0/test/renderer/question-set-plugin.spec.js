describe('org.ekstep.questionset', function() {
  var questionSetPlugin, data, question, quizQuestion;
  _constants = {
    questionPluginId: 'org.ekstep.question',
    qsElement: '#questionset',
    qsPopup: 'qs-feedback-model-popup',
    questionsetCSS: {
      width: '100%',
      position: 'absolute',
      top: '2%',
      left: 0,
      height: '100%'
    },
    feedbackCSS: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      'z-index': 999999,
      top: 0,
      display: 'none'
    },
    qsPrefix: 'qs',
    qsQuizPlugin: 'org.ekstep.questionset.quiz'
  };

  beforeEach(function() {
    data = {
      "x": 9,
      "y": 6,
      "w": 80,
      "h": 85,
      "rotate": 0,
      "z-index": -1,
      "id": "c5e08126-5ab9-488c-b0dc-70a8250a3235",
      "org.ekstep.question": [{
        "id": "0a11ac6d-e801-425a-bd02-a43dea315dc9",
        "type": "ftb",
        "pluginId": "org.ekstep.questionunit.ftb",
        "pluginVer": "1.0",
        "templateId": "ftbtemplate",
        "data": {
          "__cdata": "{\"question\":{\"text\":\"<p>ಮರದ ಎತ್ತರ ಮತ್ತು [[ಬಲವಾಗಿರುತ್ತದೆ]]</p>\\n\",\"image\":\"\",\"audio\":\"\",\"keyboardConfig\":{\"keyboardType\":\"Custom\",\"customKeys\":\"ಬ,ಲ,ವಾ,ಗಿ,ರು,ತ್ತ,ದೆ\"}},\"answer\":[\"ಬಲವಾಗಿರುತ್ತದೆ\"],\"parsedQuestion\":{\"text\":\"<p>ಮರದ ಎತ್ತರ ಮತ್ತು <input type=\\\"text\\\" class=\\\"ans-field\\\" id=\\\"ans-field1\\\" readonly style=\\\"cursor: pointer;\\\"></p>\\n\",\"image\":\"\",\"audio\":\"\"}}"
        },
        "config": {
          "__cdata": "{\"metadata\":{\"category\":\"FTB\",\"title\":\"ಮರದ ಎತ್ತರ ಮತ್ತು ____\\n\",\"language\":[\"English\"],\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"concepts\":[{\"identifier\":\"AI33\",\"name\":\"Perceptron\"}],\"description\":\"test\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false}"
        },
        "w": 80,
        "h": 85,
        "x": 9,
        "y": 6
      }, {
        "id": "514d0902-1566-453b-b6ee-6a263d2209b9",
        "type": "mtf",
        "pluginId": "org.ekstep.questionset.quiz",
        "pluginVer": "1.0",
        "templateId": "horizontalMCQ",
        "data": {
          "__cdata": "{\"questionnaire\":{\"items\":{\"do_1124686987616337921196\":[{\"itemType\":\"UNIT\",\"code\":\"org.ekstep.assessmentitem.literacy_5ab8c2e2436f7\",\"subject\":\"domain\",\"qlevel\":\"EASY\",\"channel\":\"in.ekstep\",\"description\":\"\",\"language\":[\"English\"],\"type\":\"mtf\",\"title\":\"v1 sorting template\",\"createdOn\":\"2018-03-26T09:52:34.300+0000\",\"gradeLevel\":[\"KG\"],\"appId\":\"ekstep_portal\",\"lastUpdatedOn\":\"2018-03-26T09:52:34.300+0000\",\"used_for\":\"worksheet\",\"rhs_options\":[{\"value\":{\"type\":\"mixed\",\"text\":\"lion\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"lion\",\"resindex\":0},\"answer\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"tiger\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"tiger\",\"resindex\":1},\"answer\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"Apple\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Apple\",\"resindex\":2},\"answer\":1},{\"value\":{\"type\":\"mixed\",\"text\":\"Mango\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Mango\",\"resindex\":3},\"answer\":1}],\"lastUpdatedBy\":\"597\",\"identifier\":\"do_1124686987616337921196\",\"question\":\"v1 sorting template\",\"consumerId\":\"f6878ac4-e9c9-4bc4-80be-298c5a73b447\",\"version\":1,\"versionKey\":\"1522057954300\",\"framework\":\"NCF\",\"lhs_options\":[{\"value\":{\"type\":\"mixed\",\"text\":\"Animals\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Animals\",\"resindex\":0},\"index\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"Fruits\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Fruits\",\"resindex\":1},\"index\":1}],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\",\"objectType\":\"Concept\",\"relation\":\"associatedTo\",\"description\":null,\"index\":null,\"status\":null,\"depth\":null,\"mimeType\":null,\"visibility\":null,\"compatibilityLevel\":null}],\"createdBy\":\"597\",\"max_score\":3,\"domain\":[\"literacy\"],\"name\":\"v1 sorting template\",\"template_id\":\"do_11239003529361817611\",\"category\":\"MCQ\",\"status\":\"Live\",\"isSelected\":true,\"$$hashKey\":\"object:1178\",\"template\":\"org.ekstep.mtf.sorting\"}]},\"item_sets\":[{\"count\":1,\"id\":\"do_1124686987616337921196\"}],\"title\":\"test\",\"max_score\":3,\"allow_skip\":true,\"show_feedback\":true,\"shuffle_questions\":false,\"shuffle_options\":false,\"total_items\":1,\"btn_edit\":\"Edit\"},\"template\":[{\"text\":{\"event\":{\"action\":[{\"asset_model\":\"item.question_audio\",\"sound\":true,\"type\":\"command\",\"command\":\"stop\"},{\"asset_model\":\"item.question_audio\",\"type\":\"command\",\"command\":\"play\"}],\"type\":\"click\"},\"color\":\"#4c4c4c\",\"w\":100,\"x\":0,\"fontsize\":\"3vw\",\"y\":10,\"lineHeight\":1.4,\"model\":\"item.question\",\"valign\":\"top\",\"align\":\"center\"},\"shape\":{\"event\":{\"action\":[{\"asset_model\":\"item.question_audio\",\"sound\":true,\"type\":\"command\",\"command\":\"stop\"},{\"asset_model\":\"item.question_audio\",\"type\":\"command\",\"command\":\"play\"}],\"type\":\"click\"},\"hitArea\":true,\"w\":100,\"h\":25,\"x\":0,\"y\":10},\"mtf\":{\"sorting\":{\"shape\":[{\"w\":100,\"h\":100,\"x\":0,\"y\":0,\"type\":\"rect\",\"stroke\":\"#4c4c4c\"},{\"w\":100,\"h\":0.5,\"x\":0,\"y\":18,\"fill\":\"#4c4c4c\",\"type\":\"rect\"}],\"text\":{\"z-index\":1,\"color\":\"#4c4c4c\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"3vw\",\"y\":5,\"model\":\"option.value.text\",\"valign\":\"top\",\"align\":\"center\"},\"snapX\":15,\"snapY\":16.5,\"h\":54,\"multiple\":true,\"marginX\":2,\"marginY\":2,\"layout\":\"table\",\"w\":100,\"options\":\"lhs_options\",\"x\":0,\"y\":28,\"cols\":4},\"sorts\":[{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":0,\"y\":84,\"option\":\"rhs_options[0]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":16.5,\"y\":84,\"option\":\"rhs_options[1]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":33,\"y\":84,\"option\":\"rhs_options[2]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":49.5,\"y\":84,\"option\":\"rhs_options[3]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":66,\"y\":84,\"option\":\"rhs_options[4]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":82.5,\"y\":84,\"option\":\"rhs_options[5]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":0,\"y\":96,\"option\":\"rhs_options[6]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":16.5,\"y\":96,\"option\":\"rhs_options[7]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":33,\"y\":96,\"option\":\"rhs_options[8]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":49.5,\"y\":96,\"option\":\"rhs_options[9]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":66,\"y\":96,\"option\":\"rhs_options[10]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":82.5,\"y\":96,\"option\":\"rhs_options[11]\"}],\"force\":false,\"model\":\"item\"},\"id\":\"org.ekstep.mtf.sorting\"}]}"
        },
        "config": {
          "__cdata": "{\"type\":\"items\",\"var\":\"item\"}"
        },
        "w": 80,
        "h": 85,
        "x": 9,
        "y": 6
      }],
      "data": {
        "__cdata": "[{\"template\":[{\"text\":{\"event\":{\"action\":[{\"asset_model\":\"item.question_audio\",\"sound\":true,\"type\":\"command\",\"command\":\"stop\"},{\"asset_model\":\"item.question_audio\",\"type\":\"command\",\"command\":\"play\"}],\"type\":\"click\"},\"color\":\"#4c4c4c\",\"w\":100,\"x\":0,\"fontsize\":\"3vw\",\"y\":10,\"lineHeight\":1.4,\"model\":\"item.question\",\"valign\":\"top\",\"align\":\"center\"},\"shape\":{\"event\":{\"action\":[{\"asset_model\":\"item.question_audio\",\"sound\":true,\"type\":\"command\",\"command\":\"stop\"},{\"asset_model\":\"item.question_audio\",\"type\":\"command\",\"command\":\"play\"}],\"type\":\"click\"},\"hitArea\":true,\"w\":100,\"h\":25,\"x\":0,\"y\":10},\"mtf\":{\"sorting\":{\"shape\":[{\"w\":100,\"h\":100,\"x\":0,\"y\":0,\"type\":\"rect\",\"stroke\":\"#4c4c4c\"},{\"w\":100,\"h\":0.5,\"x\":0,\"y\":18,\"fill\":\"#4c4c4c\",\"type\":\"rect\"}],\"text\":{\"z-index\":1,\"color\":\"#4c4c4c\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"3vw\",\"y\":5,\"model\":\"option.value.text\",\"valign\":\"top\",\"align\":\"center\"},\"snapX\":15,\"snapY\":16.5,\"h\":54,\"multiple\":true,\"marginX\":2,\"marginY\":2,\"layout\":\"table\",\"w\":100,\"options\":\"lhs_options\",\"x\":0,\"y\":28,\"cols\":4},\"sorts\":[{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":0,\"y\":84,\"option\":\"rhs_options[0]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":16.5,\"y\":84,\"option\":\"rhs_options[1]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":33,\"y\":84,\"option\":\"rhs_options[2]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":49.5,\"y\":84,\"option\":\"rhs_options[3]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":66,\"y\":84,\"option\":\"rhs_options[4]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":82.5,\"y\":84,\"option\":\"rhs_options[5]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":0,\"y\":96,\"option\":\"rhs_options[6]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":16.5,\"y\":96,\"option\":\"rhs_options[7]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":33,\"y\":96,\"option\":\"rhs_options[8]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":49.5,\"y\":96,\"option\":\"rhs_options[9]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":66,\"y\":96,\"option\":\"rhs_options[10]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":82.5,\"y\":96,\"option\":\"rhs_options[11]\"}],\"force\":false,\"model\":\"item\"},\"id\":\"org.ekstep.mtf.sorting\"}],\"itemType\":\"UNIT\",\"code\":\"org.ekstep.assessmentitem.literacy_5ab8c2e2436f7\",\"subject\":\"domain\",\"qlevel\":\"EASY\",\"channel\":\"in.ekstep\",\"description\":\"\",\"language\":[\"English\"],\"type\":\"mtf\",\"title\":\"v1 sorting template\",\"createdOn\":\"2018-03-26T09:52:34.300+0000\",\"gradeLevel\":[\"KG\"],\"appId\":\"ekstep_portal\",\"lastUpdatedOn\":\"2018-03-26T09:52:34.300+0000\",\"used_for\":\"worksheet\",\"rhs_options\":[{\"value\":{\"type\":\"mixed\",\"text\":\"lion\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"lion\",\"resindex\":0},\"answer\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"tiger\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"tiger\",\"resindex\":1},\"answer\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"Apple\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Apple\",\"resindex\":2},\"answer\":1},{\"value\":{\"type\":\"mixed\",\"text\":\"Mango\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Mango\",\"resindex\":3},\"answer\":1}],\"lastUpdatedBy\":\"597\",\"identifier\":\"do_1124686987616337921196\",\"question\":\"v1 sorting template\",\"consumerId\":\"f6878ac4-e9c9-4bc4-80be-298c5a73b447\",\"version\":1,\"versionKey\":\"1522057954300\",\"framework\":\"NCF\",\"lhs_options\":[{\"value\":{\"type\":\"mixed\",\"text\":\"Animals\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Animals\",\"resindex\":0},\"index\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"Fruits\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Fruits\",\"resindex\":1},\"index\":1}],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\",\"objectType\":\"Concept\",\"relation\":\"associatedTo\",\"description\":null,\"index\":null,\"status\":null,\"depth\":null,\"mimeType\":null,\"visibility\":null,\"compatibilityLevel\":null}],\"createdBy\":\"597\",\"max_score\":3,\"domain\":[\"literacy\"],\"name\":\"v1 sorting template\",\"template_id\":\"do_11239003529361817611\",\"category\":\"MCQ\",\"status\":\"Live\",\"isSelected\":true,\"$$hashKey\":\"object:1178\",\"mediamanifest\":{\"media\":[{\"src\":\"https://dev.ekstep.in/assets/public/content/do_11239003529361817611/assets/1512455481602/esl.png\",\"id\":\"esl\",\"type\":\"image\"},{\"src\":\"https://dev.ekstep.in/assets/public/content/do_11239003529361817611/assets/1512455481606/cat.png\",\"id\":\"cat\",\"type\":\"image\"},{\"src\":\"https://dev.ekstep.in/assets/public/content/do_11239003529361817611/assets/1512455481611/home.png\",\"id\":\"home\",\"type\":\"image\"},{\"src\":\"https://dev.ekstep.in/assets/public/content/do_11239003529361817611/assets/1512455481615/sortingdata.js\",\"id\":\"sorting\",\"type\":\"plugin\",\"plugin\":\"org.ekstep.questionset\",\"ver\":\"1.0\"},{\"src\":\"https://dev.ekstep.in/assets/public/content/do_11239003529361817611/assets/1512455481624/sort.js\",\"id\":\"sorts\",\"type\":\"plugin\",\"plugin\":\"org.ekstep.questionset\",\"ver\":\"1.0\"}]}}]"
      },
      "config": {
        "__cdata": "{\"title\":\"test\",\"max_score\":3,\"allow_skip\":true,\"show_feedback\":false,\"shuffle_questions\":false,\"shuffle_options\":false,\"total_items\":1,\"btn_edit\":\"Edit\"}"
      },
      "pluginType": "org.ekstep.questionset",
      "font": "NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam"
    };

    quizQuestion = {
      "id": "58e1b52e-90b6-4035-b226-00a197305e86",
      "type": "mtf",
      "pluginId": "org.ekstep.questionset.quiz",
      "pluginVer": "1.0",
      "templateId": "horizontalMCQ",
      "data": {
        "__cdata": "{\"questionnaire\":{\"items\":{\"do_1124686987616337921196\":[{\"itemType\":\"UNIT\",\"code\":\"org.ekstep.assessmentitem.literacy_5ab8c2e2436f7\",\"subject\":\"domain\",\"qlevel\":\"EASY\",\"channel\":\"in.ekstep\",\"description\":\"\",\"language\":[\"English\"],\"type\":\"mtf\",\"title\":\"v1 sorting template\",\"createdOn\":\"2018-03-26T09:52:34.300+0000\",\"gradeLevel\":[\"KG\"],\"appId\":\"ekstep_portal\",\"lastUpdatedOn\":\"2018-03-26T09:52:34.300+0000\",\"used_for\":\"worksheet\",\"rhs_options\":[{\"value\":{\"type\":\"mixed\",\"text\":\"lion\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"lion\",\"resindex\":0},\"answer\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"tiger\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"tiger\",\"resindex\":1},\"answer\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"Apple\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Apple\",\"resindex\":2},\"answer\":1},{\"value\":{\"type\":\"mixed\",\"text\":\"Mango\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Mango\",\"resindex\":3},\"answer\":1}],\"lastUpdatedBy\":\"597\",\"identifier\":\"do_1124686987616337921196\",\"question\":\"v1 sorting template\",\"consumerId\":\"f6878ac4-e9c9-4bc4-80be-298c5a73b447\",\"version\":1,\"versionKey\":\"1522057954300\",\"framework\":\"NCF\",\"lhs_options\":[{\"value\":{\"type\":\"mixed\",\"text\":\"Animals\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Animals\",\"resindex\":0},\"index\":0},{\"value\":{\"type\":\"mixed\",\"text\":\"Fruits\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"Fruits\",\"resindex\":1},\"index\":1}],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\",\"objectType\":\"Concept\",\"relation\":\"associatedTo\",\"description\":null,\"index\":null,\"status\":null,\"depth\":null,\"mimeType\":null,\"visibility\":null,\"compatibilityLevel\":null}],\"createdBy\":\"597\",\"max_score\":3,\"domain\":[\"literacy\"],\"name\":\"v1 sorting template\",\"template_id\":\"do_11239003529361817611\",\"category\":\"MCQ\",\"status\":\"Live\",\"isSelected\":true,\"$$hashKey\":\"object:1178\",\"template\":\"org.ekstep.mtf.sorting\"}]},\"item_sets\":[{\"count\":1,\"id\":\"do_1124686987616337921196\"}],\"title\":\"test\",\"max_score\":3,\"allow_skip\":true,\"show_feedback\":true,\"shuffle_questions\":false,\"shuffle_options\":false,\"total_items\":1,\"btn_edit\":\"Edit\"},\"template\":[{\"text\":{\"event\":{\"action\":[{\"asset_model\":\"item.question_audio\",\"sound\":true,\"type\":\"command\",\"command\":\"stop\"},{\"asset_model\":\"item.question_audio\",\"type\":\"command\",\"command\":\"play\"}],\"type\":\"click\"},\"color\":\"#4c4c4c\",\"w\":100,\"x\":0,\"fontsize\":\"3vw\",\"y\":10,\"lineHeight\":1.4,\"model\":\"item.question\",\"valign\":\"top\",\"align\":\"center\"},\"shape\":{\"event\":{\"action\":[{\"asset_model\":\"item.question_audio\",\"sound\":true,\"type\":\"command\",\"command\":\"stop\"},{\"asset_model\":\"item.question_audio\",\"type\":\"command\",\"command\":\"play\"}],\"type\":\"click\"},\"hitArea\":true,\"w\":100,\"h\":25,\"x\":0,\"y\":10},\"mtf\":{\"sorting\":{\"shape\":[{\"w\":100,\"h\":100,\"x\":0,\"y\":0,\"type\":\"rect\",\"stroke\":\"#4c4c4c\"},{\"w\":100,\"h\":0.5,\"x\":0,\"y\":18,\"fill\":\"#4c4c4c\",\"type\":\"rect\"}],\"text\":{\"z-index\":1,\"color\":\"#4c4c4c\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"3vw\",\"y\":5,\"model\":\"option.value.text\",\"valign\":\"top\",\"align\":\"center\"},\"snapX\":15,\"snapY\":16.5,\"h\":54,\"multiple\":true,\"marginX\":2,\"marginY\":2,\"layout\":\"table\",\"w\":100,\"options\":\"lhs_options\",\"x\":0,\"y\":28,\"cols\":4},\"sorts\":[{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":0,\"y\":84,\"option\":\"rhs_options[0]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":16.5,\"y\":84,\"option\":\"rhs_options[1]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":33,\"y\":84,\"option\":\"rhs_options[2]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":49.5,\"y\":84,\"option\":\"rhs_options[3]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":66,\"y\":84,\"option\":\"rhs_options[4]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":82.5,\"y\":84,\"option\":\"rhs_options[5]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":0,\"y\":96,\"option\":\"rhs_options[6]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":16.5,\"y\":96,\"option\":\"rhs_options[7]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":33,\"y\":96,\"option\":\"rhs_options[8]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":49.5,\"y\":96,\"option\":\"rhs_options[9]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":66,\"y\":96,\"option\":\"rhs_options[10]\"},{\"text\":{\"color\":\"blue\",\"w\":100,\"h\":100,\"x\":0,\"fontsize\":\"2.3vw\",\"y\":0,\"model\":\"option.value.text\",\"valign\":\"middle\",\"align\":\"center\"},\"g\":{\"image\":{\"w\":100,\"x\":0,\"y\":0,\"model\":\"option.value.image\",\"align\":\"center\"},\"w\":100,\"h\":70,\"x\":0,\"y\":15},\"w\":15,\"h\":12,\"x\":82.5,\"y\":96,\"option\":\"rhs_options[11]\"}],\"force\":false,\"model\":\"item\"},\"id\":\"org.ekstep.mtf.sorting\"}]}"
      },
      "config": {
        "__cdata": "{\"type\":\"items\",\"var\":\"item\"}"
      },
      "w": 80,
      "h": 85,
      "x": 9,
      "y": 6
    };

    question = {
      "id": "0a11ac6d-e801-425a-bd02-a43dea315dc9",
      "type": "ftb",
      "pluginId": "org.ekstep.questionunit.ftb",
      "pluginVer": "1.0",
      "templateId": "ftbtemplate",
      "data": {
        "__cdata": "{\"question\":{\"text\":\"<p>ಮರದ ಎತ್ತರ ಮತ್ತು [[ಬಲವಾಗಿರುತ್ತದೆ]]</p>\\n\",\"image\":\"\",\"audio\":\"\",\"keyboardConfig\":{\"keyboardType\":\"Custom\",\"customKeys\":\"ಬ,ಲ,ವಾ,ಗಿ,ರು,ತ್ತ,ದೆ\"}},\"answer\":[\"ಬಲವಾಗಿರುತ್ತದೆ\"],\"parsedQuestion\":{\"text\":\"<p>ಮರದ ಎತ್ತರ ಮತ್ತು <input type=\\\"text\\\" class=\\\"ans-field\\\" id=\\\"ans-field1\\\" readonly style=\\\"cursor: pointer;\\\"></p>\\n\",\"image\":\"\",\"audio\":\"\"}}"
      },
      "config": {
        "__cdata": "{\"metadata\":{\"category\":\"FTB\",\"title\":\"ಮರದ ಎತ್ತರ ಮತ್ತು ____\\n\",\"language\":[\"English\"],\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"concepts\":[{\"identifier\":\"AI33\",\"name\":\"Perceptron\"}],\"description\":\"test\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false}"
      },
      "w": 80,
      "h": 85,
      "x": 9,
      "y": 6
    }




    questionSetPlugin = new org.ekstep.questionsetRenderer(data, Renderer.theme._currentScene, Renderer.theme._currentScene, Renderer.theme);


    questionSetPlugin._data = data;
    questionSetPlugin._questionStates = {
      "0a11ac6d-e801-425a-bd02-a43dea315dc9": {
        val: ""
      }
    }
    spyOn(questionSetPlugin, 'loadTemplateContainer');
    spyOn(questionSetPlugin, 'saveQuestionSetState');
    spyOn(questionSetPlugin, 'setRendered');
    spyOn(EkstepRendererAPI, 'dispatchEvent');
    spyOn(questionSetPlugin, 'renderNextQuestion');
    spyOn(QSFeedbackPopup, 'showGoodJob');
    spyOn(QSFeedbackPopup, 'showTryAgain');
    spyOn(questionSetPlugin, 'nextQuestion').and.callThrough();
    spyOn(questionSetPlugin, 'prevQuestion').and.callThrough();
    spyOn(questionSetPlugin, 'renderPrevQuestion');
    spyOn(questionSetPlugin, 'getPrevQuestion');
    spyOn(TelemetryService, 'navigate');
    spyOn(questionSetPlugin, 'generateNavigateTelemetry').and.callThrough();
    var themeObj = Renderer.theme;
    spyOn(jQuery.fn, "remove");
    spyOn(themeObj, 'setParam');
    spyOn($.fn, "append");

  });

  describe("init plugin", function() {
    it('should call loadTemplateContainer', function() {

      questionSetPlugin.initPlugin(data);
      expect(questionSetPlugin.loadTemplateContainer).toHaveBeenCalled();
    });
    it('should call saveQuestionSetState', function() {

      questionSetPlugin.initPlugin(data);
      expect(questionSetPlugin.saveQuestionSetState).toHaveBeenCalled();
    });


  });

  describe("render Question", function() {
    it('should call setRendered', function() {

      questionSetPlugin.renderQuestion(question);
      expect(questionSetPlugin.setRendered).toHaveBeenCalled();
    });
  });

  describe("set rendered", function() {
    it('should set renderedquestions', function() {

      questionSetPlugin.setRendered(quizQuestion);
      expect(questionSetPlugin._renderedQuestions).not.toBe(undefined);
    });

  });

  describe("end Of QuestionSet", function() {
    it('should set return true', function() {
      questionSetPlugin._renderedQuestions.push(question);
      var res = questionSetPlugin.endOfQuestionSet();
      expect(res).toBe(true);
    });
  });

  describe("next Question", function() {
    it('should call renderNextQuestion', function() {
      questionSetPlugin._displayedPopup = true;
      questionSetPlugin.nextQuestion();
      expect(questionSetPlugin.renderNextQuestion).toHaveBeenCalled();
    });
  });

  describe("display Feedback", function() {
    it('should call showGoodJob', function() {
      questionSetPlugin._displayedPopup = true;
      var result = {
        "eval": true,
        "pass": true
      }
      questionSetPlugin.displayFeedback(result);
      expect(QSFeedbackPopup.showGoodJob).toHaveBeenCalled();
    });
  });
  describe("display Feedback", function() {
    it('should call showTryAgain', function() {
      questionSetPlugin._displayedPopup = true;
      var result = {
        "eval": false,
        "pass": false
      }
      questionSetPlugin.displayFeedback(result);
      expect(QSFeedbackPopup.showTryAgain).toHaveBeenCalled();
    });
  });
  describe("prevQuestion", function() {
    it('should call renderPrevQuestion', function() {
      questionSetPlugin.prevQuestion();
      expect(questionSetPlugin.renderPrevQuestion).toHaveBeenCalled();
    });
  });

  describe("getPrevQuestion", function() {
    it('should return a value', function() {
      var res = questionSetPlugin.getPrevQuestion();
      expect(res).toBe(undefined);
    });
  });

  describe("getRenderedIndex", function() {
    it('should return index', function() {
      var res = questionSetPlugin.getRenderedIndex();
      expect(res).toBe(0);
    });
  });

  describe("resetQS", function() {
    it('should dispatch event', function() {
      questionSetPlugin.resetQS();
      expect(EkstepRendererAPI.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe("getQuestionState", function() {
    it('should return question state', function() {
      var res = questionSetPlugin.getQuestionState('0a11ac6d-e801-425a-bd02-a43dea315dc9');
      expect(res).not.toBe(undefined);
    });
  });

  describe("resetTemplates", function() {
    it('should call jQuery remove function', function() {
      questionSetPlugin.resetTemplates();
      expect(jQuery.fn.remove).toHaveBeenCalled();
    });
  });



  describe("generateNavigateTelemetry", function() {
    it('should return index', function() {
      questionSetPlugin.generateNavigateTelemetry();
      expect(TelemetryService.navigate).toHaveBeenCalled();
    });
  });


  describe("handleNext", function() {
    it('should call showTryAgain', function() {
      questionSetPlugin.handleNext();
      expect(questionSetPlugin.nextQuestion).toHaveBeenCalled();
    });
  });

  describe("handlePrevious", function() {
    it('should call showTryAgain', function() {
      questionSetPlugin.handlePrevious();
      expect(questionSetPlugin.prevQuestion).toHaveBeenCalled();
    });
  });


});