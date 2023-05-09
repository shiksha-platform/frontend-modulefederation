describe("EditorPlugin", function () {
  var plugin,
    fabricGroup,
    v1Data,
    v2Data,
    v2Data1,
    ApiResponse,
    stage,
    newData,
    config,
    multiData,
    originalTimeout,
    ecmlObj;
  beforeAll(function (done) {
    ContentEditorTestFramework.init(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
      stage = ecEditor.instantiatePlugin("org.ekstep.stage");
      config = ecEditor.instantiatePlugin("org.ekstep.config");
      plugin = ecEditor.instantiatePlugin("org.ekstep.questionset");
      ecmlObj = ecEditor.instantiatePlugin("org.ekstep.viewecml");
      done();
    });
  });

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(function () {
    v2Data = [
      {
        template: "NA",
        itemType: "UNIT",
        code: "NA",
        subject: "domain",
        qlevel: "EASY",
        channel: "in.ekstep",
        description: "test",
        language: ["English"],
        type: "mcq",
        title: "test image and audio for the image",
        body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.0","templateId":"horizontalMCQ"},"data":{"question":{"text":"test image and audio for the image","image":"/assets/public/content/2_1466487176189.jpg","audio":"","hint":""},"options":[{"text":"test1","image":"","audio":"/assets/public/content/145503359952511.mp3","hint":"","isCorrect":true,"$$hashKey":"object:3278"},{"text":"test2","image":"/assets/public/content/2_1466487176189.jpg","audio":"","hint":"","isCorrect":false,"$$hashKey":"object:3279"}],"media":[{"id":566752436,"src":"/assets/public/content/2_1466487176189.jpg","assetId":"do_20072814","type":"image","preload":false},{"id":576331075,"src":"/assets/public/content/2_1466487176189.jpg","assetId":"do_20072814","type":"image","preload":false},{"id":94711675,"src":"/assets/public/content/145503359952511.mp3","assetId":"11_sound","type":"audio","preload":false}]},"config":{"metadata":{"category":"MCQ","title":"test image and audio for the image","language":["English"],"qlevel":"EASY","gradeLevel":["Kindergarten"],"concepts":["BIO3"],"description":"test","max_score":1},"max_time":0,"max_score":1,"partial_scoring":false,"layout":"Horizontal","isShuffleOption":false},"media":[{"id":566752436,"src":"/assets/public/content/2_1466487176189.jpg","assetId":"do_20072814","type":"image","preload":false},{"id":576331075,"src":"/assets/public/content/2_1466487176189.jpg","assetId":"do_20072814","type":"image","preload":false},{"id":94711675,"src":"/assets/public/content/145503359952511.mp3","assetId":"11_sound","type":"audio","preload":false}]}}',
        createdOn: "2018-03-23T10:15:24.824+0000",
        gradeLevel: ["Grade 1"],
        appId: "ekstep_portal",
        options: [
          {
            answer: true,
            value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
          },
        ],
        lastUpdatedOn: "2018-03-23T10:15:24.824+0000",
        identifier: "do_112466586622558208121",
        question: "test image and audio for the image",
        consumerId: "f6878ac4-e9c9-4bc4-80be-298c5a73b447",
        version: 2,
        versionKey: "1521800124824",
        createdBy: "580",
        max_score: 1,
        name: "test image and audio for the image",
        template_id: "NA",
        category: "MCQ",
        status: "Live",
        $$hashKey: "object:2719",
        isSelected: true,
      },
    ];
    v2Data1 = [
      {
        body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.0","templateId":"horizontalMCQ"},"data":{"question":{"text":"test image and audio for the image","image":"/assets/public/content/2_1466487176189.jpg","audio":"","hint":""},"options":[{"text":"test1","image":"","audio":"/assets/public/content/145503359952511.mp3","hint":"","isCorrect":true,"},{"text":"test2","image":"/assets/public/content/2_1466487176189.jpg","audio":"","hint":"","isCorrect":false,"}]},"config":{"metadata":{"category":"MCQ","title":"test image and audio for the image","language":["English"],"qlevel":"EASY","gradeLevel":["Kindergarten"],"concepts":["BIO3"],"description":"test","max_score":1},"max_time":0,"max_score":1,"partial_scoring":false,"layout":"Horizontal","isShuffleOption":false},"}}',
        createdOn: "2018-03-23T10:15:24.824+0000",
        gradeLevel: ["Grade 1"],
        appId: "ekstep_portal",
        options: [
          {
            answer: true,
            value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
          },
        ],
        identifier: "do_112466586622558208121",
        question: "test",
        consumerId: "f6878ac4-e9c9-4bc4-80be-298c5a73b447",
        version: 2,
        versionKey: "1521800124824",
        createdBy: "580",
        max_score: 1,
        name: "test image and audio for the image",
        template_id: "NA",
        category: "MCQ",
        isSelected: true,
      },
    ];
    v1Data = [
      {
        template: [
          {
            text: {
              event: {
                action: [
                  {
                    asset_model: "item.question_audio",
                    sound: true,
                    type: "command",
                    command: "stop",
                  },
                  {
                    asset_model: "item.question_audio",
                    type: "command",
                    command: "play",
                  },
                ],
                type: "click",
              },
              color: "#4c4c4c",
              w: 100,
              h: 15,
              x: 0,
              fontsize: "3vw",
              y: 10,
              lineHeight: 1.4,
              model: "item.question",
              valign: "top",
              align: "center",
            },
            shape: {
              event: {
                action: [
                  {
                    asset_model: "item.question_audio",
                    sound: true,
                    type: "command",
                    command: "stop",
                  },
                  {
                    asset_model: "item.question_audio",
                    type: "command",
                    command: "play",
                  },
                ],
                type: "click",
              },
              hitArea: true,
              w: 100,
              h: 24,
              x: 0,
              y: 10,
              type: "rect",
            },
            g: [
              {
                placeholder: [
                  {
                    "model-count": "item.optionCount1",
                    w: 30,
                    h: 100,
                    x: 0,
                    y: 0,
                    valign: "middle",
                    align: "center",
                    type: "gridLayout",
                    "model-asset": "item.question_image",
                  },
                  {
                    "model-count": "item.optionCount2",
                    w: 30,
                    h: 100,
                    x: 40,
                    y: 0,
                    valign: "middle",
                    align: "center",
                    type: "gridLayout",
                    "model-asset": "item.question_image",
                  },
                ],
                text: [
                  {
                    color: "#4c4c4c",
                    w: 5,
                    h: 0,
                    x: 32,
                    fontsize: "3vw",
                    y: 55,
                    model: "item.operator1",
                    valign: "middle",
                    align: "center",
                  },
                  {
                    color: "#4c4c4c",
                    w: 5,
                    h: 0,
                    x: 72,
                    fontsize: "3vw",
                    y: 55,
                    model: "item.operator2",
                    valign: "middle",
                    align: "center",
                  },
                  {
                    "z-index": 30,
                    color: "#4c4c4c",
                    w: 20,
                    h: 40,
                    x: 80,
                    fontsize: "3vw",
                    y: 38,
                    model: "item.ans1",
                    valign: "middle",
                    id: "newText1",
                    align: "center",
                  },
                ],
                g: {
                  shape: {
                    w: 100,
                    h: 100,
                    x: 0,
                    y: 0,
                    "stroke-width": 3,
                    fill: "#FFFFA5",
                    type: "roundrect",
                    stroke: "#719ECE",
                  },
                  "z-index": 20,
                  w: 20,
                  h: 40,
                  x: 80,
                  y: 34,
                  id: "textshape1",
                },
                w: 100,
                h: 32,
                x: 0,
                y: 33,
              },
              {
                nkeyboard: {
                  keys: "item.keys",
                  w: 100,
                  h: 25,
                  limit: 7,
                  x: 0,
                  y: 82,
                  id: "bKeyboard",
                  type: "custom",
                  target: "newText1",
                },
                w: 100,
                h: 100,
                x: 0,
                y: 0,
              },
            ],
            id: "Operations_with_images",
          },
        ],
        itemType: "UNIT",
        code: "org.ekstep.assessmentitem.literacy_5abb516b8f224",
        subject: "domain",
        qlevel: "EASY",
        channel: "in.ekstep",
        description: "",
        language: ["English"],
        media: [
          {
            id: "do_11246090113921843213",
            type: "image",
            src: "https://dev.ekstep.in/assets/public/content/do_11246090113921843213/artifact/ae36d87ad0aa9438984018205a9c0fa0_1521106096238.jpeg",
            asset_id: "do_11246090113921843213",
          },
        ],
        type: "ftb",
        title: "v1 - operations with images",
        createdOn: "2018-03-28T08:25:15.611+0000",
        gradeLevel: ["Kindergarten"],
        appId: "ekstep_portal",
        question_image: "do_11246090113921843213",
        lastUpdatedOn: "2018-03-28T08:25:15.611+0000",
        used_for: "worksheet",
        model: {
          optionCount1: "4",
          optionCount2: "3",
          operator1: "-",
          operator2: "=",
          keys: "0,1,2,3,4,5,6,7,8,9,+,-,×,÷,=,<,>,/,.",
        },
        lastUpdatedBy: "597",
        identifier: "do_112470071423893504143",
        question: "v1 - operations with images",
        consumerId: "f6878ac4-e9c9-4bc4-80be-298c5a73b447",
        version: 1,
        versionKey: "1522225515611",
        answer: { ans1: { value: "1", score: 1 } },
        concepts: [
          {
            identifier: "LO4",
            name: "Understanding of Grammar/Syntax",
            objectType: "Concept",
            relation: "associatedTo",
            description: null,
            index: null,
            status: null,
            depth: null,
            mimeType: null,
            visibility: null,
            compatibilityLevel: null,
          },
        ],
        createdBy: "597",
        max_score: 1,
        domain: ["literacy"],
        name: "v1 - operations with images",
        template_id: "do_112470023566245888128",
        category: "MCQ",
        status: "Live",
        isSelected: true,
        mediamanifest: {
          media: [
            {
              id: "do_11246090113921843213",
              type: "image",
              src: "https://dev.ekstep.in/assets/public/content/do_11246090113921843213/artifact/ae36d87ad0aa9438984018205a9c0fa0_1521106096238.jpeg",
              asset_id: "do_11246090113921843213",
            },
            {
              src: "https://dev.ekstep.in/assets/public/content/do_112470023566245888128/assets/1522219674003/customnumkeyboard.js",
              id: "nkeyboard",
              type: "plugin",
              plugin: "org.ekstep.questionset",
              ver: "1.0",
            },
            {
              src: "https://dev.ekstep.in/assets/public/content/do_112470023566245888128/assets/1522219674010/numerickeyboard.css",
              id: "keyboard_css",
              type: "css",
              plugin: "org.ekstep.questionset",
              ver: "1.0",
            },
          ],
        },
      },
    ];
    v1DataQuestion = {
      questionnaire: {
        items: {
          do_112470071423893504143: [
            {
              itemType: "UNIT",
              code: "org.ekstep.assessmentitem.literacy_5abb516b8f224",
              subject: "domain",
              qlevel: "EASY",
              channel: "in.ekstep",
              description: "",
              language: ["English"],
              media: [
                {
                  id: "do_11246090113921843213",
                  type: "image",
                  src: "https://dev.ekstep.in/assets/public/content/do_11246090113921843213/artifact/ae36d87ad0aa9438984018205a9c0fa0_1521106096238.jpeg",
                  asset_id: "do_11246090113921843213",
                },
              ],
              type: "ftb",
              title: "v1 - operations with images",
              createdOn: "2018-03-28T08:25:15.611+0000",
              gradeLevel: ["Kindergarten"],
              appId: "ekstep_portal",
              question_image: "do_11246090113921843213",
              lastUpdatedOn: "2018-03-28T08:25:15.611+0000",
              used_for: "worksheet",
              model: {
                optionCount1: "4",
                optionCount2: "3",
                operator1: "-",
                operator2: "=",
                keys: "0,1,2,3,4,5,6,7,8,9,+,-,×,÷,=,<,>,/,.",
              },
              lastUpdatedBy: "597",
              identifier: "do_112470071423893504143",
              question: "v1 - operations with images",
              consumerId: "f6878ac4-e9c9-4bc4-80be-298c5a73b447",
              version: 1,
              versionKey: "1522225515611",
              answer: { ans1: { value: "1", score: 1 } },
              concepts: [
                {
                  identifier: "LO4",
                  name: "Understanding of Grammar/Syntax",
                  objectType: "Concept",
                  relation: "associatedTo",
                  description: null,
                  index: null,
                  status: null,
                  depth: null,
                  mimeType: null,
                  visibility: null,
                  compatibilityLevel: null,
                },
              ],
              createdBy: "597",
              max_score: 1,
              domain: ["literacy"],
              name: "v1 - operations with images",
              template_id: "do_112470023566245888128",
              category: "MCQ",
              status: "Live",
              isSelected: true,
              template: "Operations_with_images",
            },
          ],
        },
        item_sets: [{ count: 1, id: "do_112470071423893504143" }],
        title: "test",
        max_score: 1,
        allow_skip: true,
        show_feedback: true,
        shuffle_questions: false,
        shuffle_options: false,
        total_items: 1,
        btn_edit: "Edit",
      },
      template: [
        {
          text: {
            event: {
              action: [
                {
                  asset_model: "item.question_audio",
                  sound: true,
                  type: "command",
                  command: "stop",
                },
                {
                  asset_model: "item.question_audio",
                  type: "command",
                  command: "play",
                },
              ],
              type: "click",
            },
            color: "#4c4c4c",
            w: 100,
            h: 15,
            x: 0,
            fontsize: "3vw",
            y: 10,
            lineHeight: 1.4,
            model: "item.question",
            valign: "top",
            align: "center",
          },
          shape: {
            event: {
              action: [
                {
                  asset_model: "item.question_audio",
                  sound: true,
                  type: "command",
                  command: "stop",
                },
                {
                  asset_model: "item.question_audio",
                  type: "command",
                  command: "play",
                },
              ],
              type: "click",
            },
            hitArea: true,
            w: 100,
            h: 24,
            x: 0,
            y: 10,
            type: "rect",
          },
          g: [
            {
              placeholder: [
                {
                  "model-count": "item.optionCount1",
                  w: 30,
                  h: 100,
                  x: 0,
                  y: 0,
                  valign: "middle",
                  align: "center",
                  type: "gridLayout",
                  "model-asset": "item.question_image",
                },
                {
                  "model-count": "item.optionCount2",
                  w: 30,
                  h: 100,
                  x: 40,
                  y: 0,
                  valign: "middle",
                  align: "center",
                  type: "gridLayout",
                  "model-asset": "item.question_image",
                },
              ],
              text: [
                {
                  color: "#4c4c4c",
                  w: 5,
                  h: 0,
                  x: 32,
                  fontsize: "3vw",
                  y: 55,
                  model: "item.operator1",
                  valign: "middle",
                  align: "center",
                },
                {
                  color: "#4c4c4c",
                  w: 5,
                  h: 0,
                  x: 72,
                  fontsize: "3vw",
                  y: 55,
                  model: "item.operator2",
                  valign: "middle",
                  align: "center",
                },
                {
                  "z-index": 30,
                  color: "#4c4c4c",
                  w: 20,
                  h: 40,
                  x: 80,
                  fontsize: "3vw",
                  y: 38,
                  model: "item.ans1",
                  valign: "middle",
                  id: "newText1",
                  align: "center",
                },
              ],
              g: {
                shape: {
                  w: 100,
                  h: 100,
                  x: 0,
                  y: 0,
                  "stroke-width": 3,
                  fill: "#FFFFA5",
                  type: "roundrect",
                  stroke: "#719ECE",
                },
                "z-index": 20,
                w: 20,
                h: 40,
                x: 80,
                y: 34,
                id: "textshape1",
              },
              w: 100,
              h: 32,
              x: 0,
              y: 33,
            },
            {
              nkeyboard: {
                keys: "item.keys",
                w: 100,
                h: 25,
                limit: 7,
                x: 0,
                y: 82,
                id: "bKeyboard",
                type: "custom",
                target: "newText1",
              },
              w: 100,
              h: 100,
              x: 0,
              y: 0,
            },
          ],
          id: "Operations_with_images",
        },
      ],
    };
    plugin.config = {
      title: "test",
      max_score: 1,
      allow_skip: true,
      show_feedback: true,
      shuffle_questions: false,
      shuffle_options: false,
      total_items: 1,
      btn_edit: "Edit",
    };
    newData = [
      {
        template: "NA",
        templateType: "Horizontal",
        itemType: "UNIT",
        isPartialScore: true,
        code: "NA",
        subject: "domain",
        qlevel: "MEDIUM",
        evalUnordered: false,
        channel: "0126089810590679040",
        language: ["English"],
        title: "gg dfgdfgdfg\n",
        type: "mcq",
        body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.1","templateId":"horizontalMCQ"},"data":{"question":{"text":"<p>gg dfgdfgdfg</p>\\n","image":"","audio":"","audioName":"","hint":""},"options":[{"text":"<p>g</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":true,"$$hashKey":"object:787"},{"text":"<p>t</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":false,"$$hashKey":"object:788"}],"questionCount":0,"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"gg dfgdfgdfg\\n","title":"gg dfgdfgdfg\\n","category":"MCQ"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
        createdOn: "2019-02-19T09:37:39.559+0000",
        isShuffleOption: false,
        appId: "qa.Upgrade-lms.portal",
        options: [
          {
            answer: true,
            value: {
              type: "text",
              asset: "1",
              resvalue: 0,
              resindex: 0,
            },
          },
        ],
        lastUpdatedOn: "2019-02-19T09:37:39.559+0000",
        identifier: "do_21270226173590732811047",
        consumerId: "298450cb-c202-45f0-adee-9224c7612f35",
        version: 2,
        versionKey: "1550569059559",
        framework: "jdf1",
        createdBy: "4f0656c1-df55-4e27-911c-cb79fc1bd611",
        max_score: 1,
        name: "gg dfgdfgdfg\n",
        template_id: "NA",
        category: "MCQ",
        status: "Live",
        isSelected: true,
        $$hashKey: "object:1985",
      },
    ];
    multiData = {
      data: [
        {
          template: "NA",
          templateType: "Horizontal",
          itemType: "UNIT",
          isPartialScore: true,
          code: "NA",
          subject: "domain",
          qlevel: "MEDIUM",
          evalUnordered: false,
          channel: "0125410296672829440",
          language: ["English"],
          title: "Weekend is here.\n",
          type: "mcq",
          body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.1","templateId":"horizontalMCQ"},"data":{"question":{"text":"<p>Weekend is here.</p>\\n","image":"","audio":"","audioName":"","hint":""},"options":[{"text":"<p>Yay</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":true,"$$hashKey":"object:853"},{"text":"<p>Nay</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":false,"$$hashKey":"object:854"}],"questionCount":0,"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"Weekend is here.\\n","title":"Weekend is here.\\n","category":"MCQ"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
          createdOn: "2019-02-22T10:55:46.303+0000",
          isShuffleOption: false,
          appId: "staging.Staging-lms.portal",
          options: [
            {
              answer: true,
              value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
            },
          ],
          lastUpdatedOn: "2019-02-22T10:55:46.303+0000",
          identifier: "do_212704423496122368142",
          consumerId: "298450cb-c202-45f0-adee-9224c7612f35",
          version: 2,
          versionKey: "1550832946303",
          framework: "jdf1",
          createdBy: "7378e45c-0928-4c4a-8a10-9b363246293a",
          max_score: 1,
          name: "Weekend is here.\n",
          template_id: "NA",
          category: "MCQ",
          status: "Live",
          isSelected: true,
          $$hashKey: "object:1995",
        },
        {
          template: "NA",
          templateType: "Horizontal",
          itemType: "UNIT",
          isPartialScore: true,
          code: "NA",
          subject: "domain",
          qlevel: "MEDIUM",
          evalUnordered: false,
          channel: "0126089810590679040",
          language: ["English"],
          title: "gg dfgdfgdfg\n",
          type: "mcq",
          body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.1","templateId":"horizontalMCQ"},"data":{"question":{"text":"<p>gg dfgdfgdfg</p>\\n","image":"","audio":"","audioName":"","hint":""},"options":[{"text":"<p>g</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":true,"$$hashKey":"object:787"},{"text":"<p>t</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":false,"$$hashKey":"object:788"}],"questionCount":0,"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"gg dfgdfgdfg\\n","title":"gg dfgdfgdfg\\n","category":"MCQ"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
          createdOn: "2019-02-19T09:37:39.559+0000",
          isShuffleOption: false,
          appId: "qa.Upgrade-lms.portal",
          options: [
            {
              answer: true,
              value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
            },
          ],
          lastUpdatedOn: "2019-02-19T09:37:39.559+0000",
          identifier: "do_21270226173590732811047",
          consumerId: "298450cb-c202-45f0-adee-9224c7612f35",
          version: 2,
          versionKey: "1550569059559",
          framework: "jdf1",
          createdBy: "4f0656c1-df55-4e27-911c-cb79fc1bd611",
          max_score: 1,
          name: "gg dfgdfgdfg\n",
          template_id: "NA",
          category: "MCQ",
          status: "Live",
          isSelected: true,
          $$hashKey: "object:2007",
        },
      ],
      config: {
        title: "test",
        max_score: 2,
        allow_skip: true,
        show_feedback: true,
        shuffle_questions: false,
        shuffle_options: false,
        total_items: 2,
      },
    };
    plugin.data = newData;
    ImageResponce = {
      type: "image",
      originX: "left",
      originY: "top",
      left: 72,
      top: 12.15,
      width: 785,
      height: 513,
      fill: "rgb(0,0,0)",
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeLineJoin: "miter",
      strokeMiterLimit: 10,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      clipTo: null,
      backgroundColor: "",
      fillRule: "nonzero",
      globalCompositeOperation: "source-over",
      transformMatrix: null,
      skewX: 0,
      skewY: 0,
      src: "http://localhost:9876/base/org.ekstep.questionset-1.0/editor/assets/quizimage.png",
      filters: [],
      resizeFilters: [],
    };
    ApiResponse = {
      data: {
        id: "ekstep.composite-search.search",
        ver: "3.0",
        ts: "2019-02-13T11:07:33ZZ",
        params: {
          resmsgid: "3874b0df-4a71-47af-9998-6c524bba10f9",
          msgid: null,
          err: null,
          status: "successful",
          errmsg: null,
        },
        responseCode: "OK",
        result: {
          count: 5,
          content: [
            {
              identifier: "org.ekstep.questionunit.mcq",
              appIcon:
                "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/org.ekstep.questionunit.mcq/artifact/assetsmcq-horizontal_805_1529387605_1529387605429.thumb.png",
              semanticVersion: "1.1",
              contentType: "Plugin",
              objectType: "Content",
            },
            {
              identifier: "org.ekstep.questionunit.mtf",
              appIcon:
                "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/org.ekstep.questionunit.mtf/artifact/assetsimage-2018-06-08_1_805_1528451134_1528451134793.thumb.png",
              semanticVersion: "1.1",
              contentType: "Plugin",
              objectType: "Content",
            },
            {
              identifier: "org.ekstep.questionunit.ftb",
              appIcon:
                "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/org.ekstep.questionunit.ftb/artifact/assetsimage-2018-06-08_805_1533130614_1533130614398.thumb.png",
              semanticVersion: "1.0",
              contentType: "Plugin",
              objectType: "Content",
            },
            {
              identifier: "org.ekstep.questionunit.reorder",
              appIcon:
                "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/org.ekstep.questionunit.reorder/artifact/assetsreorder-preview_725_1536562584_1536562584692.thumb.png",
              semanticVersion: "1.0",
              contentType: "Plugin",
              objectType: "Content",
            },
            {
              identifier: "org.ekstep.questionunit.sequence",
              appIcon:
                "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/org.ekstep.questionunit.sequence/artifact/assetssequencial-preview_786_1536564290_1536564290560.thumb.png",
              semanticVersion: "1.0",
              contentType: "Plugin",
              objectType: "Content",
            },
          ],
        },
        responseTime: 151,
      },
    };
    plugin.manifest.id = "org.ekstep.questionset";
    plugin.manifest.ver = "1.0";
    spyOn(plugin, "loadQSPlugins").and.callThrough();
    spyOn(plugin, "getplugins").and.callThrough();
    spyOn(plugin, "postInit").and.callThrough();
    spyOn(plugin, "getPropsForEditor").and.callThrough();
    spyOn(plugin, "addMedia").and.callThrough();
    spyOn(plugin, "createEcmlStructureV1").and.callThrough();
    spyOn(plugin, "toECML").and.callThrough();
    spyOn(plugin, "addQS").and.callThrough();
    spyOn(plugin, "openQuestionBank").and.callThrough();
    spyOn(ecEditor, "dispatchEvent").and.callThrough();
    spyOn(plugin, "onConfigChange").and.callThrough();
    spyOn(ecEditor, "render").and.callThrough();
  });

  describe("initialize", function () {
    beforeEach(function () {
      plugin.data = v1Data;
      spyOn(ecEditor, "loadAndInitPlugin").and.callThrough();
      spyOn(plugin, "pluginsRespHandler").and.callThrough();
    });

    it("should load and initialize dependancy plugins when pluginsSearch false", function (done) {
      ecEditor.getService("search").pluginsSearch = undefined;
      ecEditor.getService("search").search = jasmine
        .createSpy()
        .and.callFake(function (data, callBack) {
          callBack(undefined, ApiResponse);
          done();
        });
      plugin.initialize();
      expect(ecEditor.loadAndInitPlugin).toHaveBeenCalled();
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.mcq");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.mtf");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.ftb");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.reorder");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.sequence");
    });
    it("should load and initialize dependancy plugins when pluginsSearch true", function (done) {
      ecEditor.getService("search").pluginsSearch = jasmine
        .createSpy()
        .and.callFake(function (url, data, callBack) {
          callBack(undefined, ApiResponse);
          done();
        });
      plugin.initialize();
      expect(ecEditor.loadAndInitPlugin).toHaveBeenCalled();
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.mcq");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.mtf");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.ftb");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.reorder");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.sequence");
    });

    it("should call loadQSPlugins", function () {
      plugin.initialize();
      plugin.loadQSPlugins();
      expect(plugin.loadQSPlugins).toHaveBeenCalled();
    });

    it("should call getplugins", function (event) {
      plugin.initialize();
      var callback = function () {};
      // plugin.getplugins(event,callback);
      expect(plugin.getplugins).toHaveBeenCalled();
    });

    it("should call pluginsRespHandler", function (done) {
      ecEditor.getService("search").pluginsSearch = jasmine
        .createSpy()
        .and.callFake(function (url, data, callBack) {
          callBack(undefined, ApiResponse);
          done();
        });
      plugin.initialize();
      expect(plugin.pluginsRespHandler).toHaveBeenCalled();
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.mcq");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.mtf");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.ftb");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.reorder");
      expect(
        JSON.stringify(org.ekstep.pluginframework.pluginManager.pluginObjs)
      ).toContain("org.ekstep.questionunit.sequence");
    });
  });

  describe("new instance of questionset", function () {
    beforeEach(function () {
      if (stage.children.length > 0) {
        stage.children = [];
      }
    });

    it("should create new instance add media", function (done) {
      plugin.data = newData;
      var v1NewData = {
        data: {
          data: [
            {
              template: [
                {
                  "org.ekstep.plugins.funtoot.genericitemrenderer": {
                    w: 100,
                    h: 100,
                    x: 0,
                    y: 0,
                    rotate: "",
                    id: "44cce289-b407-4628-9900-8adbb67b2386",
                  },
                  id: "funtoot.template.01",
                },
              ],
              itemType: "UNIT",
              code: "QFIB02230",
              keywords: ["mcq"],
              qtype: "mcq",
              subject: "Mathematics",
              qlevel: "MEDIUM",
              channel: "in.ekstep",
              language: ["English"],
              medium: "English",
              type: "mcq",
              title: "",
              qid: "QFIB02230",
              createdOn: "2018-02-01T06:55:09.970+0000",
              qindex: "",
              question_audio: "",
              gradeLevel: ["Class 5"],
              appId: "ekstep_portal",
              options: [
                {
                  value: {
                    type: "text",
                    asset: "OPT_0",
                    audio: "",
                    count: null,
                    resvalue: 0,
                    resindex: 0,
                  },
                  answer: true,
                  mh: "MH_0",
                  mmc: [],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_1",
                    audio: "",
                    count: null,
                    resvalue: 1,
                    resindex: 1,
                  },
                  answer: false,
                  mh: "MH_1",
                  mmc: ["FC090"],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_2",
                    audio: "",
                    count: null,
                    resvalue: 2,
                    resindex: 2,
                  },
                  answer: false,
                  mh: "MH_2",
                  mmc: ["FC090"],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_3",
                    audio: "",
                    count: null,
                    resvalue: 3,
                    resindex: 3,
                  },
                  answer: false,
                  mh: "MH_3",
                  mmc: ["FC130"],
                },
              ],
              lastUpdatedOn: "2019-02-19T09:26:05.444+0000",
              used_for: "worksheet",
              model: {
                hintMsg: "HINT_ID",
                numericLangId: "en",
                langId: "en",
                variables: [],
                mcqType: 8,
              },
              state: "Verified",
              subLevel: "",
              identifier: "QFIB02230",
              question: "QUESTION_TEXT",
              level: 2,
              consumerId: "ec175d89-64b0-4e23-9f81-076e4d379a8f",
              author: "funtoot",
              portalOwner: "562",
              version: 1,
              i18n: '{"en":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3","HINT_ID":"For addition of like fractions, add the numerators only. Denominator remains the same.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` equals to:","MH_0":"","MH_1":"Add the numerators of all the fractions correctly.","MH_2":"Do not multiply the numerators. Add them.","MH_3":"This is the reciprocal of the answer.","NO_ANSWER":"Click the answer and then press the submit button"},"ta":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","HINT_ID":"ஒத்த பின்னங்களின் கூடுதலானது, தொகுதிகளின் கூடுதல் மட்டுமே.பகுதி மாறாது.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` =","MH_0":"","MH_1":"அனைத்து பின்னங்களின் தொகுதிகளை சரியாக கூட்டவும்","MH_2":"தொகுதிகளை பெருக்காமல் கூட்டவும்","MH_3":"இதுவே தலைகிழ் மதிப்பாகும்.","NO_ANSWER":"தயவுசெய்து பதிலளிக்கவும்","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3\\n"}}',
              versionKey: "1550568365444",
              tags: ["mcq"],
              question_count: 1,
              framework: "NCF",
              answer: {},
              grade: ["5"],
              domain: "Numeracy",
              max_score: 5,
              name: "QFIB02230",
              sublevel: 1,
              num_answers: 1,
              template_id: "do_2125053652669235201268",
              category: "MCQ",
              bloomsTaxonomyLevel: "Understand",
              status: "Live",
              isSelected: true,
              $$hashKey: "object:2661",
              mediamanifest: {
                media: [
                  {
                    id: "9c9bc62c-cc13-4191-bbee-57ec2a4b1dca",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_ctrl.js",
                    type: "js",
                  },
                  {
                    id: "7922b23d-7d68-4d20-a004-1ca223750316",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html",
                    type: "js",
                  },
                  {
                    id: "org.ekstep.navigation",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.navigation_manifest",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "polyglot",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/polyglot.js",
                    type: "js",
                  },
                  {
                    id: "org.ekstep.plugins.i18n",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.i18n_manifest",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "keyboardcss",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard.css",
                    type: "css",
                  },
                  {
                    id: "org.ekstep.plugins.common.keyboard",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard-plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.common.keyboard_manifest",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "generators",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/generators.js",
                    type: "js",
                  },
                  {
                    id: "eraser",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/eraser.png",
                    type: "image",
                  },
                  {
                    id: "seq",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/seq.png",
                    type: "image",
                  },
                  {
                    id: "semitrans",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/semitrans.png",
                    type: "image",
                  },
                  {
                    id: "zoom-in",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/zoom.png",
                    type: "image",
                  },
                  {
                    id: "plus-white",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/plus_white.png",
                    type: "image",
                  },
                  {
                    id: "minus-white",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/minus_white.png",
                    type: "image",
                  },
                  {
                    id: "micro-hint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "micro-hint-mdd",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "html-micro-hint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "drop-down",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/drop-down-icon.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.hint-icon",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/hint.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.solution-icon",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/solimg.png",
                    type: "image",
                  },
                  {
                    id: "close",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/close.png",
                    type: "image",
                  },
                  {
                    id: "submit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/icn_submit.png",
                    type: "image",
                  },
                  {
                    id: "undo",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/undo.png",
                    type: "image",
                  },
                  {
                    id: "clearall",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/clearall.png",
                    type: "image",
                  },
                  {
                    id: "disabledsubmit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/disabled_submit.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.asset.next",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/next.png",
                    type: "image",
                  },
                  {
                    id: "editable",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/editable.png",
                    type: "image",
                  },
                  {
                    id: "nonEditable",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/noneditable.png",
                    type: "image",
                  },
                  {
                    id: "additioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/additioneval.js",
                    type: "js",
                  },
                  {
                    id: "fractioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fractioneval.js",
                    type: "js",
                  },
                  {
                    id: "multiplicationeval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/multiplicationeval.js",
                    type: "js",
                  },
                  {
                    id: "divisioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/divisioneval.js",
                    type: "js",
                  },
                  {
                    id: "clockcontrol",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/clockcontrol.js",
                    type: "plugin",
                  },
                  {
                    id: "numberlineeval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlineeval.js",
                    type: "js",
                  },
                  {
                    id: "mathquill",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.js",
                    type: "js",
                  },
                  {
                    id: "mathjs",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/math.min.js",
                    type: "js",
                  },
                  {
                    id: "mathquill-basic",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.css",
                    type: "css",
                  },
                  {
                    id: "genericmdd",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/genericmdd.css",
                    type: "css",
                  },
                  {
                    id: "zoomableImageStyle",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/zoomableimage.css",
                    type: "css",
                  },
                  {
                    id: "mathtext",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathtext.js",
                    type: "plugin",
                  },
                  {
                    id: "mathedit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathedit.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.ftPlugin",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbaseplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "nkeyboard",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/customnumkeyboard.js",
                    type: "plugin",
                  },
                  {
                    id: "keyboard",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/keyboard-plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "fibblankprocessor",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fibblankprocessor.js",
                    type: "plugin",
                  },
                  {
                    id: "ftbdropdownprocessor",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbdropdownprocessor.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.zoomableImage",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/zoomableimage.js",
                    type: "plugin",
                  },
                  {
                    id: "defaultkeyboardadapter",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/defaultkeyboardadapter.js",
                    type: "plugin",
                  },
                  {
                    id: "ftFib",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfib.js",
                    type: "plugin",
                  },
                  {
                    id: "ftPluginHelper",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpluginhelper.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.grid",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/grid.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.table",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/table.js",
                    type: "plugin",
                  },
                  {
                    id: "keyboard_css",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/numerickeyboard.css",
                    type: "css",
                  },
                  {
                    id: "htmlpopup",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/htmlpopupplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "htmlpopup_css",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/htmlpopup.css",
                    type: "css",
                  },
                  {
                    id: "htmlpopup_js",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/scripts/htmlpopup.js",
                    type: "js",
                  },
                  {
                    id: "ftMicroHint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftmicrohint.js",
                    type: "plugin",
                  },
                  {
                    id: "ftPopup",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpopup.js",
                    type: "plugin",
                  },
                  {
                    id: "ftAttempts",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftattempts.js",
                    type: "plugin",
                  },
                  {
                    id: "inlineFib",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/inlinefib.js",
                    type: "plugin",
                  },
                  {
                    id: "numberlinenumber",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlinenumber.js",
                    type: "plugin",
                  },
                  {
                    id: "numberline",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberline.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.option",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/option.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.optionBuilder",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/optionbuilder.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.common",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfibbaseplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.common_manifest",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.fibwordproblem",
                    plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/renderer/fibwordproblem.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.fibwordproblem_manifest",
                    plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericfib",
                    plugin: "org.ekstep.plugins.funtoot.genericfib",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericfib_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericfib",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmfr",
                    plugin: "org.ekstep.plugins.funtoot.genericmfr",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmfr_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmfr",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmdd",
                    plugin: "org.ekstep.plugins.funtoot.genericmdd",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmdd_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmdd",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmcq",
                    plugin: "org.ekstep.plugins.funtoot.genericmcq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmcq_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmcq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "connector",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/asset/connector.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmtf",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmtf_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericseq",
                    plugin: "org.ekstep.plugins.funtoot.genericseq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericseq_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericseq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericitemrenderer_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/manifest.json",
                    type: "json",
                  },
                ],
              },
            },
          ],
          config: {
            title: "test",
            max_score: 5,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      var data1 = v1NewData.data;
      dataObj = { callback: undefined, data: data1 };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance.media.QuizImage).toBeTruthy();
        var qdata1 = {
          data: data1.data,
          config: { __cdata: JSON.stringify(dataObj.data.config) },
        };
        expect(ecEditor.dispatchEvent).toHaveBeenCalledWith(
          plugin.manifest.id + ":create",
          qdata1
        );
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });
    it("should create new instance with MCQ question", function (done) {
      plugin.data = newData;
      var v1NewData = {
        data: {
          data: [
            {
              template: [
                {
                  "org.ekstep.plugins.funtoot.genericitemrenderer": {
                    w: 100,
                    h: 100,
                    x: 0,
                    y: 0,
                    rotate: "",
                    id: "44cce289-b407-4628-9900-8adbb67b2386",
                  },
                  id: "funtoot.template.01",
                },
              ],
              itemType: "UNIT",
              code: "QFIB02230",
              keywords: ["mcq"],
              qtype: "mcq",
              subject: "Mathematics",
              qlevel: "MEDIUM",
              channel: "in.ekstep",
              language: ["English"],
              medium: "English",
              type: "mcq",
              title: "",
              qid: "QFIB02230",
              createdOn: "2018-02-01T06:55:09.970+0000",
              qindex: "",
              question_audio: "",
              gradeLevel: ["Class 5"],
              appId: "ekstep_portal",
              options: [
                {
                  value: {
                    type: "text",
                    asset: "OPT_0",
                    audio: "",
                    count: null,
                    resvalue: 0,
                    resindex: 0,
                  },
                  answer: true,
                  mh: "MH_0",
                  mmc: [],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_1",
                    audio: "",
                    count: null,
                    resvalue: 1,
                    resindex: 1,
                  },
                  answer: false,
                  mh: "MH_1",
                  mmc: ["FC090"],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_2",
                    audio: "",
                    count: null,
                    resvalue: 2,
                    resindex: 2,
                  },
                  answer: false,
                  mh: "MH_2",
                  mmc: ["FC090"],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_3",
                    audio: "",
                    count: null,
                    resvalue: 3,
                    resindex: 3,
                  },
                  answer: false,
                  mh: "MH_3",
                  mmc: ["FC130"],
                },
              ],
              lastUpdatedOn: "2019-02-19T09:26:05.444+0000",
              used_for: "worksheet",
              model: {
                hintMsg: "HINT_ID",
                numericLangId: "en",
                langId: "en",
                variables: [],
                mcqType: 8,
              },
              state: "Verified",
              subLevel: "",
              identifier: "QFIB02230",
              question: "QUESTION_TEXT",
              level: 2,
              consumerId: "ec175d89-64b0-4e23-9f81-076e4d379a8f",
              author: "funtoot",
              portalOwner: "562",
              version: 1,
              i18n: '{"en":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3","HINT_ID":"For addition of like fractions, add the numerators only. Denominator remains the same.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` equals to:","MH_0":"","MH_1":"Add the numerators of all the fractions correctly.","MH_2":"Do not multiply the numerators. Add them.","MH_3":"This is the reciprocal of the answer.","NO_ANSWER":"Click the answer and then press the submit button"},"ta":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","HINT_ID":"ஒத்த பின்னங்களின் கூடுதலானது, தொகுதிகளின் கூடுதல் மட்டுமே.பகுதி மாறாது.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` =","MH_0":"","MH_1":"அனைத்து பின்னங்களின் தொகுதிகளை சரியாக கூட்டவும்","MH_2":"தொகுதிகளை பெருக்காமல் கூட்டவும்","MH_3":"இதுவே தலைகிழ் மதிப்பாகும்.","NO_ANSWER":"தயவுசெய்து பதிலளிக்கவும்","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3\\n"}}',
              versionKey: "1550568365444",
              tags: ["mcq"],
              question_count: 1,
              framework: "NCF",
              answer: {},
              grade: ["5"],
              domain: "Numeracy",
              max_score: 5,
              name: "QFIB02230",
              sublevel: 1,
              num_answers: 1,
              template_id: "do_2125053652669235201268",
              category: "MCQ",
              bloomsTaxonomyLevel: "Understand",
              status: "Live",
              isSelected: true,
              $$hashKey: "object:2661",
              mediamanifest: {
                media: [
                  {
                    id: "9c9bc62c-cc13-4191-bbee-57ec2a4b1dca",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_ctrl.js",
                    type: "js",
                  },
                  {
                    id: "7922b23d-7d68-4d20-a004-1ca223750316",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html",
                    type: "js",
                  },
                  {
                    id: "org.ekstep.navigation",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.navigation_manifest",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "polyglot",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/polyglot.js",
                    type: "js",
                  },
                  {
                    id: "org.ekstep.plugins.i18n",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.i18n_manifest",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "keyboardcss",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard.css",
                    type: "css",
                  },
                  {
                    id: "org.ekstep.plugins.common.keyboard",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard-plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.common.keyboard_manifest",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "generators",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/generators.js",
                    type: "js",
                  },
                  {
                    id: "eraser",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/eraser.png",
                    type: "image",
                  },
                  {
                    id: "seq",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/seq.png",
                    type: "image",
                  },
                  {
                    id: "semitrans",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/semitrans.png",
                    type: "image",
                  },
                  {
                    id: "zoom-in",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/zoom.png",
                    type: "image",
                  },
                  {
                    id: "plus-white",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/plus_white.png",
                    type: "image",
                  },
                  {
                    id: "minus-white",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/minus_white.png",
                    type: "image",
                  },
                  {
                    id: "micro-hint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "micro-hint-mdd",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "html-micro-hint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "drop-down",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/drop-down-icon.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.hint-icon",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/hint.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.solution-icon",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/solimg.png",
                    type: "image",
                  },
                  {
                    id: "close",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/close.png",
                    type: "image",
                  },
                  {
                    id: "submit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/icn_submit.png",
                    type: "image",
                  },
                  {
                    id: "undo",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/undo.png",
                    type: "image",
                  },
                  {
                    id: "clearall",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/clearall.png",
                    type: "image",
                  },
                  {
                    id: "disabledsubmit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/disabled_submit.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.asset.next",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/next.png",
                    type: "image",
                  },
                  {
                    id: "editable",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/editable.png",
                    type: "image",
                  },
                  {
                    id: "nonEditable",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/noneditable.png",
                    type: "image",
                  },
                  {
                    id: "additioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/additioneval.js",
                    type: "js",
                  },
                  {
                    id: "fractioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fractioneval.js",
                    type: "js",
                  },
                  {
                    id: "multiplicationeval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/multiplicationeval.js",
                    type: "js",
                  },
                  {
                    id: "divisioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/divisioneval.js",
                    type: "js",
                  },
                  {
                    id: "clockcontrol",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/clockcontrol.js",
                    type: "plugin",
                  },
                  {
                    id: "numberlineeval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlineeval.js",
                    type: "js",
                  },
                  {
                    id: "mathquill",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.js",
                    type: "js",
                  },
                  {
                    id: "mathjs",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/math.min.js",
                    type: "js",
                  },
                  {
                    id: "mathquill-basic",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.css",
                    type: "css",
                  },
                  {
                    id: "genericmdd",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/genericmdd.css",
                    type: "css",
                  },
                  {
                    id: "zoomableImageStyle",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/zoomableimage.css",
                    type: "css",
                  },
                  {
                    id: "mathtext",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathtext.js",
                    type: "plugin",
                  },
                  {
                    id: "mathedit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathedit.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.ftPlugin",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbaseplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "nkeyboard",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/customnumkeyboard.js",
                    type: "plugin",
                  },
                  {
                    id: "keyboard",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/keyboard-plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "fibblankprocessor",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fibblankprocessor.js",
                    type: "plugin",
                  },
                  {
                    id: "ftbdropdownprocessor",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbdropdownprocessor.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.zoomableImage",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/zoomableimage.js",
                    type: "plugin",
                  },
                  {
                    id: "defaultkeyboardadapter",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/defaultkeyboardadapter.js",
                    type: "plugin",
                  },
                  {
                    id: "ftFib",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfib.js",
                    type: "plugin",
                  },
                  {
                    id: "ftPluginHelper",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpluginhelper.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.grid",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/grid.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.table",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/table.js",
                    type: "plugin",
                  },
                  {
                    id: "keyboard_css",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/numerickeyboard.css",
                    type: "css",
                  },
                  {
                    id: "htmlpopup",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/htmlpopupplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "htmlpopup_css",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/htmlpopup.css",
                    type: "css",
                  },
                  {
                    id: "htmlpopup_js",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/scripts/htmlpopup.js",
                    type: "js",
                  },
                  {
                    id: "ftMicroHint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftmicrohint.js",
                    type: "plugin",
                  },
                  {
                    id: "ftPopup",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpopup.js",
                    type: "plugin",
                  },
                  {
                    id: "ftAttempts",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftattempts.js",
                    type: "plugin",
                  },
                  {
                    id: "inlineFib",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/inlinefib.js",
                    type: "plugin",
                  },
                  {
                    id: "numberlinenumber",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlinenumber.js",
                    type: "plugin",
                  },
                  {
                    id: "numberline",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberline.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.option",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/option.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.optionBuilder",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/optionbuilder.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.common",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfibbaseplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.common_manifest",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.fibwordproblem",
                    plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/renderer/fibwordproblem.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.fibwordproblem_manifest",
                    plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericfib",
                    plugin: "org.ekstep.plugins.funtoot.genericfib",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericfib_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericfib",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmfr",
                    plugin: "org.ekstep.plugins.funtoot.genericmfr",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmfr_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmfr",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmdd",
                    plugin: "org.ekstep.plugins.funtoot.genericmdd",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmdd_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmdd",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmcq",
                    plugin: "org.ekstep.plugins.funtoot.genericmcq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmcq_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmcq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "connector",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/asset/connector.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmtf",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmtf_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericseq",
                    plugin: "org.ekstep.plugins.funtoot.genericseq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericseq_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericseq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericitemrenderer_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/manifest.json",
                    type: "json",
                  },
                ],
              },
            },
          ],
          config: {
            title: "test",
            max_score: 5,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      var data1 = v1NewData.data;
      dataObj = { callback: undefined, data: data1 };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance._questions[0].qtype).toEqual("mcq");
        done();
      }, 500);
    });
    it("should create new instance with AIS question", function (done) {
      plugin.data = newData;
      var aisData = {
        data: {
          data: [
            {
              template: "NA",
              templateType: "Horizontal",
              isPartialScore: true,
              itemType: "UNIT",
              code: "NA",
              subject: "Mathematics",
              evalUnordered: false,
              qlevel: "EASY",
              channel: "b00bc992ef25f1a9a8d63291e20efc8d",
              language: ["English"],
              medium: "English",
              type: "mcq",
              title: "Test Arrange\n",
              body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.sequence","version":"1.0","templateId":"sequenceTemplate"},"data":{"question":{"text":"<p>Test Arrange</p>\\n","image":"","audio":"","audioName":"","hint":""},"options":[{"text":"Test","image":"","audio":"","audioName":"","hint":"","$$hashKey":"object:3472"},{"text":"Arrange","image":"","audio":"","audioName":"","hint":"","$$hashKey":"object:3473"}],"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"Test Arrange\\n","title":"Test Arrange\\n","medium":"English","topic":[],"qlevel":"EASY","gradeLevel":["Grade 1"],"subject":"Mathematics","board":"NCERT","category":"mcq"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
              createdOn: "2019-03-19T10:19:53.300+0000",
              gradeLevel: ["Grade 1"],
              isShuffleOption: false,
              appId: "dev.sunbird.portal",
              options: [
                {
                  answer: true,
                  value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
                },
              ],
              lastUpdatedOn: "2019-03-19T10:19:53.300+0000",
              identifier: "do_112722100578721792128",
              consumerId: "9393568c-3a56-47dd-a9a3-34da3c821638",
              version: 2,
              versionKey: "1552990793300",
              framework: "NCFCOPY",
              createdBy: "390",
              max_score: 1,
              name: "Test Arrange\n",
              template_id: "NA",
              category: "mcq",
              board: "NCERT",
              status: "Live",
              isSelected: true,
              $$hashKey: "object:4536",
            },
          ],
          config: {
            title: "test",
            max_score: 1,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      var data1 = aisData.data;
      dataObj = { callback: undefined, data: data1 };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance._questions[0].category).toEqual("mcq");
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });
    it("should create new instance with reorder question", function (done) {
      plugin.data = newData;
      var reorderData = {
        data: {
          data: [
            {
              template: "NA",
              templateType: "Horizontal",
              isPartialScore: true,
              itemType: "UNIT",
              code: "NA",
              subject: "English",
              evalUnordered: false,
              qlevel: "EASY",
              channel: "b00bc992ef25f1a9a8d63291e20efc8d",
              language: ["English"],
              medium: "English",
              type: "mcq",
              title: "Test Reordering\n",
              body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.reorder","version":"1.0","templateId":"reorderingtemplate"},"data":{"question":{"text":"<p>Test Reordering</p>\\n"},"sentence":{"text":"Test Reordering","tabs":[{"text":"Test","id":0,"$$hashKey":"object:3249"},{"text":"Reordering","id":1,"$$hashKey":"object:3250"}]}},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"Test Reordering\\n","title":"Test Reordering\\n","qlevel":"EASY","gradeLevel":["Kindergarten","Grade 1"],"topic":[],"subject":"English","medium":"English","board":"NCERT","category":"mcq"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false}}}',
              createdOn: "2019-03-19T10:18:15.567+0000",
              gradeLevel: ["Kindergarten", "Grade 1"],
              isShuffleOption: false,
              appId: "dev.sunbird.portal",
              options: [
                {
                  answer: true,
                  value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
                },
              ],
              lastUpdatedOn: "2019-03-19T10:18:15.567+0000",
              identifier: "do_112722099778093056127",
              consumerId: "9393568c-3a56-47dd-a9a3-34da3c821638",
              version: 2,
              versionKey: "1552990695567",
              framework: "NCFCOPY",
              createdBy: "390",
              max_score: 1,
              name: "Test Reordering\n",
              template_id: "NA",
              category: "mcq",
              board: "NCERT",
              status: "Live",
              isSelected: true,
              $$hashKey: "object:5447",
            },
          ],
          config: {
            title: "test",
            max_score: 1,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      var data1 = reorderData.data;
      dataObj = { callback: undefined, data: data1 };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance._questions[0].category).toEqual("mcq");
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });
    it("should create new instance with FTB question", function (done) {
      plugin.data = newData;
      var ftbData = {
        data: {
          data: [
            {
              template: "NA",
              templateType: "Horizontal",
              isPartialScore: true,
              itemType: "UNIT",
              code: "NA",
              data: '{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"data":{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"data":{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"test____\\n","title":"test____\\n","medium":"English","topic":[],"qlevel":"MEDIUM","gradeLevel":["Grade 1"],"subject":"English","board":"NCERT","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"medium":"English","questionTitle":"test____\\n","qlevel":"MEDIUM","subject":"English","board":"NCERT","gradeLevel":["Grade 1"],"templateType":"Horizontal","isPartialScore":true,"isShuffleOption":false,"evalUnordered":false,"max_score":1,"name":"test____\\n","title":"test____\\n","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"medium":"English","questionTitle":"test____\\n","qlevel":"MEDIUM","subject":"English","board":"NCERT","gradeLevel":["Grade 1"],"templateType":"Horizontal","isPartialScore":true,"isShuffleOption":false,"evalUnordered":false,"max_score":1,"name":"test____\\n","title":"test____\\n","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]}',
              subject: "English",
              evalUnordered: false,
              qlevel: "MEDIUM",
              channel: "b00bc992ef25f1a9a8d63291e20efc8d",
              language: ["English"],
              medium: "English",
              type: "ftb",
              title: "Test FTB____",
              body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"data":{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"data":{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"data":{"plugin":{"id":"org.ekstep.questionunit.ftb","version":"1.0","templateId":"ftbtemplate"},"data":{"question":{"text":"<p>Test FTB[[test]]</p>\\n","image":"","audio":"","audioName":"","keyboardConfig":{"keyboardType":"Device","customKeys":[]}},"answer":["test"],"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"test____\\n","title":"test____\\n","medium":"English","topic":[],"qlevel":"MEDIUM","gradeLevel":["Grade 1"],"subject":"English","board":"NCERT","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"medium":"English","questionTitle":"test____\\n","qlevel":"MEDIUM","subject":"English","board":"NCERT","gradeLevel":["Grade 1"],"templateType":"Horizontal","isPartialScore":true,"isShuffleOption":false,"evalUnordered":false,"max_score":1,"name":"test____\\n","title":"test____\\n","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"medium":"English","questionTitle":"test____\\n","qlevel":"MEDIUM","subject":"English","board":"NCERT","gradeLevel":["Grade 1"],"templateType":"Horizontal","isPartialScore":true,"isShuffleOption":false,"evalUnordered":false,"max_score":1,"name":"test____\\n","title":"test____\\n","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]},"medium":"English","questionTitle":"test____\\n","qlevel":"MEDIUM","subject":"English","board":"NCERT","gradeLevel":["Grade 1"],"templateType":"Horizontal","isPartialScore":true,"isShuffleOption":false,"evalUnordered":false,"max_score":1,"name":"Test FTB____","title":"Test FTB____","category":"FTB"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[{"id":"org.ekstep.keyboard.eras_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/eras_icon.png","assetId":"org.ekstep.keyboard.eras_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.language_icon","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/language_icon.png","assetId":"org.ekstep.keyboard.language_icon","type":"image","preload":true},{"id":"org.ekstep.keyboard.hide_keyboard","src":"/plugins/org.ekstep.keyboard-1.1/renderer/assets/keyboard.svg","assetId":"org.ekstep.keyboard.hide_keyboard","type":"image","preload":true}]}}',
              createdOn: "2019-03-15T09:34:04.643+0000",
              gradeLevel: ["Grade 1"],
              isShuffleOption: false,
              appId: "dev.sunbird.portal",
              lastUpdatedOn: "2019-03-19T09:56:52.017+0000",
              identifier: "do_11271924690653184012",
              questionTitle: "test____\n",
              consumerId: "9393568c-3a56-47dd-a9a3-34da3c821638",
              version: 2,
              versionKey: "1552989412017",
              framework: "NCFCOPY",
              answer: [{ answer: true, value: { type: "text", asset: "1" } }],
              createdBy: "390",
              max_score: 1,
              name: "Test FTB____",
              template_id: "NA",
              category: "FTB",
              board: "NCERT",
              status: "Live",
              $$hashKey: "object:1126",
            },
          ],
          config: {
            title: "test",
            max_score: 1,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      var data1 = ftbData.data;
      dataObj = { callback: undefined, data: data1 };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance._questions[0].type).toEqual("ftb");
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });
    it("should create new instance with mtf question", function (done) {
      plugin.data = newData;
      var mtfData = {
        data: {
          data: [
            {
              template: "NA",
              templateType: "Horizontal",
              isPartialScore: true,
              itemType: "UNIT",
              code: "NA",
              subject: "Mathematics",
              evalUnordered: false,
              qlevel: "EASY",
              channel: "b00bc992ef25f1a9a8d63291e20efc8d",
              language: ["English"],
              medium: "English",
              type: "mtf",
              title: "Test MTF\n",
              body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mtf","version":"1.1","templateId":"horizontalMTF"},"data":{"question":{"text":"<p>Test MTF</p>\\n","image":"","audio":"","audioName":"","hint":""},"option":{"optionsLHS":[{"text":"<p>ans1</p>\\n","image":"","audio":"","audioName":"","hint":"","index":1,"$$hashKey":"object:1144"},{"text":"<p>ans2</p>\\n","image":"","audio":"","audioName":"","hint":"","index":2,"$$hashKey":"object:1145"},{"text":"<p>ans3</p>\\n","image":"","audio":"","audioName":"","hint":"","index":3,"$$hashKey":"object:1146"}],"optionsRHS":[{"text":"<p>ans1</p>\\n","image":"","audio":"","audioName":"","hint":"","mapIndex":1},{"text":"<p>ans2</p>\\n","image":"","audio":"","audioName":"","hint":"","mapIndex":2},{"text":"<p>ans3</p>\\n","image":"","audio":"","audioName":"","hint":"","mapIndex":3}],"questionCount":0},"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"Test MTF\\n","title":"Test MTF\\n","medium":"English","topic":[],"qlevel":"EASY","gradeLevel":["Grade 1"],"subject":"Mathematics","board":"NCERT","category":"MTF"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
              createdOn: "2019-03-19T09:53:56.064+0000",
              gradeLevel: ["Grade 1"],
              isShuffleOption: false,
              appId: "dev.sunbird.portal",
              lastUpdatedOn: "2019-03-19T09:53:56.064+0000",
              rhs_options: [
                {
                  value: {
                    type: "mixed",
                    text: "इक",
                    image: "",
                    count: "",
                    audio: "",
                    resvalue: "इक",
                    resindex: 0,
                  },
                  index: 0,
                },
              ],
              identifier: "do_112722087821852672124",
              consumerId: "9393568c-3a56-47dd-a9a3-34da3c821638",
              version: 2,
              versionKey: "1552989236064",
              lhs_options: [
                {
                  value: {
                    type: "mixed",
                    text: "इक",
                    image: "",
                    count: "",
                    audio: "",
                    resvalue: "इक",
                    resindex: 0,
                  },
                  index: 0,
                },
              ],
              framework: "NCFCOPY",
              createdBy: "390",
              max_score: 1,
              name: "Test MTF\n",
              template_id: "NA",
              category: "MTF",
              board: "NCERT",
              status: "Live",
              $$hashKey: "object:2042",
            },
          ],
          config: {
            title: "test",
            max_score: 1,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      var data1 = mtfData.data;
      dataObj = { callback: undefined, data: data1 };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance._questions[0].type).toEqual("mtf");
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });

    it("Media attribute missing v1 data", function (done) {
      plugin.data = newData;
      var v1NewData = {
        data: {
          data: [
            {
              template: [
                {
                  "org.ekstep.plugins.funtoot.genericitemrenderer": {
                    w: 100,
                    h: 100,
                    x: 0,
                    y: 0,
                    rotate: "",
                    id: "44cce289-b407-4628-9900-8adbb67b2386",
                  },
                  id: "funtoot.template.01",
                },
              ],
              itemType: "UNIT",
              code: "QFIB02230",
              keywords: ["mcq"],
              qtype: "mcq",
              subject: "Mathematics",
              qlevel: "MEDIUM",
              channel: "in.ekstep",
              language: ["English"],
              medium: "English",
              type: "mcq",
              title: "",
              qid: "QFIB02230",
              createdOn: "2018-02-01T06:55:09.970+0000",
              qindex: "",
              question_audio: "",
              gradeLevel: ["Class 5"],
              appId: "ekstep_portal",
              options: [
                {
                  value: {
                    type: "text",
                    asset: "OPT_0",
                    audio: "",
                    count: null,
                    resvalue: 0,
                    resindex: 0,
                  },
                  answer: true,
                  mh: "MH_0",
                  mmc: [],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_1",
                    audio: "",
                    count: null,
                    resvalue: 1,
                    resindex: 1,
                  },
                  answer: false,
                  mh: "MH_1",
                  mmc: ["FC090"],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_2",
                    audio: "",
                    count: null,
                    resvalue: 2,
                    resindex: 2,
                  },
                  answer: false,
                  mh: "MH_2",
                  mmc: ["FC090"],
                },
                {
                  value: {
                    type: "text",
                    asset: "OPT_3",
                    audio: "",
                    count: null,
                    resvalue: 3,
                    resindex: 3,
                  },
                  answer: false,
                  mh: "MH_3",
                  mmc: ["FC130"],
                },
              ],
              lastUpdatedOn: "2019-02-19T09:26:05.444+0000",
              used_for: "worksheet",
              model: {
                hintMsg: "HINT_ID",
                numericLangId: "en",
                langId: "en",
                variables: [],
                mcqType: 8,
              },
              state: "Verified",
              subLevel: "",
              identifier: "QFIB02230",
              question: "QUESTION_TEXT",
              level: 2,
              consumerId: "ec175d89-64b0-4e23-9f81-076e4d379a8f",
              author: "funtoot",
              portalOwner: "562",
              version: 1,
              i18n: '{"en":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3","HINT_ID":"For addition of like fractions, add the numerators only. Denominator remains the same.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` equals to:","MH_0":"","MH_1":"Add the numerators of all the fractions correctly.","MH_2":"Do not multiply the numerators. Add them.","MH_3":"This is the reciprocal of the answer.","NO_ANSWER":"Click the answer and then press the submit button"},"ta":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","HINT_ID":"ஒத்த பின்னங்களின் கூடுதலானது, தொகுதிகளின் கூடுதல் மட்டுமே.பகுதி மாறாது.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` =","MH_0":"","MH_1":"அனைத்து பின்னங்களின் தொகுதிகளை சரியாக கூட்டவும்","MH_2":"தொகுதிகளை பெருக்காமல் கூட்டவும்","MH_3":"இதுவே தலைகிழ் மதிப்பாகும்.","NO_ANSWER":"தயவுசெய்து பதிலளிக்கவும்","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3\\n"}}',
              versionKey: "1550568365444",
              tags: ["mcq"],
              question_count: 1,
              framework: "NCF",
              answer: {},
              grade: ["5"],
              domain: "Numeracy",
              max_score: 5,
              name: "QFIB02230",
              sublevel: 1,
              num_answers: 1,
              template_id: "do_2125053652669235201268",
              category: "MCQ",
              bloomsTaxonomyLevel: "Understand",
              status: "Live",
              isSelected: true,
              $$hashKey: "object:2661",
              testmanifest: {
                testmedia: [
                  {
                    id: "9c9bc62c-cc13-4191-bbee-57ec2a4b1dca",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_ctrl.js",
                    type: "js",
                  },
                  {
                    id: "7922b23d-7d68-4d20-a004-1ca223750316",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html",
                    type: "js",
                  },
                  {
                    id: "org.ekstep.navigation",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.navigation_manifest",
                    plugin: "org.ekstep.navigation",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.navigation-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "polyglot",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/polyglot.js",
                    type: "js",
                  },
                  {
                    id: "org.ekstep.plugins.i18n",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.i18n_manifest",
                    plugin: "org.ekstep.plugins.i18n",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.i18n-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "keyboardcss",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard.css",
                    type: "css",
                  },
                  {
                    id: "org.ekstep.plugins.common.keyboard",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard-plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.common.keyboard_manifest",
                    plugin: "org.ekstep.plugins.common.keyboard",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "generators",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/generators.js",
                    type: "js",
                  },
                  {
                    id: "eraser",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/eraser.png",
                    type: "image",
                  },
                  {
                    id: "seq",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/seq.png",
                    type: "image",
                  },
                  {
                    id: "semitrans",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/semitrans.png",
                    type: "image",
                  },
                  {
                    id: "zoom-in",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/zoom.png",
                    type: "image",
                  },
                  {
                    id: "plus-white",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/plus_white.png",
                    type: "image",
                  },
                  {
                    id: "minus-white",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/minus_white.png",
                    type: "image",
                  },
                  {
                    id: "micro-hint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "micro-hint-mdd",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "html-micro-hint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                    type: "image",
                  },
                  {
                    id: "drop-down",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/drop-down-icon.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.hint-icon",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/hint.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.solution-icon",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/solimg.png",
                    type: "image",
                  },
                  {
                    id: "close",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/close.png",
                    type: "image",
                  },
                  {
                    id: "submit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/icn_submit.png",
                    type: "image",
                  },
                  {
                    id: "undo",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/undo.png",
                    type: "image",
                  },
                  {
                    id: "clearall",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/clearall.png",
                    type: "image",
                  },
                  {
                    id: "disabledsubmit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/disabled_submit.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.funtoot.asset.next",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/next.png",
                    type: "image",
                  },
                  {
                    id: "editable",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/editable.png",
                    type: "image",
                  },
                  {
                    id: "nonEditable",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/noneditable.png",
                    type: "image",
                  },
                  {
                    id: "additioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/additioneval.js",
                    type: "js",
                  },
                  {
                    id: "fractioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fractioneval.js",
                    type: "js",
                  },
                  {
                    id: "multiplicationeval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/multiplicationeval.js",
                    type: "js",
                  },
                  {
                    id: "divisioneval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/divisioneval.js",
                    type: "js",
                  },
                  {
                    id: "clockcontrol",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/clockcontrol.js",
                    type: "plugin",
                  },
                  {
                    id: "numberlineeval",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlineeval.js",
                    type: "js",
                  },
                  {
                    id: "mathquill",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.js",
                    type: "js",
                  },
                  {
                    id: "mathjs",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/math.min.js",
                    type: "js",
                  },
                  {
                    id: "mathquill-basic",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.css",
                    type: "css",
                  },
                  {
                    id: "genericmdd",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/genericmdd.css",
                    type: "css",
                  },
                  {
                    id: "zoomableImageStyle",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/zoomableimage.css",
                    type: "css",
                  },
                  {
                    id: "mathtext",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathtext.js",
                    type: "plugin",
                  },
                  {
                    id: "mathedit",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathedit.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.ftPlugin",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbaseplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "nkeyboard",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/customnumkeyboard.js",
                    type: "plugin",
                  },
                  {
                    id: "keyboard",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/keyboard-plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "fibblankprocessor",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fibblankprocessor.js",
                    type: "plugin",
                  },
                  {
                    id: "ftbdropdownprocessor",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbdropdownprocessor.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.zoomableImage",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/zoomableimage.js",
                    type: "plugin",
                  },
                  {
                    id: "defaultkeyboardadapter",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/defaultkeyboardadapter.js",
                    type: "plugin",
                  },
                  {
                    id: "ftFib",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfib.js",
                    type: "plugin",
                  },
                  {
                    id: "ftPluginHelper",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpluginhelper.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.grid",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/grid.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.table",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/table.js",
                    type: "plugin",
                  },
                  {
                    id: "keyboard_css",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/numerickeyboard.css",
                    type: "css",
                  },
                  {
                    id: "htmlpopup",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/htmlpopupplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "htmlpopup_css",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/htmlpopup.css",
                    type: "css",
                  },
                  {
                    id: "htmlpopup_js",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/scripts/htmlpopup.js",
                    type: "js",
                  },
                  {
                    id: "ftMicroHint",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftmicrohint.js",
                    type: "plugin",
                  },
                  {
                    id: "ftPopup",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpopup.js",
                    type: "plugin",
                  },
                  {
                    id: "ftAttempts",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftattempts.js",
                    type: "plugin",
                  },
                  {
                    id: "inlineFib",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/inlinefib.js",
                    type: "plugin",
                  },
                  {
                    id: "numberlinenumber",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlinenumber.js",
                    type: "plugin",
                  },
                  {
                    id: "numberline",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberline.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.option",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/option.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.optionBuilder",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/optionbuilder.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.common",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfibbaseplugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.funtoot.common_manifest",
                    plugin: "org.ekstep.funtoot.common",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.funtoot.common-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.fibwordproblem",
                    plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/renderer/fibwordproblem.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.fibwordproblem_manifest",
                    plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericfib",
                    plugin: "org.ekstep.plugins.funtoot.genericfib",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericfib_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericfib",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmfr",
                    plugin: "org.ekstep.plugins.funtoot.genericmfr",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmfr_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmfr",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmdd",
                    plugin: "org.ekstep.plugins.funtoot.genericmdd",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmdd_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmdd",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmcq",
                    plugin: "org.ekstep.plugins.funtoot.genericmcq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmcq_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmcq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "connector",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/asset/connector.png",
                    type: "image",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmtf",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericmtf_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericmtf",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericseq",
                    plugin: "org.ekstep.plugins.funtoot.genericseq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericseq_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericseq",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/manifest.json",
                    type: "json",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/renderer/plugin.js",
                    type: "plugin",
                  },
                  {
                    id: "org.ekstep.plugins.funtoot.genericitemrenderer_manifest",
                    plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                    ver: 1,
                    src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/manifest.json",
                    type: "json",
                  },
                ],
              },
            },
          ],
          config: {
            title: "test",
            max_score: 5,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 1,
          },
        },
      };
      data1 = v1NewData.data;
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance.media.QuizImage).toBeTruthy();
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });

    it("Media attribute missing v2 data", function (done) {
      var v2NewData = {
        data: [
          {
            template: "NA",
            templateType: "Horizontal",
            itemType: "UNIT",
            isPartialScore: true,
            code: "NA",
            subject: "domain",
            qlevel: "MEDIUM",
            evalUnordered: false,
            channel: "0126089810590679040",
            language: ["English"],
            title: "gg dfgdfgdfg\n",
            type: "mcq",
            body: '{"media":[],"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.1","templateId":"horizontalMCQ"},"data":{"question":{"text":"<p>gg dfgdfgdfg</p>\\n","image":"","audio":"","audioName":"","hint":""},"options":[{"text":"<p>g</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":true,"$$hashKey":"object:787"},{"text":"<p>t</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":false,"$$hashKey":"object:788"}],"questionCount":0,"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"gg dfgdfgdfg\\n","title":"gg dfgdfgdfg\\n","category":"MCQ"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
            createdOn: "2019-02-19T09:37:39.559+0000",
            isShuffleOption: false,
            appId: "qa.Upgrade-lms.portal",
            options: [
              {
                answer: true,
                value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
              },
            ],
            lastUpdatedOn: "2019-02-19T09:37:39.559+0000",
            identifier: "do_21270226173590732811047",
            consumerId: "298450cb-c202-45f0-adee-9224c7612f35",
            version: 2,
            versionKey: "1550569059559",
            framework: "jdf1",
            createdBy: "4f0656c1-df55-4e27-911c-cb79fc1bd611",
            max_score: 1,
            name: "gg dfgdfgdfg\n",
            template_id: "NA",
            category: "MCQ",
            status: "Live",
            isSelected: true,
            $$hashKey: "object:1985",
          },
        ],
        config: {
          title: "test",
          max_score: 1,
          allow_skip: true,
          show_feedback: true,
          shuffle_questions: false,
          shuffle_options: false,
          total_items: 1,
        },
      };
      data1 = v2NewData.data;
      var callback = { data: v2NewData, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        expect(instance.media.QuizImage).toBeTruthy();
        expect(instance.manifest.id).toEqual("org.ekstep.questionset");
        done();
      }, 500);
    });

    it("should call getPropsForEditor", function (done) {
      plugin.data = newData;
      plugin.newInstance();
      setTimeout(function _expect() {
        expect(plugin.getPropsForEditor).toHaveBeenCalled();
        done();
      }, 400);
    });

    it("should add an image representing question set as editorObj", function (done) {
      fabricGroup = {
        type: "group",
        originX: "left",
        originY: "top",
        left: 72,
        top: 12.15,
        width: 785,
        height: 513,
        fill: "rgb(0,0,0)",
        stroke: null,
        strokeWidth: 0,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeLineJoin: "miter",
        strokeMiterLimit: 10,
        scaleX: 0.71,
        scaleY: 0.71,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        clipTo: null,
        backgroundColor: "",
        fillRule: "nonzero",
        globalCompositeOperation: "source-over",
        transformMatrix: null,
        skewX: 0,
        skewY: 0,
        objects: [
          {
            type: "image",
            originX: "left",
            originY: "top",
            left: -392.5,
            top: -256.5,
            width: 785,
            height: 513,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            src: "http://localhost:9876/base/org.ekstep.questionset-1.0/editor/assets/quizimage.png",
            filters: [],
            resizeFilters: [],
          },
          {
            type: "group",
            originX: "left",
            originY: "top",
            left: -359.5,
            top: -235.65,
            width: 125.66,
            height: 31.56,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "text",
                originX: "left",
                originY: "top",
                left: -62.83,
                top: -15.78,
                width: 35.83,
                height: 16.95,
                fill: "black",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
              },
              {
                type: "text",
                originX: "left",
                originY: "top",
                left: -62.83,
                top: 1.22,
                width: 72.33,
                height: 13.56,
                fill: "black",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
              },
              {
                type: "text",
                originX: "left",
                originY: "top",
                left: 22.17,
                top: 1.22,
                width: 39.66,
                height: 13.56,
                fill: "black",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
              },
            ],
          },
        ],
      };
      plugin.data = newData;
      plugin.newInstance();
      setTimeout(function _expect() {
        expect(JSON.stringify(plugin.editorObj)).toEqual(
          JSON.stringify(fabricGroup)
        );
        done();
      }, 600);
    });
  });

  describe("to ECML", function () {
    it("should call createEcmlStructureV1", function () {
      var data1 = {
        data: [
          {
            template: "NA",
            templateType: "Horizontal",
            itemType: "UNIT",
            isPartialScore: true,
            code: "NA",
            subject: "domain",
            qlevel: "MEDIUM",
            evalUnordered: false,
            channel: "0126089810590679040",
            language: ["English"],
            title: "gg dfgdfgdfg\n",
            type: "mcq",
            body: '{"data":{"plugin":{"id":"org.ekstep.questionunit.mcq","version":"1.1","templateId":"horizontalMCQ"},"data":{"question":{"text":"<p>gg dfgdfgdfg</p>\\n","image":"","audio":"","audioName":"","hint":""},"options":[{"text":"<p>g</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":true,"$$hashKey":"object:787"},{"text":"<p>t</p>\\n","image":"","audio":"","audioName":"","hint":"","isCorrect":false,"$$hashKey":"object:788"}],"questionCount":0,"media":[]},"config":{"metadata":{"max_score":1,"isShuffleOption":false,"isPartialScore":true,"evalUnordered":false,"templateType":"Horizontal","name":"gg dfgdfgdfg\\n","title":"gg dfgdfgdfg\\n","category":"MCQ"},"max_time":0,"max_score":1,"partial_scoring":true,"layout":"Horizontal","isShuffleOption":false,"questionCount":1,"evalUnordered":false},"media":[]}}',
            createdOn: "2019-02-19T09:37:39.559+0000",
            isShuffleOption: false,
            appId: "qa.Upgrade-lms.portal",
            options: [
              {
                answer: true,
                value: { type: "text", asset: "1", resvalue: 0, resindex: 0 },
              },
            ],
            lastUpdatedOn: "2019-02-19T09:37:39.559+0000",
            identifier: "do_21270226173590732811047",
            consumerId: "298450cb-c202-45f0-adee-9224c7612f35",
            version: 2,
            versionKey: "1550569059559",
            framework: "jdf1",
            createdBy: "4f0656c1-df55-4e27-911c-cb79fc1bd611",
            max_score: 1,
            name: "gg dfgdfgdfg\n",
            template_id: "NA",
            category: "MCQ",
            status: "Live",
            isSelected: true,
            $$hashKey: "object:1985",
          },
        ],
        config: {
          title: "test",
          max_score: 1,
          allow_skip: true,
          show_feedback: true,
          shuffle_questions: false,
          shuffle_options: false,
          total_items: 1,
        },
      };
      var data2 = {
        data: [
          {
            template: [
              {
                "org.ekstep.plugins.funtoot.genericitemrenderer": {
                  w: 100,
                  h: 100,
                  x: 0,
                  y: 0,
                  rotate: "",
                  id: "44cce289-b407-4628-9900-8adbb67b2386",
                },
                id: "funtoot.template.01",
              },
            ],
            itemType: "UNIT",
            code: "QFIB02230",
            keywords: ["mcq"],
            qtype: "mcq",
            subject: "Mathematics",
            qlevel: "MEDIUM",
            channel: "in.ekstep",
            language: ["English"],
            medium: "English",
            type: "mcq",
            title: "",
            qid: "QFIB02230",
            createdOn: "2018-02-01T06:55:09.970+0000",
            qindex: "",
            question_audio: "",
            gradeLevel: ["Class 5"],
            appId: "ekstep_portal",
            options: [
              {
                value: {
                  type: "text",
                  asset: "OPT_0",
                  audio: "",
                  count: null,
                  resvalue: 0,
                  resindex: 0,
                },
                answer: true,
                mh: "MH_0",
                mmc: [],
              },
              {
                value: {
                  type: "text",
                  asset: "OPT_1",
                  audio: "",
                  count: null,
                  resvalue: 1,
                  resindex: 1,
                },
                answer: false,
                mh: "MH_1",
                mmc: ["FC090"],
              },
              {
                value: {
                  type: "text",
                  asset: "OPT_2",
                  audio: "",
                  count: null,
                  resvalue: 2,
                  resindex: 2,
                },
                answer: false,
                mh: "MH_2",
                mmc: ["FC090"],
              },
              {
                value: {
                  type: "text",
                  asset: "OPT_3",
                  audio: "",
                  count: null,
                  resvalue: 3,
                  resindex: 3,
                },
                answer: false,
                mh: "MH_3",
                mmc: ["FC130"],
              },
            ],
            lastUpdatedOn: "2019-02-19T09:26:05.444+0000",
            used_for: "worksheet",
            model: {
              hintMsg: "HINT_ID",
              numericLangId: "en",
              langId: "en",
              variables: [],
              mcqType: 8,
            },
            state: "Verified",
            subLevel: "",
            identifier: "QFIB02230",
            question: "QUESTION_TEXT",
            level: 2,
            consumerId: "ec175d89-64b0-4e23-9f81-076e4d379a8f",
            author: "funtoot",
            portalOwner: "562",
            version: 1,
            i18n: '{"en":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3","HINT_ID":"For addition of like fractions, add the numerators only. Denominator remains the same.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` equals to:","MH_0":"","MH_1":"Add the numerators of all the fractions correctly.","MH_2":"Do not multiply the numerators. Add them.","MH_3":"This is the reciprocal of the answer.","NO_ANSWER":"Click the answer and then press the submit button"},"ta":{"OPT_3":"``\\\\frac{$d1}{$n4}``","OPT_2":"``\\\\frac{$n6}{$d1}``","OPT_1":"``\\\\frac{$n5}{$d1}``","OPT_0":"``\\\\frac{$n4}{$d1}``","HINT_ID":"ஒத்த பின்னங்களின் கூடுதலானது, தொகுதிகளின் கூடுதல் மட்டுமே.பகுதி மாறாது.","QUESTION_TEXT":"``\\\\frac{$n1}{$d1}``+ ``\\\\frac{$n2}{$d1}``+ ``\\\\frac{$n3}{$d1}`` =","MH_0":"","MH_1":"அனைத்து பின்னங்களின் தொகுதிகளை சரியாக கூட்டவும்","MH_2":"தொகுதிகளை பெருக்காமல் கூட்டவும்","MH_3":"இதுவே தலைகிழ் மதிப்பாகும்.","NO_ANSWER":"தயவுசெய்து பதிலளிக்கவும்","EXPRESSIONS":"$n1=random(1,2)\\n$n2=random(3,4)\\n$n3=random(4,5)\\n$d1=random([23,31])\\n$n4=$n1+$n2+$n3\\n$n5=$n1+$n2\\n$n6=$n1*$n2*$n3\\n"}}',
            versionKey: "1550568365444",
            tags: ["mcq"],
            question_count: 1,
            framework: "NCF",
            answer: {},
            grade: ["5"],
            domain: "Numeracy",
            max_score: 5,
            name: "QFIB02230",
            sublevel: 1,
            num_answers: 1,
            template_id: "do_2125053652669235201268",
            category: "MCQ",
            bloomsTaxonomyLevel: "Understand",
            status: "Live",
            isSelected: true,
            $$hashKey: "object:2594",
            mediamanifest: {
              media: [
                {
                  id: "9c9bc62c-cc13-4191-bbee-57ec2a4b1dca",
                  plugin: "org.ekstep.navigation",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_ctrl.js",
                  type: "js",
                },
                {
                  id: "7922b23d-7d68-4d20-a004-1ca223750316",
                  plugin: "org.ekstep.navigation",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html",
                  type: "js",
                },
                {
                  id: "org.ekstep.navigation",
                  plugin: "org.ekstep.navigation",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.navigation-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.navigation_manifest",
                  plugin: "org.ekstep.navigation",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.navigation-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "polyglot",
                  plugin: "org.ekstep.plugins.i18n",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/polyglot.js",
                  type: "js",
                },
                {
                  id: "org.ekstep.plugins.i18n",
                  plugin: "org.ekstep.plugins.i18n",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.i18n-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.i18n_manifest",
                  plugin: "org.ekstep.plugins.i18n",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.i18n-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "keyboardcss",
                  plugin: "org.ekstep.plugins.common.keyboard",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard.css",
                  type: "css",
                },
                {
                  id: "org.ekstep.plugins.common.keyboard",
                  plugin: "org.ekstep.plugins.common.keyboard",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/renderer/keyboard-plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.common.keyboard_manifest",
                  plugin: "org.ekstep.plugins.common.keyboard",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.common.keyboard-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "generators",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/generators.js",
                  type: "js",
                },
                {
                  id: "eraser",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/eraser.png",
                  type: "image",
                },
                {
                  id: "seq",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/seq.png",
                  type: "image",
                },
                {
                  id: "semitrans",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/semitrans.png",
                  type: "image",
                },
                {
                  id: "zoom-in",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/zoom.png",
                  type: "image",
                },
                {
                  id: "plus-white",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/plus_white.png",
                  type: "image",
                },
                {
                  id: "minus-white",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/minus_white.png",
                  type: "image",
                },
                {
                  id: "micro-hint",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                  type: "image",
                },
                {
                  id: "micro-hint-mdd",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                  type: "image",
                },
                {
                  id: "html-micro-hint",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/micro-hint.png",
                  type: "image",
                },
                {
                  id: "drop-down",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/drop-down-icon.png",
                  type: "image",
                },
                {
                  id: "org.ekstep.funtoot.hint-icon",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/hint.png",
                  type: "image",
                },
                {
                  id: "org.ekstep.funtoot.solution-icon",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/solimg.png",
                  type: "image",
                },
                {
                  id: "close",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/close.png",
                  type: "image",
                },
                {
                  id: "submit",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/icn_submit.png",
                  type: "image",
                },
                {
                  id: "undo",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/undo.png",
                  type: "image",
                },
                {
                  id: "clearall",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/clearall.png",
                  type: "image",
                },
                {
                  id: "disabledsubmit",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/disabled_submit.png",
                  type: "image",
                },
                {
                  id: "org.ekstep.funtoot.asset.next",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/next.png",
                  type: "image",
                },
                {
                  id: "editable",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/editable.png",
                  type: "image",
                },
                {
                  id: "nonEditable",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/assets/noneditable.png",
                  type: "image",
                },
                {
                  id: "additioneval",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/additioneval.js",
                  type: "js",
                },
                {
                  id: "fractioneval",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fractioneval.js",
                  type: "js",
                },
                {
                  id: "multiplicationeval",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/multiplicationeval.js",
                  type: "js",
                },
                {
                  id: "divisioneval",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/divisioneval.js",
                  type: "js",
                },
                {
                  id: "clockcontrol",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/clockcontrol.js",
                  type: "plugin",
                },
                {
                  id: "numberlineeval",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlineeval.js",
                  type: "js",
                },
                {
                  id: "mathquill",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.js",
                  type: "js",
                },
                {
                  id: "mathjs",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/math.min.js",
                  type: "js",
                },
                {
                  id: "mathquill-basic",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathquill.css",
                  type: "css",
                },
                {
                  id: "genericmdd",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/genericmdd.css",
                  type: "css",
                },
                {
                  id: "zoomableImageStyle",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/zoomableimage.css",
                  type: "css",
                },
                {
                  id: "mathtext",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathtext.js",
                  type: "plugin",
                },
                {
                  id: "mathedit",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/mathedit.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.ftPlugin",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbaseplugin.js",
                  type: "plugin",
                },
                {
                  id: "nkeyboard",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/customnumkeyboard.js",
                  type: "plugin",
                },
                {
                  id: "keyboard",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/keyboard-plugin.js",
                  type: "plugin",
                },
                {
                  id: "fibblankprocessor",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/fibblankprocessor.js",
                  type: "plugin",
                },
                {
                  id: "ftbdropdownprocessor",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftbdropdownprocessor.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.zoomableImage",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/zoomableimage.js",
                  type: "plugin",
                },
                {
                  id: "defaultkeyboardadapter",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/defaultkeyboardadapter.js",
                  type: "plugin",
                },
                {
                  id: "ftFib",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfib.js",
                  type: "plugin",
                },
                {
                  id: "ftPluginHelper",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpluginhelper.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.grid",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/grid.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.table",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/table.js",
                  type: "plugin",
                },
                {
                  id: "keyboard_css",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/numerickeyboard.css",
                  type: "css",
                },
                {
                  id: "htmlpopup",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/htmlpopupplugin.js",
                  type: "plugin",
                },
                {
                  id: "htmlpopup_css",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/css/htmlpopup.css",
                  type: "css",
                },
                {
                  id: "htmlpopup_js",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/scripts/htmlpopup.js",
                  type: "js",
                },
                {
                  id: "ftMicroHint",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftmicrohint.js",
                  type: "plugin",
                },
                {
                  id: "ftPopup",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftpopup.js",
                  type: "plugin",
                },
                {
                  id: "ftAttempts",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftattempts.js",
                  type: "plugin",
                },
                {
                  id: "inlineFib",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/inlinefib.js",
                  type: "plugin",
                },
                {
                  id: "numberlinenumber",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberlinenumber.js",
                  type: "plugin",
                },
                {
                  id: "numberline",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/numberline.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.option",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/option.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.optionBuilder",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/optionbuilder.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.common",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/renderer/ftfibbaseplugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.funtoot.common_manifest",
                  plugin: "org.ekstep.funtoot.common",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.funtoot.common-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.fibwordproblem",
                  plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/renderer/fibwordproblem.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.fibwordproblem_manifest",
                  plugin: "org.ekstep.plugins.funtoot.fibwordproblem",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.fibwordproblem-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericfib",
                  plugin: "org.ekstep.plugins.funtoot.genericfib",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericfib_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericfib",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericfib-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmfr",
                  plugin: "org.ekstep.plugins.funtoot.genericmfr",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmfr_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericmfr",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmfr-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmdd",
                  plugin: "org.ekstep.plugins.funtoot.genericmdd",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmdd_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericmdd",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmdd-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmcq",
                  plugin: "org.ekstep.plugins.funtoot.genericmcq",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmcq_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericmcq",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmcq-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "connector",
                  plugin: "org.ekstep.plugins.funtoot.genericmtf",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/asset/connector.png",
                  type: "image",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmtf",
                  plugin: "org.ekstep.plugins.funtoot.genericmtf",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericmtf_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericmtf",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericmtf-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericseq",
                  plugin: "org.ekstep.plugins.funtoot.genericseq",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericseq_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericseq",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericseq-1.0/manifest.json",
                  type: "json",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericitemrenderer",
                  plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/renderer/plugin.js",
                  type: "plugin",
                },
                {
                  id: "org.ekstep.plugins.funtoot.genericitemrenderer_manifest",
                  plugin: "org.ekstep.plugins.funtoot.genericitemrenderer",
                  ver: 1,
                  src: "/content-plugins/org.ekstep.plugins.funtoot.genericitemrenderer-1.0/manifest.json",
                  type: "json",
                },
              ],
            },
          },
        ],
        config: {
          title: "test2",
          max_score: 5,
          allow_skip: true,
          show_feedback: true,
          shuffle_questions: false,
          shuffle_options: false,
          total_items: 1,
        },
      };
      var allQuestions = data1.data.concat(data2.data);
      plugin.data = allQuestions;
      plugin.toECML();
      expect(plugin.createEcmlStructureV1).toHaveBeenCalled();
    });

    it("should not call createEcmlStructureV1 if it is v2 question", function () {
      plugin.data = v2Data;
      plugin.toECML();
      expect(plugin.createEcmlStructureV1).not.toHaveBeenCalled();
    });

    it("should return ecml of question set v1", function () {
      plugin.data = v1Data;
      var v1ecml = plugin.toECML();
      var expectedEcml = {
        x: 9,
        y: 6,
        w: 80,
        h: 85,
        rotate: 0,
        "z-index": 0,
        id: "a46c31a7-9abc-4852-980e-0ea6003642de",
        data: {
          __cdata:
            '[{"template":[{"text":{"event":{"action":[{"asset_model":"item.question_audio","sound":true,"type":"command","command":"stop"},{"asset_model":"item.question_audio","type":"command","command":"play"}],"type":"click"},"color":"#4c4c4c","w":100,"h":15,"x":0,"fontsize":"3vw","y":10,"lineHeight":1.4,"model":"item.question","valign":"top","align":"center"},"shape":{"event":{"action":[{"asset_model":"item.question_audio","sound":true,"type":"command","command":"stop"},{"asset_model":"item.question_audio","type":"command","command":"play"}],"type":"click"},"hitArea":true,"w":100,"h":24,"x":0,"y":10,"type":"rect"},"g":[{"placeholder":[{"model-count":"item.optionCount1","w":30,"h":100,"x":0,"y":0,"valign":"middle","align":"center","type":"gridLayout","model-asset":"item.question_image"},{"model-count":"item.optionCount2","w":30,"h":100,"x":40,"y":0,"valign":"middle","align":"center","type":"gridLayout","model-asset":"item.question_image"}],"text":[{"color":"#4c4c4c","w":5,"h":0,"x":32,"fontsize":"3vw","y":55,"model":"item.operator1","valign":"middle","align":"center"},{"color":"#4c4c4c","w":5,"h":0,"x":72,"fontsize":"3vw","y":55,"model":"item.operator2","valign":"middle","align":"center"},{"z-index":30,"color":"#4c4c4c","w":20,"h":40,"x":80,"fontsize":"3vw","y":38,"model":"item.ans1","valign":"middle","id":"newText1","align":"center"}],"g":{"shape":{"w":100,"h":100,"x":0,"y":0,"stroke-width":3,"fill":"#FFFFA5","type":"roundrect","stroke":"#719ECE"},"z-index":20,"w":20,"h":40,"x":80,"y":34,"id":"textshape1"},"w":100,"h":32,"x":0,"y":33},{"nkeyboard":{"keys":"item.keys","w":100,"h":25,"limit":7,"x":0,"y":82,"id":"bKeyboard","type":"custom","target":"newText1"},"w":100,"h":100,"x":0,"y":0}],"id":"Operations_with_images"}],"itemType":"UNIT","code":"org.ekstep.assessmentitem.literacy_5abb516b8f224","subject":"domain","qlevel":"EASY","channel":"in.ekstep","description":"","language":["English"],"media":[{"id":"do_11246090113921843213","type":"image","src":"https://dev.ekstep.in/assets/public/content/do_11246090113921843213/artifact/ae36d87ad0aa9438984018205a9c0fa0_1521106096238.jpeg","asset_id":"do_11246090113921843213"}],"type":"ftb","title":"v1 - operations with images","createdOn":"2018-03-28T08:25:15.611+0000","gradeLevel":["Kindergarten"],"appId":"ekstep_portal","question_image":"do_11246090113921843213","lastUpdatedOn":"2018-03-28T08:25:15.611+0000","used_for":"worksheet","model":{"optionCount1":"4","optionCount2":"3","operator1":"-","operator2":"=","keys":"0,1,2,3,4,5,6,7,8,9,+,-,×,÷,=,<,>,/,."},"lastUpdatedBy":"597","identifier":"do_112470071423893504143","question":"v1 - operations with images","consumerId":"f6878ac4-e9c9-4bc4-80be-298c5a73b447","version":1,"versionKey":"1522225515611","answer":{"ans1":{"value":"1","score":1}},"concepts":[{"identifier":"LO4","name":"Understanding of Grammar/Syntax","objectType":"Concept","relation":"associatedTo","description":null,"index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"createdBy":"597","max_score":1,"domain":["literacy"],"name":"v1 - operations with images","template_id":"do_112470023566245888128","category":"MCQ","status":"Live","isSelected":true,"$$hashKey":"object:694","mediamanifest":{"media":[{"id":"do_11246090113921843213","type":"image","src":"https://dev.ekstep.in/assets/public/content/do_11246090113921843213/artifact/ae36d87ad0aa9438984018205a9c0fa0_1521106096238.jpeg","asset_id":"do_11246090113921843213"},{"src":"https://dev.ekstep.in/assets/public/content/do_112470023566245888128/assets/1522219674003/customnumkeyboard.js","id":"nkeyboard","type":"plugin","plugin":"org.ekstep.questionset","ver":"1.0"},{"src":"https://dev.ekstep.in/assets/public/content/do_112470023566245888128/assets/1522219674010/numerickeyboard.css","id":"keyboard_css","type":"css","plugin":"org.ekstep.questionset","ver":"1.0"}]}}]',
        },
        config: {
          __cdata:
            '{"title":"qs","max_score":1,"allow_skip":true,"show_feedback":true,"shuffle_questions":false,"shuffle_options":false,"total_items":1,"btn_edit":"Edit"}',
        },
        "org.ekstep.question": [
          {
            id: "771329d0-21d4-4834-96ac-de16576241e6",
            type: "ftb",
            pluginId: "org.ekstep.questionset.quiz",
            pluginVer: "1.0",
            templateId: "horizontalMCQ",
            data: {
              __cdata:
                '{"questionnaire":{"items":{"do_112470071423893504143":[{"itemType":"UNIT","code":"org.ekstep.assessmentitem.literacy_5abb516b8f224","subject":"domain","qlevel":"EASY","channel":"in.ekstep","description":"","language":["English"],"media":[{"id":"do_11246090113921843213","type":"image","src":"https://dev.ekstep.in/assets/public/content/do_11246090113921843213/artifact/ae36d87ad0aa9438984018205a9c0fa0_1521106096238.jpeg","asset_id":"do_11246090113921843213"}],"type":"ftb","title":"v1 - operations with images","createdOn":"2018-03-28T08:25:15.611+0000","gradeLevel":["Kindergarten"],"appId":"ekstep_portal","question_image":"do_11246090113921843213","lastUpdatedOn":"2018-03-28T08:25:15.611+0000","used_for":"worksheet","model":{"optionCount1":"4","optionCount2":"3","operator1":"-","operator2":"=","keys":"0,1,2,3,4,5,6,7,8,9,+,-,×,÷,=,<,>,/,."},"lastUpdatedBy":"597","identifier":"do_112470071423893504143","question":"v1 - operations with images","consumerId":"f6878ac4-e9c9-4bc4-80be-298c5a73b447","version":1,"versionKey":"1522225515611","answer":{"ans1":{"value":"1","score":1}},"concepts":[{"identifier":"LO4","name":"Understanding of Grammar/Syntax","objectType":"Concept","relation":"associatedTo","description":null,"index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"createdBy":"597","max_score":1,"domain":["literacy"],"name":"v1 - operations with images","template_id":"do_112470023566245888128","category":"MCQ","status":"Live","isSelected":true,"$$hashKey":"object:694","template":"Operations_with_images"}]},"item_sets":[{"count":1,"id":"do_112470071423893504143"}],"title":"qs","max_score":1,"allow_skip":true,"show_feedback":true,"shuffle_questions":false,"shuffle_options":false,"total_items":1,"btn_edit":"Edit"},"template":[{"text":{"event":{"action":[{"asset_model":"item.question_audio","sound":true,"type":"command","command":"stop"},{"asset_model":"item.question_audio","type":"command","command":"play"}],"type":"click"},"color":"#4c4c4c","w":100,"h":15,"x":0,"fontsize":"3vw","y":10,"lineHeight":1.4,"model":"item.question","valign":"top","align":"center"},"shape":{"event":{"action":[{"asset_model":"item.question_audio","sound":true,"type":"command","command":"stop"},{"asset_model":"item.question_audio","type":"command","command":"play"}],"type":"click"},"hitArea":true,"w":100,"h":24,"x":0,"y":10,"type":"rect"},"g":[{"placeholder":[{"model-count":"item.optionCount1","w":30,"h":100,"x":0,"y":0,"valign":"middle","align":"center","type":"gridLayout","model-asset":"item.question_image"},{"model-count":"item.optionCount2","w":30,"h":100,"x":40,"y":0,"valign":"middle","align":"center","type":"gridLayout","model-asset":"item.question_image"}],"text":[{"color":"#4c4c4c","w":5,"h":0,"x":32,"fontsize":"3vw","y":55,"model":"item.operator1","valign":"middle","align":"center"},{"color":"#4c4c4c","w":5,"h":0,"x":72,"fontsize":"3vw","y":55,"model":"item.operator2","valign":"middle","align":"center"},{"z-index":30,"color":"#4c4c4c","w":20,"h":40,"x":80,"fontsize":"3vw","y":38,"model":"item.ans1","valign":"middle","id":"newText1","align":"center"}],"g":{"shape":{"w":100,"h":100,"x":0,"y":0,"stroke-width":3,"fill":"#FFFFA5","type":"roundrect","stroke":"#719ECE"},"z-index":20,"w":20,"h":40,"x":80,"y":34,"id":"textshape1"},"w":100,"h":32,"x":0,"y":33},{"nkeyboard":{"keys":"item.keys","w":100,"h":25,"limit":7,"x":0,"y":82,"id":"bKeyboard","type":"custom","target":"newText1"},"w":100,"h":100,"x":0,"y":0}],"id":"Operations_with_images"}]}',
            },
            config: { __cdata: '{"type":"items","var":"item"}' },
            w: 80,
            h: 85,
            x: 9,
            y: 6,
          },
        ],
      };
      expect(v1ecml[org.ekstep.question]).toEqual(
        expectedEcml[org.ekstep.question]
      );
    });
    it("should return ecml of question set v2", function () {
      plugin.data = v2Data;
      var v2ecml = plugin.toECML();
      var expectedEcml = {
        x: 9,
        y: 6,
        w: 80,
        h: 85,
        rotate: 0,
        "z-index": 0,
        id: "1a5d8740-ea06-4975-828e-5ad9703be942",
        data: {
          __cdata:
            '[{"template":"NA","itemType":"UNIT","code":"NA","subject":"domain","qlevel":"EASY","channel":"in.ekstep","description":"test","language":["English"],"type":"mcq","title":"test image and audio for the image","body":"{\\"data\\":{\\"plugin\\":{\\"id\\":\\"org.ekstep.questionunit.mcq\\",\\"version\\":\\"1.0\\",\\"templateId\\":\\"horizontalMCQ\\"},\\"data\\":{\\"question\\":{\\"text\\":\\"test image and audio for the image\\",\\"image\\":\\"/assets/public/content/2_1466487176189.jpg\\",\\"audio\\":\\"\\",\\"hint\\":\\"\\"},\\"options\\":[{\\"text\\":\\"test1\\",\\"image\\":\\"\\",\\"audio\\":\\"/assets/public/content/145503359952511.mp3\\",\\"hint\\":\\"\\",\\"isCorrect\\":true,\\"$$hashKey\\":\\"object:3278\\"},{\\"text\\":\\"test2\\",\\"image\\":\\"/assets/public/content/2_1466487176189.jpg\\",\\"audio\\":\\"\\",\\"hint\\":\\"\\",\\"isCorrect\\":false,\\"$$hashKey\\":\\"object:3279\\"}],\\"media\\":[{\\"id\\":566752436,\\"src\\":\\"/assets/public/content/2_1466487176189.jpg\\",\\"assetId\\":\\"do_20072814\\",\\"type\\":\\"image\\",\\"preload\\":false},{\\"id\\":576331075,\\"src\\":\\"/assets/public/content/2_1466487176189.jpg\\",\\"assetId\\":\\"do_20072814\\",\\"type\\":\\"image\\",\\"preload\\":false},{\\"id\\":94711675,\\"src\\":\\"/assets/public/content/145503359952511.mp3\\",\\"assetId\\":\\"11_sound\\",\\"type\\":\\"audio\\",\\"preload\\":false}]},\\"config\\":{\\"metadata\\":{\\"category\\":\\"MCQ\\",\\"title\\":\\"test image and audio for the image\\",\\"language\\":[\\"English\\"],\\"qlevel\\":\\"EASY\\",\\"gradeLevel\\":[\\"Kindergarten\\"],\\"concepts\\":[\\"BIO3\\"],\\"description\\":\\"test\\",\\"max_score\\":1},\\"max_time\\":0,\\"max_score\\":1,\\"partial_scoring\\":false,\\"layout\\":\\"Horizontal\\",\\"isShuffleOption\\":false},\\"media\\":[{\\"id\\":566752436,\\"src\\":\\"/assets/public/content/2_1466487176189.jpg\\",\\"assetId\\":\\"do_20072814\\",\\"type\\":\\"image\\",\\"preload\\":false},{\\"id\\":576331075,\\"src\\":\\"/assets/public/content/2_1466487176189.jpg\\",\\"assetId\\":\\"do_20072814\\",\\"type\\":\\"image\\",\\"preload\\":false},{\\"id\\":94711675,\\"src\\":\\"/assets/public/content/145503359952511.mp3\\",\\"assetId\\":\\"11_sound\\",\\"type\\":\\"audio\\",\\"preload\\":false}]}}","createdOn":"2018-03-23T10:15:24.824+0000","gradeLevel":["Grade 1"],"appId":"ekstep_portal","options":[{"answer":true,"value":{"type":"text","asset":"1","resvalue":0,"resindex":0}}],"lastUpdatedOn":"2018-03-23T10:15:24.824+0000","identifier":"do_112466586622558208121","question":"test image and audio for the image","consumerId":"f6878ac4-e9c9-4bc4-80be-298c5a73b447","version":2,"versionKey":"1521800124824","createdBy":"580","max_score":1,"name":"test image and audio for the image","template_id":"NA","category":"MCQ","status":"Live","isSelected":true,"$$hashKey":"object:1652"}]',
        },
        config: {
          __cdata:
            '{"title":"qs","max_score":1,"allow_skip":true,"show_feedback":true,"shuffle_questions":false,"shuffle_options":false,"total_items":1,"btn_edit":"Edit"}',
        },
        "org.ekstep.question": [
          {
            id: "d5298a2e-56e8-48d7-88b9-48ce7b8a7122",
            type: "mcq",
            pluginId: "org.ekstep.questionunit.mcq",
            pluginVer: "1.0",
            templateId: "horizontalMCQ",
            data: {
              __cdata:
                '{"question":{"text":"test image and audio for the image","image":"/assets/public/content/2_1466487176189.jpg","audio":"","hint":""},"options":[{"text":"test1","image":"","audio":"/assets/public/content/145503359952511.mp3","hint":"","isCorrect":true,"$$hashKey":"object:3278"},{"text":"test2","image":"/assets/public/content/2_1466487176189.jpg","audio":"","hint":"","isCorrect":false,"$$hashKey":"object:3279"}],"media":[{"id":566752436,"src":"/assets/public/content/2_1466487176189.jpg","assetId":"do_20072814","type":"image","preload":false},{"id":576331075,"src":"/assets/public/content/2_1466487176189.jpg","assetId":"do_20072814","type":"image","preload":false},{"id":94711675,"src":"/assets/public/content/145503359952511.mp3","assetId":"11_sound","type":"audio","preload":false}]}',
            },
            config: {
              __cdata:
                '{"metadata":{"category":"MCQ","title":"test image and audio for the image","language":["English"],"qlevel":"EASY","gradeLevel":["Kindergarten"],"concepts":["BIO3"],"description":"test","max_score":1},"max_time":0,"max_score":1,"partial_scoring":false,"layout":"Horizontal","isShuffleOption":false}',
            },
            w: 80,
            h: 85,
            x: 9,
            y: 6,
          },
        ],
      };
      expect(v2ecml[org.ekstep.question]).toEqual(
        expectedEcml[org.ekstep.question]
      );
    });
    it("should call add media 3 times for v2Data", function () {
      plugin.data = v2Data;
      plugin.toECML();

      expect(plugin.addMedia.calls.count()).toBe(3);
    });
  });

  describe("createEcmlStructureV1", function () {
    beforeEach(function () {
      plugin.data = v1Data;
    });

    it("should call createEcmlStructureV1", function () {
      var controller = {};
      controller = plugin.createEcmlStructureV1(plugin.data[0]);
      expect(controller).toContain("questionnaire");
      expect(controller).toContain("template");
      expect(controller).toEqual(JSON.stringify(v1DataQuestion));
    });
  });

  describe("get config", function () {
    it("should return config object", function () {
      var result = plugin.getConfig();
      var actualProps = Object.keys(result);
      var expectedProps = [
        "title",
        "max_score",
        "allow_skip",
        "show_feedback",
        "shuffle_questions",
        "shuffle_options",
        "total_items",
        "btn_edit",
      ];
      expect(actualProps).toEqual(expectedProps);
    });
  });

  describe("openQuestionBank function", function () {
    var event, callback, data;

    it("should open question bank popup when creating question set", function () {
      event = { target: undefined, type: "org.ekstep.questionset:showPopup" };
      callback = undefined;
      data = undefined;
      plugin.openQuestionBank(event, callback);
      expect(ecEditor.dispatchEvent).toHaveBeenCalledWith(
        "org.ekstep.questionbank:showpopup",
        { callback: callback, data: data }
      );
    });

    it("should open question bank popup when editing question set", function (done) {
      plugin.data = newData;
      data1 = { data: plugin.data, config: plugin.config };
      var callback = { data: data1, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        event = { target: undefined, type: "org.ekstep.questionset:showPopup" };
        callback = { type: "questionset", callback: function () {} };
        data = { data: plugin.data, config: plugin.config };
        instance.openQuestionBank(event, callback);
        expect(ecEditor.dispatchEvent).toHaveBeenCalledWith(
          "org.ekstep.questionbank:showpopup",
          { callback: callback.callback, data: data }
        );
        done();
      }, 500);
    });
  });

  describe("on config change in sidebar", function () {
    beforeEach(function () {
      plugin.data = v2Data1;
      plugin.editorObj = {
        _objects: [
          {
            type: "image",
            originX: "left",
            originY: "top",
            left: -392.5,
            top: -256.5,
            width: 785,
            height: 513,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            src: "http://localhost:3000/plugins/org.ekstep.questionset-1.0/editor/assets/quizimage.png",
            filters: [],
            resizeFilters: [],
          },
          {
            type: "group",
            originX: "left",
            originY: "top",
            left: -359.5,
            top: -235.65,
            width: 125.66,
            height: 31.56,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            _objects: [
              {
                type: "text",
                originX: "left",
                originY: "top",
                left: -62.83,
                top: -15.78,
                width: 10.83,
                height: 16.95,
                fill: "black",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
              },
              {
                type: "text",
                originX: "left",
                originY: "top",
                left: -62.83,
                top: 1.22,
                width: 72.33,
                height: 13.56,
                fill: "black",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
              },
              {
                type: "text",
                originX: "left",
                originY: "top",
                left: 22.17,
                top: 1.22,
                width: 39.66,
                height: 13.56,
                fill: "black",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
              },
            ],
          },
        ],
      };
    });

    it("should set question title to question set", function () {
      plugin.editorObj._objects[1]._objects[0].setText =
        jasmine.createSpy("setText");
      plugin.onConfigChange("title", "question set");
      expect(plugin.config.title).toEqual("question set");
    });
    it("should set total_items to 2", function () {
      plugin.editorObj._objects[1]._objects[1].setText =
        jasmine.createSpy("setText");
      plugin.onConfigChange("total_items", 2);
      expect(plugin.config.total_items).toEqual(2);
    });
    it("should  set max_score to 2", function () {
      plugin.editorObj._objects[1]._objects[2].setText =
        jasmine.createSpy("setText");
      plugin.onConfigChange("max_score", 2);
      expect(plugin.config.max_score).toEqual(2);
    });
    it("should call render", function () {
      plugin.onConfigChange("shuffle_questions", false);
      expect(ecEditor.render).toHaveBeenCalled();
    });
    it("should set shuffle_questions to be false", function () {
      plugin.onConfigChange("shuffle_questions", false);
      expect(plugin.config.shuffle_questions).toBeFalsy();
    });
    it("should set show_feedback to be false", function () {
      plugin.onConfigChange("show_feedback", false);
      expect(plugin.config.show_feedback).toBeFalsy();
    });
    it("should set optionShuffle to be false", function () {
      plugin.onConfigChange("optionShuffle", true);
      expect(plugin.config.optionShuffle).toBeTruthy();
    });
    it("should set shuffle_questions to be false", function () {
      plugin.onConfigChange("btn_edit", "Edit");
      expect(ecEditor.dispatchEvent).toHaveBeenCalledWith("delete:invoke");
    });
    it("shuffle multiple question config change", function (done) {
      var callback = { data: multiData, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        config.initialize();
        var modData = {
          newValue: {
            title: "test",
            max_score: 2,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: true,
            shuffle_options: false,
            total_items: 2,
            btn_edit: "Edit",
          },
          oldValue: {
            title: "test",
            max_score: 2,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 2,
            btn_edit: "Edit",
          },
        };
        ecEditor.dispatchEvent("config:updateValue", modData, instance);
        expect(ecEditor.dispatchEvent).toHaveBeenCalledWith(
          "org.ekstep.toaster:info",
          {
            title:
              "Each question will carry equal weightage of 1 mark when using Shuffle. To provide different weightage to individual questions please turn off Shuffle.",
            position: "topCenter",
          }
        );
        done();
      }, 500);
    });
  });
  describe("Get Summery", function () {
    it("Get question summery", function (done) {
      var callback = { data: multiData, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        spyOn(instance, "toECML").and.callThrough();
        ecEditor.dispatchEvent("org.ekstep.viewecml:show", {}, undefined);
        var summery = instance.getSummary();
        expect(summery.totalQuestions).toEqual(2);
        expect(summery.totalScore).toEqual(2);
        done();
      }, 500);
    });
  });
  xdescribe("ToECML", function () {
    var scope, $location, createController;
    beforeAll(function () {
      angular.module("editorApp").controller("popupController", [
        "$scope",
        "ngDialog",
        "$ocLazyLoad",
        "$templateCache",
        function ($scope, ngDialog, $ocLazyLoad, $templateCache) {
          function loadNgModules(
            templatePath,
            controllerPath,
            allowTemplateCache
          ) {
            if (!allowTemplateCache) {
              return $ocLazyLoad.load([
                { type: "html", path: templatePath },
                {
                  type: "js",
                  path:
                    controllerPath + "?" + ecEditor.getConfig("build_number"),
                },
              ]);
            } else {
              if (angular.isString(templatePath) && templatePath.length > 0) {
                angular.forEach(angular.element(templatePath), function (node) {
                  if (
                    node.nodeName === "SCRIPT" &&
                    node.type === "text/ng-template"
                  ) {
                    $templateCache.put(node.id, node.innerHTML);
                  }
                });
              }
            }
          }

          function openModal(config, callback) {
            if (config && callback) config.preCloseCallback = callback;
            if (config) ngDialog.open(config);
          }

          function init() {
            $scope.$on("ngDialog.closing", function () {
              org.ekstep.services.telemetryService.interact({
                type: "hide",
                subtype: "close",
                target: "popup",
                pluginid: "",
                pluginver: "",
                objectid: "",
                stage: ecEditor.getCurrentStage().id,
              });
            });
          }

          init();
          $scope.as = function () {
            org.ekstep.contenteditor.api
              .getService("popup")
              .initService(loadNgModules, openModal);
          };
        },
      ]);
    });
    beforeEach(module("editorApp"));
    var $controller, $rootScope;
    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));
    it("Get question summery", function (done) {
      var $scope = $rootScope.$new();
      var controller = $controller("popupController", { $scope: $scope });
      $scope.as();
      console.log(
        window.location.href,
        "-----testing window location----------------"
      );

      var callback = { data: multiData, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var localContext = {
          $window: {
            location: {
              href: "http://localhost:3000/app/?contentId=do_212510946870812672120616",
            },
          },
        };
        with (localContext) {
          org.ekstep.pluginframework.config.build_number = 1;
          var instance = stage.children[stage.children.length - 1];
          spyOn(instance, "toECML").and.callThrough();
          ecEditor.dispatchEvent("org.ekstep.viewecml:show", {}, undefined);
          var summery = instance.getSummary();
          expect(summery.totalQuestions).toEqual(2);
          expect(summery.totalScore).toEqual(2);
          console.log(
            $window.location.href,
            "-----testing window location----------------"
          );
          // expect(instance.toECML).toHaveBeenCalled();
          done();
        }
      }, 500);
    });
    it("should set total_items to 1", function (done) {
      var callback = { data: multiData, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        config.initialize();
        var modData = {
          newValue: {
            title: "Newtest",
            max_score: 2,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: true,
            shuffle_options: false,
            total_items: 1,
            btn_edit: "Edit",
          },
          oldValue: {
            title: "test",
            max_score: 2,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 2,
            btn_edit: "Edit",
          },
        };
        ecEditor.dispatchEvent("config:updateValue", modData, instance);
        expect(plugin.config.total_items).toEqual(1);
        done();
      }, 500);
    });
    it("should  set max_score to 1", function (done) {
      var callback = { data: multiData, callBack: undefined };
      ecEditor.dispatchEvent("org.ekstep.questionset:addQS", callback);
      setTimeout(function _expect() {
        var instance = stage.children[stage.children.length - 1];
        config.initialize();
        var modData = {
          newValue: {
            title: "Newtest",
            max_score: 1,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: true,
            shuffle_options: false,
            total_items: 2,
            btn_edit: "Edit",
          },
          oldValue: {
            title: "test",
            max_score: 2,
            allow_skip: true,
            show_feedback: true,
            shuffle_questions: false,
            shuffle_options: false,
            total_items: 2,
            btn_edit: "Edit",
          },
        };
        ecEditor.dispatchEvent("config:updateValue", modData, instance);
        expect(plugin.config.max_score).toEqual(1);
        done();
      }, 500);
    });
  });
});
//# sourceURL=questionsetPlugin.spec.js
