describe("Sunbird metadata plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance;
    
    beforeAll(function(done) {
        CollectionEditorTestFramework.init(function() {
            manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.sunbirdmetadata");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.sunbirdmetadata");
            done();
        })
    });
    it("Should initialize the plugin and register the event",function(done){
        spyOn(pluginInstance, "initialize").and.callThrough();
        pluginInstance.initialize();
        expect(pluginInstance.initialize).toHaveBeenCalled();
        expect(pluginInstance.initialize.calls.count()).toEqual(1);
        expect(pluginInstance.initialize.calls.count()).not.toBeGreaterThan(1);
        expect(EventBus.hasEventListener('editor:form:cancel')).toBe(true);
        done();
    });

    it("Should invoke method called to render metadataform",function(done){
        var event = {"type":"org.ekstep.editcontentmeta:showpopup"};
        var config = {"action":"save","subType":"textbook","framework":"NCF","rootOrgId":"b00bc992ef25f1a9a8d63291e20efc8d","type":"content","popup":true,"editMode":true};
        spyOn(pluginInstance, "invoke").and.callThrough();
        pluginInstance.invoke(event, config);
        expect(pluginInstance.invoke).toHaveBeenCalled();
        expect(pluginInstance.invoke).not.toBeUndefined();
        done();
    });

    it("Should onConfigChange method",function(done){
        var event = {"type":"org.ekstep.editcontentmeta:showpopup"};
        var config = {};
        spyOn(pluginInstance, "onConfigChange").and.callThrough();
        pluginInstance.onConfigChange(event, config);
        expect(pluginInstance.onConfigChange).toHaveBeenCalled();
        expect(pluginInstance.onConfigChange).not.toBeUndefined();
        done();
    });

    it("Should invoke successAction method after saving form data",function(done){
        var event = {"type":"editor:form:success"};
        var data = {"formData": {"metaData":{"ownedBy":"do_112599081812180992167","appIcon":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1122027950982266881377/artifact/images_1489599011195.jpeg","board":"NCERT","gradeLevel":["Class 1"],"subject":"Mathematics","medium":"English","year":"2009","name":"Textbook-19th-12","contentType":"TextBook","mimeType":"application/vnd.ekstep.content-collection","ownershipType":["createdFor"],"owner":"ekstep"}}, "isValid": true};
        spyOn(pluginInstance, "successAction").and.callThrough();
        pluginInstance.successAction(event, data);
        expect(pluginInstance.successAction).toHaveBeenCalled();
        expect(pluginInstance.successAction).not.toBeUndefined();
        done();
    });

    it("Should not save data and successAction method thrown error",function(done){
        pluginInstance.config = {};
        pluginInstance.config.action = "save";
        var event = {"type":"editor:form:success"};
        var data = {"formData": {"metaData":{"ownedBy":"do_112599081812180992167","appIcon":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1122027950982266881377/artifact/images_1489599011195.jpeg","board":"NCERT","gradeLevel":["Class 1"],"subject":"Mathematics","medium":"English","year":"2009","name":"Textbook-19th-12","contentType":"TextBook","mimeType":"application/vnd.ekstep.content-collection","ownershipType":["createdFor"],"owner":"ekstep"}}, "isValid": false};
        spyOn(pluginInstance, "successAction").and.callThrough();
        pluginInstance.successAction(event, data);
        expect(pluginInstance.successAction).toHaveBeenCalled();
        expect(pluginInstance.successAction).not.toBeUndefined();
        done();
    });

    it("Should cancelAction method to cancle save action",function(done){
        var event = {"type":"org.ekstep.editcontentmeta:cancel"};
        var data = {callback(){}};
        spyOn(pluginInstance, "cancelAction").and.callThrough();
        pluginInstance.cancelAction(event, data);
        expect(pluginInstance.cancelAction).toHaveBeenCalled();
        expect(pluginInstance.cancelAction).not.toBeUndefined();
        done();
    });

    it("Should updateState method to load template",function(done){
        var object = {"metaData": {"ownedBy":"do_21256981223442841614868","board":"NCERT","gradeLevel":["KG"],"subject":"English","year":"2004","name":"Textbook-19th-12","contentType":"TextBook","mimeType":"application/vnd.ekstep.content-collection","ownershipType":["createdFor"],"owner":"sunbird"}};
        spyOn(pluginInstance, "updateState").and.callThrough();
        pluginInstance.updateState(object);
        expect(pluginInstance.updateState).toHaveBeenCalled();
        done();
    });

    it("Should invoke reviewContent method after review ",function(done){
        var data = {};
        var value = {callback: function() {}};
        spyOn(pluginInstance, "reviewContent").and.callThrough();
        pluginInstance.reviewContent(data, value);
        expect(pluginInstance.reviewContent).toHaveBeenCalled();
        expect(pluginInstance.reviewContent).not.toBeUndefined();
        done();
    });

    it("Should invoke renderForm method to reder form details",function(done){
        var ispopup = true;
        var config = {"resourceBundle":{},"framework":{"identifier":"NCF","code":"NCF","name":"State (Uttar Pradesh)","description":"NCF ","graph_id":"domain","nodeType":"DATA_NODE","type":"K-12","node_id":21979,"objectType":"Framework","categories":[{"identifier":"ncf_board","code":"board","terms":[{"associations":[{"identifier":"ncf_gradelevel_kindergarten","code":"kindergarten","translations":null,"name":"KG","description":"KG","category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade1","code":"grade1","translations":null,"name":"Class 1","description":"Class 1","category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade2","code":"grade2","translations":null,"name":"Class 2","description":"Class 2","category":"gradeLevel","status":"Live"},{"identifier":"ncf_gradelevel_grade4","code":"grade4","translations":null,"name":"Class 4","description":"Class 4","category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade3","code":"grade3","translations":null,"name":"Class 3","description":"Class 3","category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade5","code":"grade5","translations":null,"name":"Class 5","description":"Class 5","category":"gradelevel","status":"Live"}],"identifier":"ncf_board_ncert","code":"ncert","translations":null,"name":"NCERT","description":"","index":1,"category":"board","status":"Live"},{"identifier":"ncf_board_cbse","code":"cbse","translations":null,"name":"CBSE","description":"","index":2,"category":"board","status":"Live"},{"identifier":"ncf_board_icse","code":"icse","translations":null,"name":"ICSE","description":"","index":3,"category":"board","status":"Live"},{"identifier":"ncf_board_upboard","code":"upboard","translations":null,"name":"State (Uttar Pradesh)","description":"State (Uttar Pradesh)","index":4,"category":"board","status":"Live"},{"identifier":"ncf_board_apboard","code":"apboard","translations":null,"name":"State (Andhra Pradesh)","description":"State (Andhra Pradesh)","index":5,"category":"board","status":"Live"},{"identifier":"ncf_board_tnboard","code":"tnboard","translations":null,"name":"State (Tamil Nadu)","description":"State (Tamil Nadu)","index":6,"category":"board","status":"Live"},{"identifier":"ncf_board_ncte","code":"ncte","translations":null,"name":"NCTE","description":"","index":7,"category":"board","status":"Live"},{"identifier":"ncf_board_mscert","code":"mscert","translations":null,"name":"State (Maharashtra)","description":"State (Maharashtra)","index":8,"category":"board","status":"Live"},{"identifier":"ncf_board_bser","code":"bser","translations":null,"name":"State (Rajasthan)","description":"State (Rajasthan)","index":9,"category":"board","status":"Live"},{"identifier":"ncf_board_others","code":"others","translations":null,"name":"Other","description":"Other","index":10,"category":"board","status":"Live"}],"translations":null,"name":"Curriculum","description":"","index":1,"status":"Live"},{"identifier":"ncf_gradelevel","code":"gradeLevel","terms":[{"identifier":"ncf_gradelevel_kindergarten","code":"kindergarten","translations":null,"name":"KG","description":"KG","index":1,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade1","code":"grade1","translations":null,"name":"Class 1","description":"Class 1","index":2,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade2","code":"grade2","translations":null,"name":"Class 2","description":"Class 2","index":3,"category":"gradeLevel","status":"Live"},{"identifier":"ncf_gradelevel_grade3","code":"grade3","translations":null,"name":"Class 3","description":"Class 3","index":4,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade4","code":"grade4","translations":null,"name":"Class 4","description":"Class 4","index":5,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade5","code":"grade5","translations":null,"name":"Class 5","description":"Class 5","index":6,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade6","code":"grade6","translations":null,"name":"Class 6","description":"Class 6","index":7,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade7","code":"grade7","translations":null,"name":"Class 7","description":"Class 7","index":8,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade8","code":"grade8","translations":null,"name":"Class 8","description":"Class 8","index":9,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade9","code":"grade9","translations":null,"name":"Class 9","description":"Class 9","index":10,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade10","code":"grade10","translations":null,"name":"Class 10","description":"Class 10","index":11,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade11","code":"grade11","translations":null,"name":"Class 11","description":"Class 11","index":12,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade12","code":"grade12","translations":null,"name":"Class 12","description":"Class 12","index":13,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_others","code":"others","translations":null,"name":"Other","description":"","index":14,"category":"gradeLevel","status":"Live"}],"translations":null,"name":"Class","description":"","index":2,"status":"Live"},{"identifier":"ncf_subject","code":"subject","terms":[{"identifier":"ncf_subject_mathematics","code":"mathematics","translations":null,"name":"Mathematics","description":"","index":1,"category":"subject","status":"Live"},{"identifier":"ncf_subject_english","code":"english","translations":null,"name":"English","description":"","index":2,"category":"subject","status":"Live"},{"identifier":"ncf_subject_tamil","code":"tamil","translations":null,"name":"Tamil","description":"","index":3,"category":"subject","status":"Live"},{"identifier":"ncf_subject_telugu","code":"telugu","translations":null,"name":"Telugu","description":"","index":4,"category":"subject","status":"Live"},{"identifier":"ncf_subject_geography","code":"geography","translations":null,"name":"Geography","description":"","index":5,"category":"subject","status":"Live"},{"identifier":"ncf_subject_urdu","code":"urdu","translations":null,"name":"Urdu","description":"","index":6,"category":"subject","status":"Live"},{"identifier":"ncf_subject_kannada","code":"kannada","translations":null,"name":"Kannada","description":"","index":7,"category":"subject","status":"Live"},{"identifier":"ncf_subject_assamese","code":"assamese","translations":null,"name":"Assamese","description":"","index":8,"category":"subject","status":"Live"},{"identifier":"ncf_subject_physics","code":"physics","translations":null,"name":"Physics","description":"","index":9,"category":"subject","status":"Live"},{"identifier":"ncf_subject_chemistry","code":"chemistry","translations":null,"name":"Chemistry","description":"","index":10,"category":"subject","status":"Live"},{"identifier":"ncf_subject_hindi","code":"hindi","translations":null,"name":"Hindi","description":"","index":11,"category":"subject","status":"Live"},{"identifier":"ncf_subject_marathi","code":"marathi","translations":null,"name":"Marathi","description":"","index":12,"category":"subject","status":"Live"},{"identifier":"ncf_subject_environmentalstudies","code":"environmentalstudies","translations":null,"name":"EvS","description":"EvS","index":13,"category":"subject","status":"Live"},{"identifier":"ncf_subject_politicalscience","code":"politicalscience","translations":null,"name":"Political Science","description":"","index":14,"category":"subject","status":"Live"},{"identifier":"ncf_subject_bengali","code":"bengali","translations":null,"name":"Bengali","description":"","index":15,"category":"subject","status":"Live"},{"identifier":"ncf_subject_history","code":"history","translations":null,"name":"History","description":"","index":16,"category":"subject","status":"Live"},{"identifier":"ncf_subject_gujarati","code":"gujarati","translations":null,"name":"Gujarati","description":"","index":17,"category":"subject","status":"Live"},{"identifier":"ncf_subject_biology","code":"biology","translations":null,"name":"Biology","description":"","index":18,"category":"subject","status":"Live"},{"identifier":"ncf_subject_oriya","code":"oriya","translations":null,"name":"Odia","description":"Odia","index":19,"category":"subject","status":"Live"},{"identifier":"ncf_subject_punjabi","code":"punjabi","translations":null,"name":"Punjabi","description":"","index":20,"category":"subject","status":"Live"},{"identifier":"ncf_subject_nepali","code":"nepali","translations":null,"name":"Nepali","description":"","index":21,"category":"subject","status":"Live"},{"identifier":"ncf_subject_malayalam","code":"malayalam","translations":null,"name":"Malayalam","description":"","index":22,"category":"subject","status":"Live"},{"identifier":"ncf_subject_socialstudies","code":"socialstudies","translations":null,"name":"Social Studies","description":"Social Studies","index":23,"category":"subject","status":"Live"},{"identifier":"ncf_subject_science","code":"science","translations":null,"name":"Science","description":"Science","index":24,"category":"subject","status":"Live"},{"identifier":"ncf_subject_sanskrit","code":"sanskrit","translations":null,"name":"Sanskrit","description":"Sanskrit","index":25,"category":"subject","status":"Live"},{"identifier":"ncf_subject_healthandphysicaleducation","code":"healthandphysicaleducation","translations":null,"name":"Health and Physical Education","description":"Health and Physical Education","index":26,"category":"subject","status":"Live"},{"identifier":"ncf_subject_economics","code":"economics","translations":null,"name":"Economics","description":"Economics","index":27,"category":"subject","status":"Live"}],"translations":null,"name":"Resource","description":"Resource","index":3,"status":"Live"},{"identifier":"ncf_medium","code":"medium","terms":[{"identifier":"ncf_medium_english","code":"english","translations":null,"name":"English","description":"","index":1,"category":"medium","status":"Live"},{"identifier":"ncf_medium_hindi","code":"hindi","translations":null,"name":"Hindi","description":"","index":2,"category":"medium","status":"Live"},{"identifier":"ncf_medium_oriya","code":"oriya","translations":null,"name":"Odia","description":"Odia","index":3,"category":"medium","status":"Live"},{"identifier":"ncf_medium_telugu","code":"telugu","translations":null,"name":"Telugu","description":"","index":4,"category":"medium","status":"Live"},{"identifier":"ncf_medium_kannada","code":"kannada","translations":null,"name":"Kannada","description":"","index":5,"category":"medium","status":"Live"},{"identifier":"ncf_medium_marathi","code":"marathi","translations":null,"name":"Marathi","description":"","index":6,"category":"medium","status":"Live"},{"identifier":"ncf_medium_assamese","code":"assamese","translations":null,"name":"Assamese","description":"","index":7,"category":"medium","status":"Live"},{"identifier":"ncf_medium_bengali","code":"bengali","translations":null,"name":"Bengali","description":"","index":8,"category":"medium","status":"Live"},{"identifier":"ncf_medium_gujarati","code":"gujarati","translations":null,"name":"Gujarati","description":"","index":9,"category":"medium","status":"Live"},{"identifier":"ncf_medium_urdu","code":"urdu","translations":null,"name":"Urdu","description":"","index":10,"category":"medium","status":"Live"},{"identifier":"ncf_medium_other","code":"other","translations":null,"name":"Other","description":"","index":11,"category":"medium","status":"Live"}],"translations":null,"name":"Medium","description":"","index":4,"status":"Live"},{"identifier":"ncf_topic","code":"topic","terms":[{"identifier":"ncf_topic_leadership_management","code":"leadership_management","translations":null,"name":"Leadership Management","description":"Leadership Management","index":1,"category":"topic","status":"Live"},{"identifier":"ncf_topic_health_education","code":"health_education","translations":null,"name":"Health Education","description":"Health Education","index":2,"category":"topic","status":"Live"},{"identifier":"ncf_topic_personal_development","code":"personal_development","translations":null,"name":"Personal Development","description":"Personal Development","index":3,"category":"topic","status":"Live"}],"translations":null,"name":"Topic","description":"Topic","index":5,"status":"Live"}]},"formConfig":{"templateName":"defaultTemplate","action":"save","fields":[{"code":"appicon","dataType":"url","description":"App Icon","editable":true,"index":1,"inputType":"file","label":"App Icon","name":"App Icon","placeholder":"App Icon","renderingHints":{},"required":false,"visible":true},{"code":"name","dataType":"text","description":"Title of the content","editable":true,"index":2,"inputType":"text","label":"Title","name":"Title","placeholder":"Enter Title For Book","renderingHints":{},"required":true,"visible":true},{"code":"description","dataType":"text","description":"Brief description","editable":true,"index":3,"inputType":"textarea","label":"Description","name":"Description","placeholder":"Brief description about the Book","renderingHints":{},"required":false,"visible":true},{"code":"keywords","dataType":"list","description":"Keywords for the content","editable":true,"index":4,"inputType":"keywordsuggestion","label":"keywords","name":"Keywords","placeholder":"Enter Keywords","required":false,"visible":true},{"code":"board","dataType":"text","description":"Curriculum","editable":true,"index":5,"inputType":"select","label":"Curriculum","name":"Curriculum","placeholder":"Select Curriculum","renderingHints":{},"required":false,"visible":true},{"code":"gradeLevel","dataType":"list","description":"Class","editable":true,"index":6,"inputType":"multiselect","label":"Class","name":"Class","placeholder":"Select Class","renderingHints":{},"required":false,"visible":true},{"code":"subject","dataType":"text","description":"","editable":true,"index":7,"inputType":"select","label":"Subject","name":"Subject","placeholder":"Select Subject","renderingHints":{},"required":false,"visible":true},{"code":"medium","dataType":"text","description":"","editable":true,"index":8,"inputType":"select","label":"Medium","name":"medium","placeholder":"Select Medium","renderingHints":{},"required":false,"visible":true},{"code":"topic","dataType":"list","description":"Choose a Topics","editable":true,"index":9,"inputType":"topicselector","label":"Topics","name":"Topic","placeholder":"Choose Topics","renderingHints":{},"required":false,"visible":true},{"code":"year","dataType":"text","description":"","editable":true,"index":10,"inputType":"select","label":"Year","name":"Year","placeholder":"Select Year","renderingHints":{},"required":false,"visible":true},{"code":"publisher","dataType":"text","description":"Publication","editable":true,"index":11,"inputType":"text","label":"Publisher","name":"Publisher","placeholder":"Publication","renderingHints":{},"required":false,"visible":true},{"code":"attributions","dataType":"list","description":"Attributions","editable":true,"index":12,"inputType":"text","label":"Attributions","name":"attribution","placeholder":"","renderingHints":{},"required":false,"visible":true},{"code":"audience","dataType":"list","description":"","editable":true,"index":13,"inputType":"select","label":"Audience","name":"Audience","placeholder":"Select Audience","renderingHints":{},"range":["Learner","Instructor"],"required":false,"visible":true},{"code":"dialcode","dataType":"list","description":"Dialcode","editable":true,"index":14,"inputType":"dialcode","label":"Dialcode","name":"Dialcode","placeholder":"Enter Dialcode","renderingHints":{},"required":false,"visible":true}]}}
        spyOn(pluginInstance, "renderForm").and.callThrough();
        pluginInstance.renderForm(ispopup, config);
        expect(pluginInstance.renderForm).toHaveBeenCalled();
        done();
    });

    it("Should invoke getModel method to load model",function(done){
        spyOn(pluginInstance, "getModel").and.callThrough();
        pluginInstance.getModel();
        expect(pluginInstance.getModel).toHaveBeenCalled();
        done();
    });

    it("Should invoke getMappedResponse method which return mapresponse object",function(done){
        spyOn(pluginInstance, "getMappedResponse").and.callThrough();
        pluginInstance.getMappedResponse();
        expect(pluginInstance.getMappedResponse).toHaveBeenCalled();
        done();
    });

    it("Should invoke mapResponse method which return mapresponse object",function(done){
        var type = "textbook";
        var action = "save";
        var value = {};
        spyOn(pluginInstance, "mapResponse").and.callThrough();
        pluginInstance.mapResponse(type, action, value);
        expect(pluginInstance.mapResponse).toHaveBeenCalled();
        done();
    });

    it("Should invoke returnConfigs method which return congig object",function(done){
        var event = {"type":"org.ekstep.editcontentmeta:cancel"};
        var data = {"data":"data"};
        spyOn(pluginInstance, "returnConfigs").and.callThrough();
        pluginInstance.returnConfigs(event, data);
        expect(pluginInstance.returnConfigs).toHaveBeenCalled();
        done();
    });

    it('save content', function(done){
        spyOn(pluginInstance, 'saveContent').and.callThrough();
        spyOn(ecEditor, 'dispatchEvent');
        let contentMeta = { mimeType: 'application/vnd.ekstep.ecml-archive'}
        pluginInstance.options = {};
        pluginInstance.eventMap = {save: ''};
        pluginInstance.saveContent(contentMeta, jasmine.any(Function));
        expect(pluginInstance.options.contentMeta).toEqual(contentMeta);
        expect(pluginInstance.options.callback).toEqual(jasmine.any(Function));
        expect(ecEditor.dispatchEvent).toHaveBeenCalledWith(pluginInstance.eventMap['save'], pluginInstance.options);
        done();
    });

      
});