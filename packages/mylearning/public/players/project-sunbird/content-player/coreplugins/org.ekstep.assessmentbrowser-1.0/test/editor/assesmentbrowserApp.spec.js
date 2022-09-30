describe("Ekstep Assesment Browser Plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance;
    var instance = { manifest: {id: "org.ekstep.assessmentbrowser", ver: "1.0"}, "data":""};
    
    beforeAll(function(done) {
        CollectionEditorTestFramework.init(function() {
            manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.assessmentbrowser");
            path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/assessmentbrowserapp.js");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.assessmentbrowser");
            var templatePath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/assessmentbrowser.html");
            var controllerPath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/assessmentbrowserapp.js");
            ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
            ecEditor.getCurrentStage = jasmine.createSpy().and.callFake(function() {
                return { id: '5437859-543758937' }
            });
            ecEditor.getContext = jasmine.createSpy().and.callFake(function() {
                return "do_1143535346658585";
            });
            done();
        })
    })
    it('mock popup service', function(done) {
        angular.mock.module('oc.lazyLoad');
        angular.mock.module('Scope.safeApply');
        inject(function($ocLazyLoad, _$rootScope_, _$controller_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $ocLazyLoad.load([{
                type: 'js',
                path: path
            }]).then(function() {
                ctrl = $controller("assessmentbrowsercontroller", {
                    $scope: $scope,
                    instance: instance
                });
                $scope.closeThisDialog = jasmine.createSpy().and.callFake(function() {
                    console.log("POPUP CLOSED")
                })
                done();
            }, function(error) {
                done();
            });
            setInterval(function() {
                _$rootScope_.$digest();
            }, 10);
        });
    });
    describe('Quiz plugin test cases', function() {

        it('Should invoke Meta Services and get Category Data', function(done) {
            var respCat = {"data": {"id":"ekstep.learning.framework.read","ver":"1.0","ts":"2018-06-01T11:35:01ZZ","params":{"resmsgid":"fc139cb7-d62c-4a90-ab2c-3b02cba7e002","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"framework":{"owner":"in.ekstep","identifier":"NCF","code":"NCF","consumerId":"fa271a76-c15a-4aa1-adff-31dd04682a1f","channel":"in.ekstep","description":"NCFCOPY ","type":"K-12","createdOn":"2018-01-23T17:07:56.405+0000","versionKey":"1525806108265","channels":[{"identifier":"ORG_001","name":"Org 001","objectType":"Channel","relation":"hasSequenceMember","description":"Channel for Org 001","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null},{"identifier":"in.ekstep","name":"Ekstep","objectType":"Channel","relation":"hasSequenceMember","description":"Channel for in.ekstep","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"appId":"ekstep_portal","name":"NCF framework","lastUpdatedOn":"2018-05-08T19:01:48.265+0000","categories":[{"identifier":"ncf_board","code":"board","terms":[{"identifier":"ncf_board_ncert","code":"ncert","name":"NCERT","description":"","index":1,"category":"board","status":"Live"},{"identifier":"ncf_board_cbse","code":"cbse","name":"CBSE","description":"","index":2,"category":"board","status":"Live"},{"identifier":"ncf_board_icse","code":"icse","name":"ICSE","description":"","index":3,"category":"board","status":"Live"},{"identifier":"ncf_board_upboard","code":"upboard","name":"State (Uttar Pradesh)","description":"State (Uttar Pradesh)","index":4,"category":"board","status":"Live"},{"identifier":"ncf_board_apboard","code":"apboard","name":"State (Andhra Pradesh)","description":"State (Andhra Pradesh)","index":5,"category":"board","status":"Live"},{"identifier":"ncf_board_tnboard","code":"tnboard","name":"State (Tamil Nadu)","description":"State (Tamil Nadu)","index":6,"category":"board","status":"Live"},{"identifier":"ncf_board_ncte","code":"ncte","name":"NCTE","description":"","index":7,"category":"board","status":"Live"},{"identifier":"ncf_board_mscert","code":"mscert","name":"State (Maharashtra)","description":"State (Maharashtra)","index":8,"category":"board","status":"Live"},{"identifier":"ncf_board_bser","code":"bser","name":"State (Rajasthan)","description":"State (Rajasthan)","index":9,"category":"board","status":"Live"},{"identifier":"ncf_board_others","code":"others","name":"Other","description":"Other","index":10,"category":"board","status":"Live"}],"name":"Curriculum","description":"","index":1,"status":"Live"},{"identifier":"ncf_gradelevel","code":"gradeLevel","terms":[{"identifier":"ncf_gradelevel_kindergarten","code":"kindergarten","name":"KG","description":"KG","index":1,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade1","code":"grade1","name":"Class 1","description":"Class 1","index":2,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade2","code":"grade2","name":"Class 2","description":"Class 2","index":3,"category":"gradeLevel","status":"Live"},{"identifier":"ncf_gradelevel_grade3","code":"grade3","name":"Class 3","description":"Class 3","index":4,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade4","code":"grade4","name":"Class 4","description":"Class 4","index":5,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade5","code":"grade5","name":"Class 5","description":"Class 5","index":6,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade6","code":"grade6","name":"Class 6","description":"Class 6","index":7,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade7","code":"grade7","name":"Class 7","description":"Class 7","index":8,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade8","code":"grade8","name":"Class 8","description":"Class 8","index":9,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade9","code":"grade9","name":"Class 9","description":"Class 9","index":10,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade10","code":"grade10","name":"Class 10","description":"Class 10","index":11,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade11","code":"grade11","name":"Class 11","description":"Class 11","index":12,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_grade12","code":"grade12","name":"Class 12","description":"Class 12","index":13,"category":"gradelevel","status":"Live"},{"identifier":"ncf_gradelevel_others","code":"others","name":"Other","description":"","index":14,"category":"gradeLevel","status":"Live"}],"name":"Class","description":"","index":2,"status":"Live"},{"identifier":"ncf_subject","code":"subject","terms":[{"identifier":"ncf_subject_mathematics","code":"mathematics","name":"Mathematics","description":"","index":1,"category":"subject","status":"Live"},{"identifier":"ncf_subject_english","code":"english","name":"English","description":"","index":2,"category":"subject","status":"Live"},{"identifier":"ncf_subject_tamil","code":"tamil","name":"Tamil","description":"","index":3,"category":"subject","status":"Live"},{"identifier":"ncf_subject_telugu","code":"telugu","name":"Telugu","description":"","index":4,"category":"subject","status":"Live"},{"identifier":"ncf_subject_geography","code":"geography","name":"Geography","description":"","index":5,"category":"subject","status":"Live"},{"identifier":"ncf_subject_urdu","code":"urdu","name":"Urdu","description":"","index":6,"category":"subject","status":"Live"},{"identifier":"ncf_subject_kannada","code":"kannada","name":"Kannada","description":"","index":7,"category":"subject","status":"Live"},{"identifier":"ncf_subject_assamese","code":"assamese","name":"Assamese","description":"","index":8,"category":"subject","status":"Live"},{"identifier":"ncf_subject_physics","code":"physics","name":"Physics","description":"","index":9,"category":"subject","status":"Live"},{"identifier":"ncf_subject_chemistry","code":"chemistry","name":"Chemistry","description":"","index":10,"category":"subject","status":"Live"},{"identifier":"ncf_subject_hindi","code":"hindi","name":"Hindi","description":"","index":11,"category":"subject","status":"Live"},{"identifier":"ncf_subject_marathi","code":"marathi","name":"Marathi","description":"","index":12,"category":"subject","status":"Live"},{"identifier":"ncf_subject_environmentalstudies","code":"environmentalstudies","name":"EvS","description":"EvS","index":13,"category":"subject","status":"Live"},{"identifier":"ncf_subject_politicalscience","code":"politicalscience","name":"Political Science","description":"","index":14,"category":"subject","status":"Live"},{"identifier":"ncf_subject_bengali","code":"bengali","name":"Bengali","description":"","index":15,"category":"subject","status":"Live"},{"identifier":"ncf_subject_history","code":"history","name":"History","description":"","index":16,"category":"subject","status":"Live"},{"identifier":"ncf_subject_gujarati","code":"gujarati","name":"Gujarati","description":"","index":17,"category":"subject","status":"Live"},{"identifier":"ncf_subject_biology","code":"biology","name":"Biology","description":"","index":18,"category":"subject","status":"Live"},{"identifier":"ncf_subject_oriya","code":"oriya","name":"Odia","description":"Odia","index":19,"category":"subject","status":"Live"},{"identifier":"ncf_subject_punjabi","code":"punjabi","name":"Punjabi","description":"","index":20,"category":"subject","status":"Live"},{"identifier":"ncf_subject_nepali","code":"nepali","name":"Nepali","description":"","index":21,"category":"subject","status":"Live"},{"identifier":"ncf_subject_malayalam","code":"malayalam","name":"Malayalam","description":"","index":22,"category":"subject","status":"Live"},{"identifier":"ncf_subject_socialstudies","code":"socialstudies","name":"Social Studies","description":"Social Studies","index":23,"category":"subject","status":"Live"},{"identifier":"ncf_subject_science","code":"science","name":"Science","description":"Science","index":24,"category":"subject","status":"Live"},{"identifier":"ncf_subject_sanskrit","code":"sanskrit","name":"Sanskrit","description":"Sanskrit","index":25,"category":"subject","status":"Live"},{"identifier":"ncf_subject_healthandphysicaleducation","code":"healthandphysicaleducation","name":"Health and Physical Education","description":"Health and Physical Education","index":26,"category":"subject","status":"Live"},{"identifier":"ncf_subject_economics","code":"economics","name":"Economics","description":"Economics","index":27,"category":"subject","status":"Live"},{"identifier":"ncf_subject_other","code":"other","name":"Other","description":"Other","index":28,"category":"subject","status":"Live"}],"name":"Subject","description":"","index":3,"status":"Live"},{"identifier":"ncf_medium","code":"medium","terms":[{"identifier":"ncf_medium_english","code":"english","name":"English","description":"","index":1,"category":"medium","status":"Live"},{"identifier":"ncf_medium_hindi","code":"hindi","name":"Hindi","description":"","index":2,"category":"medium","status":"Live"},{"identifier":"ncf_medium_oriya","code":"oriya","name":"Odia","description":"Odia","index":3,"category":"medium","status":"Live"},{"identifier":"ncf_medium_telugu","code":"telugu","name":"Telugu","description":"","index":4,"category":"medium","status":"Live"},{"identifier":"ncf_medium_kannada","code":"kannada","name":"Kannada","description":"","index":5,"category":"medium","status":"Live"},{"identifier":"ncf_medium_marathi","code":"marathi","name":"Marathi","description":"","index":6,"category":"medium","status":"Live"},{"identifier":"ncf_medium_assamese","code":"assamese","name":"Assamese","description":"","index":7,"category":"medium","status":"Live"},{"identifier":"ncf_medium_bengali","code":"bengali","name":"Bengali","description":"","index":8,"category":"medium","status":"Live"},{"identifier":"ncf_medium_gujarati","code":"gujarati","name":"Gujarati","description":"","index":9,"category":"medium","status":"Live"},{"identifier":"ncf_medium_tamil","code":"tamil","name":"Tamil","description":"","index":10,"category":"medium","status":"Live"},{"identifier":"ncf_medium_urdu","code":"urdu","name":"Urdu","description":"","index":11,"category":"medium","status":"Live"},{"identifier":"ncf_medium_other","code":"other","name":"Other","description":"","index":12,"category":"medium","status":"Live"}],"name":"Medium","description":"","index":4,"status":"Live"}],"status":"Live"}}}};
            ecEditor.getService('meta').getCategorys = jasmine.createSpy().and.callFake(function(data, callback) {
                return callback(undefined, respCat);
            });
            done();
        });
        
        it('Should invoke Meta Services and get Assesment Data', function(done) {
            var resp = {"data": { "result":{"definition_node":{"identifier":"DEFINITION_NODE_AssessmentItem","objectType":"AssessmentItem","properties":[{"required":true,"dataType":"Text","propertyName":"name","title":"Name","description":"","category":"general","displayProperty":"Editable","range":null,"defaultValue":"","renderingHints":"{'inputType': 'text', 'order': 1}","indexed":true,"draft":false,"rangeValidation":true},{"required":false,"dataType":"Date","propertyName":"versionDate","title":"Version Date","description":"","category":"audit","displayProperty":"Readonly","range":null,"defaultValue":"","renderingHints":"{'order': 24}","indexed":false,"draft":false,"rangeValidation":true},{"required":false,"dataType":"Text","propertyName":"versionCreatedBy","title":"Version Created By","description":"","category":"audit","displayProperty":"Readonly","range":null,"defaultValue":"","renderingHints":"{'order': 25}","indexed":false,"draft":false,"rangeValidation":true}]}}}};
            ecEditor.getService('meta').getDefinitions = jasmine.createSpy().and.callFake(function(data, callback) {
                return callback(undefined, resp);
            });
            done();
        });

        it('Should invoke getResourceBundles method', function(done) {
            var resp = {"assessment":{"type": ["embedded", "mcq", "ftb", "mtf", "recognition", "other"]}};
            var resourceResp ={"data": {"id":"ekstep.config.resourebundles.read","ver":"1.0","ts":"2018-06-04T09:41:30ZZ","params":{"resmsgid":"03de0a76-f7cc-4e2c-a767-047154da49d6","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"en":{"Serial Books":"Serial Books","objects":"Objects Used in the Content","downloadUrl":"Download Url","Adaptive Feedback":"Adaptive Feedback","Punjabi":"Punjabi","Pending":"Pending"},"ttl":24.0}}};
            ecEditor.getService('meta').getResourceBundles = jasmine.createSpy().and.callFake(function(data, callback) {
                return callback(undefined, resourceResp);
            });
            $scope.$safeApply();
            done();
        });

        it('Should invoke getQuestions method', function(done) {
            var resp = {"data":{"id":"ekstep.composite-search.search","ver":"3.0","ts":"2018-06-04T11:15:36ZZ","params":{"resmsgid":"c4d33a48-72f1-4d14-95fd-234d6a2e7c43","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"count":12298,"items":[{"template":"1.mtf.lhs.txt.aud-rhs.txt.aud","code":"org.ekstep.assessmentitem.do_20045521","qlevel":"MEDIUM","channel":"in.ekstep","language":["Kannada"],"medium":"Kannada","type":"mtf","title":"ಹೊಂದಿಸಿ ಬರೆಯಿರಿ:","createdOn":"2016-08-18T08:35:30.230+0000","objectType":"AssessmentItem","gradeLevel":["KG","Class 1","Class 2"],"appId":"qa.ekstep.in","lastUpdatedOn":"2017-06-07T07:21:35.042+0000","used_for":"worksheet","model":"null","owner":"404","identifier":"do_20045521","question":" ಹೊಂದಿಸಿ ಬರೆಯಿರಿ:","consumerId":"2c43f136-c02f-4494-9fb9-fd228e2c77e6","portalOwner":"404","graph_id":"domain","nodeType":"DATA_NODE","version":1,"versionKey":"1496820095042","framework":"NCF","concepts":["LO44"],"createdBy":"404","max_score":1,"name":"ಹೊಂದಿಸಿ ಬರೆಯಿರಿ:","template_id":"domain_7330","node_id":43542},{"template":"org.ekstep.mcq.t.ta","code":"ek.n.ib.d.ss.bp3.5","keywords":["division","divide"],"qlevel":"MEDIUM","channel":"in.ekstep","language":["Hindi"],"medium":"Hindi","type":"mcq","title":"भाग","partial_scoring":false,"createdOn":"2016-06-16T14:01:04.733+0000","objectType":"AssessmentItem","feedback":"दोबारा कोशिश करें","gradeLevel":["Class 3"],"appId":"qa.ekstep.in","options":"[{\"value\":{\"type\":\"mixed\",\"text\":\"7\",\"asset\":\"7\"},\"answer\":false},{\"value\":{\"type\":\"mixed\",\"text\":\"49\",\"asset\":\"49\"},\"answer\":false},{\"value\":{\"type\":\"mixed\",\"text\":\"35\",\"asset\":\"35\"},\"answer\":false},{\"value\":{\"type\":\"mixed\",\"text\":\"6\",\"asset\":\"6\"},\"answer\":true}]","lastUpdatedOn":"2017-06-07T07:17:28.205+0000","used_for":"worksheet","owner":"Feroz","identifier":"ek.n.ib.d.ss.bp3.5","question":"42 ÷ 7 = ?","consumerId":"2c43f136-c02f-4494-9fb9-fd228e2c77e6","portalOwner":"128","graph_id":"domain","nodeType":"DATA_NODE","version":1,"versionKey":"1496819848205","framework":"NCF","createdBy":"128","max_score":1,"name":"भाग","num_answers":1,"template_id":"domain_3490","node_id":12385}]},"responseTime":4083}};
            ecEditor.getService('assessment').getQuestions = jasmine.createSpy().and.callFake(function(data, callback) {
                return callback(undefined, resp);
            });
            done();
        });

        it('Should invoke getFrameworkData method', function(done) {
            spyOn(ctrl, 'getFrameworkData').and.callThrough();
            ctrl.getFrameworkData();
            expect(ctrl.getFrameworkData).toHaveBeenCalled();
            expect(ctrl.getFrameworkData.calls.count()).toEqual(1);
            done();
        });

        it("Should initialize the concept-selector popup and invoke searchQuestions method", function(done) {
            ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
            element: 'assessmentConceptSelector',selectedConcepts: [] })
            spyOn(ctrl, "searchQuestions").and.callThrough();
            ctrl.searchQuestions();
            expect(ctrl.searchQuestions).toHaveBeenCalled();
            done();
        });

        it("Should incoke addItemActivity method", function(done) {
            spyOn(ctrl, "addItemActivity").and.callThrough();
            ctrl.addItemActivity();
            expect(ctrl.addItemActivity).toHaveBeenCalled();
            done();
        });

        it("Should incoke addActivityOptions method", function(done) {
            spyOn(ctrl, "addActivityOptions").and.callThrough();
            ctrl.addActivityOptions();
            expect(ctrl.addActivityOptions).toHaveBeenCalled();
            expect(ctrl.isAdvanceOptionOpen).toBe(false);
            done();
        });

        it("Should invoke getItem method", function(done) {
            var resp = {"data":{"id":"ekstep.learning.item.read","ver":"1.0","ts":"2018-06-04T13:56:54ZZ","params":{"resmsgid":"c290d853-0ac2-464a-a76f-53947666896d","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"assessment_item":{"template":"1.mtf.lhs.txt.aud-rhs.txt.aud","code":"org.ekstep.assessmentitem.do_20045521","subject":"domain","qlevel":"MEDIUM","channel":"in.ekstep","language":["Kannada"],"medium":"Kannada","media":[{"id":"do_20045512","type":"image","src":"https://qa.ekstep.in/assets/public/content/bear_404_1471505641_1471505737947.png","asset_id":"do_20045512"},{"id":"do_20045520","type":"image","src":"https://qa.ekstep.in/assets/public/content/deer_404_1471508887_1471508983946.png","asset_id":"do_20045520"},{"id":"do_20045339","type":"image","src":"https://qa.ekstep.in/assets/public/content/img_11_404_1470903015_1470903099502.jpg","asset_id":"do_20045339"},{"id":"do_20045513","type":"image","src":"https://qa.ekstep.in/assets/public/content/donkey_404_1471505828_1471505925325.jpg","asset_id":"do_20045513"},{"id":"do_20045519","type":"image","src":"https://qa.ekstep.in/assets/public/content/elephant_404_1471508688_1471508785049.png","asset_id":"do_20045519"}],"type":"mtf","title":"ಹೊಂದಿಸಿ ಬರೆಯಿರಿ:","createdOn":"2016-08-18T08:35:30.230+0000","gradeLevel":["KG","Class 1","Class 2"],"appId":"qa.ekstep.in","lastUpdatedOn":"2017-06-07T07:21:35.042+0000","used_for":"worksheet","rhs_options":[{"value":{"type":"mixed","text":"ಒದೆಯುವ ಪ್ರಾಣಿ","count":"","image":null,"audio":null,"resvalue":"ಒದೆಯುವ ಪ್ರಾಣಿ","resindex":0},"answer":2},{"value":{"type":"mixed","text":"ಕಾಡಿನ ಅರಸ","count":"","image":null,"audio":null,"resvalue":"ಕಾಡಿನ ಅರಸ","resindex":1},"answer":0},{"value":{"type":"mixed","text":"ಕಾಡಿನ ವೈದ್ಯ","count":"","image":null,"audio":null,"resvalue":"ಕಾಡಿನ ವೈದ್ಯ","resindex":2},"answer":1}],"owner":"404","lastUpdatedBy":"404","identifier":"do_20045521","question":" ಹೊಂದಿಸಿ ಬರೆಯಿರಿ:","consumerId":"2c43f136-c02f-4494-9fb9-fd228e2c77e6","portalOwner":"404","version":1,"versionKey":"1496820095042","framework":"NCF","lhs_options":[{"value":{"type":"mixed","text":"ಸಿಂಹ","count":"","image":null,"audio":null,"resvalue":"ಸಿಂಹ","resindex":0},"index":0},{"value":{"type":"mixed","text":"ಮಂಗ","count":"","image":null,"audio":null,"resvalue":"ಮಂಗ","resindex":1},"index":1},{"value":{"type":"mixed","text":"ಕತ್ತೆ ","count":"","image":null,"audio":null,"resvalue":"ಕತ್ತೆ ","resindex":2},"index":2}],"concepts":[{"identifier":"LO44","name":"Figurative Language","objectType":"Concept","relation":"associatedTo","description":null,"index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"createdBy":"404","max_score":1,"name":"ಹೊಂದಿಸಿ ಬರೆಯಿರಿ:","template_id":"domain_7330"}},"responseTime":532}};
            ecEditor.getService('assessment').getItem = jasmine.createSpy().and.callFake(function(data, callback) {
                return callback(true, resp);
            });
            done()
        });

        it("Should not generate telemetry when data is not passed", function(done) {
            spyOn(ctrl, 'generateTelemetry').and.callThrough();
            ctrl.generateTelemetry({});
            expect(ctrl.generateTelemetry).toHaveBeenCalled();
            done()
        });

        it("Should generate telemetry event", function(done) {
            var data = { type: "select", subtype: "dropDown", target: "languageDropDown" };
            var instance = { manifest: {id: "org.ekstep.assessmentbrowser", ver: "1.0"}};
            spyOn(ctrl, "generateTelemetry").and.callThrough();
            ctrl.generateTelemetry(data);
            expect(ecEditor.getService('telemetry').interact).toHaveBeenCalledWith({
              "type": data.type,
              "subtype": data.subtype,
              "target": data.target,
              "pluginid": instance.manifest.id,
              "pluginver": instance.manifest.ver,
              "objectid": "",
              "stage": ecEditor.getCurrentStage().id
            });
            done();
        });
    })
})