describe("lesson browser plugin", function() {
    var manifest, path, ctrl, $scope, pluginInstance, returnData;
    
    beforeAll(function(done) {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.lessonbrowser");
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/lessonBrowserApp.js");
        pluginInstance = org.ekstep.pluginframework.pluginManager.pluginObjs["org.ekstep.lessonbrowser"];
        var domElement = '<div id="noLessonMsg"></div>';
        var body = document.getElementsByTagName("body")[0];
        var div = document.createElement('div');
        div.innerHTML = domElement;
        body.appendChild(div.children[0]);
        returnData = {
            "id": "api.page.assemble",
            "ver": "v1",
            "ts": "2018-09-03 11:34:27:737+0000",
            "params": {
                "resmsgid": null,
                "msgid": "b54a2f98-d9bb-4569-bd11-be59bfd8e8e5",
                "err": null,
                "status": "success",
                "errmsg": null
            },
            "responseCode": "OK",
            "result": {
                "response": {
                    "name": "ContentBrowser",
                    "id": "01245041694089216064",
                    "sections": [{
                        "display": "{\"name\":{\"en\":\"Latest Resource\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d45970-af6d-11e8-9634-53eaaf4a9295",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"contentType\":[\"Resource\"]},\"limit\":\"10\",\"sort_by\":{\"lastUpdatedOn\":\"desc\"}}}",
                        "name": "Latest Resource",
                        "id": "0124503875868344328",
                        "apiId": "api.content.search",
                        "group": 1
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Resource\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d51cc0-af6d-11e8-ae30-032e1c361ffa",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"filters\":{\"contentType\":[\"Resource\"]},\"sort_by\":{\"me_totalDownloads\":\"desc\"}}}",
                        "name": "Most Downloaded Resource",
                        "id": "0124503875957800968",
                        "apiId": "api.content.search",
                        "group": 2
                    }, {
                        "display": "{\"name\":{\"en\":\"Latest Collection\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d320f0-af6d-11e8-9634-53eaaf4a9295",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"mimeType\":\"application/vnd.ekstep.content-collection\",\"contentType\":\"Collection\"},\"limit\":10,\"exists\":[\"lastUpdatedOn\"],\"sort_by\":{\"lastUpdatedOn\":\"desc\"}}}",
                        "name": "Latest Collection",
                        "id": "0124503922130452480",
                        "apiId": "api.content.search",
                        "group": 3
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Collection\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d60720-af6d-11e8-ae30-032e1c361ffa",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"mimeType\":\"application/vnd.ekstep.content-collection\",\"contentType\":\"Collection\"},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\"}}}",
                        "name": "Most Downloaded Collection",
                        "id": "0124503910202245122",
                        "apiId": "api.content.search",
                        "group": 4
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Interactive Lesson\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d4a790-af6d-11e8-9634-53eaaf4a9295",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"mimeType\":\"application/vnd.ekstep.ecml-archive\",\"contentType\":\"Collection\"},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\",\"me_totalInteractions\":\"desc\"}}}",
                        "name": "Most Downloaded Interactive Lesson",
                        "id": "01245039556523622420",
                        "apiId": "api.content.search",
                        "group": 5
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Interactive Worksheet\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d591f0-af6d-11e8-ae30-032e1c361ffa",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"filters\":{\"mimeType\":\"application/vnd.ekstep.ecml-archive\",\"contentType\":[\"Resource\"],\"resourceType\":[\"Worksheet\"]},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\",\"me_totalInteractions\":\"desc\"}}}",
                        "name": "Most Downloaded Interactive Worksheet",
                        "id": "01245039576209817636",
                        "apiId": "api.content.search",
                        "group": 6
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Youtube\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d43260-af6d-11e8-9634-53eaaf4a9295",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"objectType\":\"Content\",\"mimeType\":\"video/x-youtube\"},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\"}}}",
                        "name": "Most Downloaded Youtube",
                        "id": "01245040305298636825",
                        "apiId": "api.content.search",
                        "group": 7
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Pdf\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d543d0-af6d-11e8-ae30-032e1c361ffa",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"objectType\":\"Content\",\"mimeType\":\"application/pdf\"},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\"}}}",
                        "name": "Most Downloaded Pdf",
                        "id": "01245040346686259245",
                        "apiId": "api.content.search",
                        "group": 8
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded Epub\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d56ae0-af6d-11e8-9634-53eaaf4a9295",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"objectType\":\"Content\",\"mimeType\":\"application/epub\"},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\"}}}",
                        "name": "Most Downloaded Epub",
                        "id": "01245040815771648046",
                        "apiId": "api.content.search",
                        "group": 9
                    }, {
                        "display": "{\"name\":{\"en\":\"Most Downloaded H5P\"}}",
                        "alt": null,
                        "count": 0,
                        "description": null,
                        "index": 1,
                        "sectionDataType": "ContentBrowser",
                        "imgUrl": null,
                        "resmsgId": "50d4f5b0-af6d-11e8-ae30-032e1c361ffa",
                        "contents": null,
                        "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"objectType\":\"Content\",\"mimeType\":\"application/vnd.ekstep.h5p-archive\"},\"limit\":10,\"sort_by\":{\"me_totalDownloads\":\"desc\"}}}",
                        "name": "Most Downloaded H5P",
                        "id": "01245041107574784029",
                        "apiId": "api.content.search",
                        "group": 10
                    }]
                }
            }
        };
        ecEditor.getService('meta').getPageAssemble = jasmine.createSpy().and.callFake(function(data, callback) {
            return callback(undefined, {"data": returnData});
        });
        done();
    });

    it('mock controller', function(done) {
        angular.mock.module('oc.lazyLoad');
        // angular.mock.module('Scope.safeApply');
        inject(function($ocLazyLoad, _$rootScope_, _$controller_) {
            var $controller = _$controller_;
            $scope = _$rootScope_.$new();

            $ocLazyLoad.load([
                { type: 'js', path: path }
            ]).then(function() {
                ctrl = $controller("lessonController", { $scope: $scope, instance: { manifest: manifest } });
                $scope.$safeApply = function(){};
                done();
            }, function(error) {
                done();
            });
            setInterval(function() {
                _$rootScope_.$digest();
            }, 10);
        });
    });
    
    describe("Lesson browser", function() {
        describe("Init lesson browser", function() {
            it("It should initialized Lesson browser plugin", function() {
                spyOn(pluginInstance, 'initialize').and.callThrough();
                pluginInstance.initialize(manifest);
                expect(pluginInstance.initialize).toHaveBeenCalled();
            });
            it("Should initialize the lesson browser with filters", function(done) {
                spyOn(pluginInstance, "initPreview").and.callThrough();
                var query = {
                    "query": {
                        "lessonType": [
                        "Resource"
                        ]
                    }
                };
                ecEditor.dispatchEvent('org.ekstep.lessonbrowser:show', query);
                expect(pluginInstance.query).toEqual(query.query);
                done();
            });
            it("By dispatching editor:invoke:viewall event init preview should called", function(done) {
                spyOn(pluginInstance, "initPreview").and.callThrough();
                ecEditor.dispatchEvent('editor:invoke:viewall', {
                    "client": "org",
                    "request": {
                        "mode": "soft",
                        "filters": {
                        "objectType": [
                            "Content"
                        ],
                        "status": [
                            "Live"
                        ],
                        "contentType": [
                            "Collection",
                            "Resource"
                        ]
                        },
                        "offset": 0,
                        "limit": 100,
                        "softConstraints": {
                        "gradeLevel": 100,
                        "medium": 50,
                        "board": 25
                        }
                    },"callback": function(){}
                });
                expect(pluginInstance.client).toEqual("org");
                done();
            });
        });
        describe("View all", function() {
            it("ContentType filter should prefilled with Resource type", function() {
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "contentType": [
                            "Resource"
                        ]}}});
                expect($scope.filterSelection.contentType).toEqual(["Resource"]);
            });
            it("ContentType filter should prefilled with Collection type", function() {
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "contentType": [
                            "Collection"
                        ]}}});
                expect($scope.filterSelection.contentType).toEqual(["Collection"]);
            });
            it("CURRICULUM filter should prefilled with ICSE", function() {
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "board": [
                            "ICSE"
                        ]}}});
                expect($scope.filterSelection.board).toEqual(["ICSE"]);
            });
            it("CLASS filter should prefilled with Class 1", function() {
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "gradeLevel": [
                            "Class 1"
                        ]}}});
                expect($scope.filterSelection.gradeLevel).toEqual(["Class 1"]);
            });
            it("SUBJECT  filter should prefilled with English", function() {
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "subject": [
                            "English"
                        ]}}});
                expect($scope.filterSelection.subject).toEqual(["English"]);
            });
            it("MEDIUM  filter should prefilled with English", function() {
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "medium": [
                            "English"
                        ]}}});
                expect($scope.filterSelection.medium).toEqual(["English"]);
            });
        });
        describe("Apply rootNode Metadata", function() {
            it("If root node having NCERT board, filters should be prefilled as NCERT board", function() {
                $scope.rootNodeFilter = {"board": ['NCERT']};
                $scope.viewAll({"request": {
                    "filters": {
                    "objectType": [
                        "Resource"
                    ]}}});
                
                expect($scope.filterSelection.board).toEqual(['NCERT']);
            });
            it("If root node having NCERT board and Query having NCF, filters should be prefilled as NCERT, NCF board", function() {
                $scope.rootNodeFilter = {"board": ['NCERT']};
                
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "board":["NCF"], 
                        "objectType": [
                            "Resource"
                        ]}}}); 
                expect($scope.filterSelection.board).toEqual(["NCF", "NCERT"]);
            });
            it("If root node having English medium, filters should be prefilled as English medium", function() {
                $scope.rootNodeFilter = {"medium": ['English']};
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "objectType": [
                            "Resource"
                        ]}}});
                expect($scope.filterSelection.medium).toEqual(['English']);
            });
            it("If root node having English subject, filters should be prefilled as English subject", function() {
                $scope.rootNodeFilter = {"subject": ['English']};
        
                spyOn($scope, 'viewAll').and.callThrough();
                $scope.viewAll({"request": {
                        "filters": {
                        "objectType": [
                            "Resource"
                        ]}}}); 
                expect($scope.filterSelection.subject).toEqual(['English']);
            });
            it("If no result after applying rootnode filters, `Resources not found` message should be shown", function(done) {
                $scope.getPageAssemble = jasmine.createSpy().and.callFake(function(callback) {
                    return callback(undefined, {"data": returnData});
                });
                ctrl.facetsResponse = undefined;
                ecEditor.jQuery('#noLessonMsg').hide();
                spyOn(ctrl, 'applyAllJquery').and.callThrough();
                $scope.invokeFacetsPage();
                setTimeout(function() {
                    expect($('#noLessonMsg').is(':visible')).toEqual(true);
                }, 0);
                done();
            });
            it("By clicking on the View all result should not be shorted by name", function(done) {
                $scope.viewAll({"request": {
                        "filters": {
                        "objectType": [
                            "Resource"
                        ]}}});
                expect($scope.sortOption).toEqual('');   
                done();
            });
        });
        describe("Search Concept", function(){
            it("Search concept should have been called", function() {
                var searchService = org.ekstep.contenteditor.api.getService(ServiceConstants.SEARCH_SERVICE);
                searchService.search = jasmine.createSpy().and.callFake(function(data, callback) {
                    return callback(undefined, {"data": {"result": {"concepts": [{"identifier": "c1", "name": "Concpet1"}]}}});
                });
                spyOn(ctrl, 'searchConcepts').and.callThrough();
                ctrl.searchConcepts(["c1"], function(){
                    expect(ctrl.searchConcepts).toHaveBeenCalled();
                });
            });
        });
        describe("Search Lesson", function(){
            it("Search lesson should have been called", function() {
                var searchService = org.ekstep.contenteditor.api.getService(ServiceConstants.SEARCH_SERVICE);
                searchService.search = jasmine.createSpy().and.callFake(function(data, callback) {
                    return callback(undefined, {"data": {"result": {"contents": [{"identifier": "L1", "name": "lesson1"}]}}});
                });
                spyOn(ctrl, 'searchLessons').and.callThrough();
                ctrl.searchLessons(function(){
                    expect(ctrl.searchLessons).toHaveBeenCalled();
                });
            });   
        });
        describe("Toggle Content", function(){
            it("Should add or remove resources from content lists", function() {
                spyOn(ctrl, 'toggleContent').and.callThrough();
                ctrl.toggleContent([{"identifier": "c1"}]);
                expect(ctrl.toggleContent).toHaveBeenCalled();
                expect($("#checkBox_c1>.checkBox"). prop("checked")).toEqual(false); 
            });
        });
        describe("Show details card", function(){
            it("Details should be dispaly on card", function() {
                spyOn($scope, 'showCardDetails').and.callThrough();
                $scope.showCardDetails();
                expect($scope.showCardDetails).toHaveBeenCalled();
                expect($scope.mainTemplate).toEqual("cardDetailsView");
                
            });
        });
        describe("Search specific lessson", function(){
            it("Should Search specific lesson", function() {
                spyOn($scope, 'lessonBrowserSearch').and.callThrough();
                $scope.lessonBrowserSearch();
                expect($scope.lessonBrowserSearch).toHaveBeenCalled();
                expect($('#noLessonMsg').is(':visible')).toEqual(true); 
            });
        });
        describe("Get and set filters", function(){
            it("Should get filters value", function() {
                spyOn($scope, 'getFiltersValue').and.callThrough();
                $scope.getFiltersValue({"board": ["NCERT"]});
                expect($scope.getFiltersValue).toHaveBeenCalled();
                expect($scope.filterSelection.board).toEqual(["NCERT"]); 
            });
            it("Should apply filters in sidebar", function() {
                spyOn($scope, 'applyFilters').and.callThrough();
                ctrl.searchLessons = jasmine.createSpy().and.callFake(function(callback) {
                    return callback([]);
                });
                $scope.applyFilters();
                expect($scope.applyFilters).toHaveBeenCalled();
                expect($('#noLessonMsg').is(':visible')).toEqual(false);
            });
        });
    });
});