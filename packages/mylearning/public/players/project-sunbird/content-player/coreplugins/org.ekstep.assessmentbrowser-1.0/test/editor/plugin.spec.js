'use strict';
/*
describe('Assessment-browser plugin', function() {
    var $scope,
        uibModal,
        MainCtrl,
        config,
        $uibModalInstance,
        pluginObj,
        data;

    beforeEach(function() {
        jasmine.getJSONFixtures().fixturesPath = 'test';
        org.ekstep.contenteditor.config = {
            defaultSettings: 'base/plugins/org.ekstep.assessmentbrowser-1.0/test/editor/config/editorSettings.json',
            pluginRepo: 'http://localhost:9876/base/plugins',
        }
    });
    beforeAll(function() {
        $('<iframe id="itemIframe" src="base/app/preview/preview.html?webview=true"></iframe>').appendTo('body');
    });
    beforeEach(module('editorApp'));

    beforeEach(function() {
        org.ekstep.contenteditor.pluginManager.loadPlugin('org.ekstep.assessmentbrowser', "1.0");
    });

    beforeEach(inject(function($rootScope, _$controller_, $uibModal, $q) {
        $scope = $rootScope.$new();
        uibModal = $uibModal;
        MainCtrl = _$controller_('MainCtrl', {
            $scope: $scope
        });
        config = {
            template: 'base/plugins/org.ekstep.assessmentbrowser-1.0/editor/assessmentbrowser.html',
        };
        var plugin = ecEditor.getPlugin('org.ekstep.assessmentbrowser');
        pluginObj = new plugin.p(plugin.m);
        $uibModalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss')
        };  
    }));

    it('should open the popup window', function() {
        ecEditor.dispatchEvent("org.ekstep.assessmentbrowser:show", {});
        var callback = function() {};
        spyOn(uibModal, 'open').and.callFake(function(config) {
            return {
                rendered: {
                    then: callback
                }
            };
        });
        uibModal.open(config, callback);
        expect(uibModal.open).toHaveBeenCalled();
    });
    beforeEach(function() {
        window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });


    it('should call callback function', function(done) {
        ecEditor.dispatchEvent("org.ekstep.assessmentbrowser:show", {});
        spyOn(ecEditor, "dispatchEvent").and.callThrough();
        pluginObj.controllerCallback($scope, '', { instance: this });
        //spyOn(pluginObj.__proto__, 'controllerCallback');
        setTimeout(function() {
            done();
            //expect(pluginObj.__proto__.controllerCallback).toHaveBeenCalled();
        }, 5000);
    });

    it('should call addActivityOptions', function() {
        pluginObj.controllerCallback($scope, '', { instance: this });
        $scope.addActivityOptions();
        $scope.activity = { "question_title": "test", "language": "English", 'qlevel': "MEDIUM", "type": "mcq", "gradeLevel": ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'] };
        $scope.searchQuestions("myQuestions");
        expect($scope.isItemAvailable).toBe(true);
        $scope.safeApply();
    });

    it('should call addItemActivity', function() {
        pluginObj.controllerCallback($scope, '', { instance: this });
        $scope.items = [{
            question: {
                identifier: 'G5Q1',
                max_score: 1,
                options: [{
                    value: {
                        type: "image",
                        asset: "12"
                    }
                }, {
                    value: {
                        type: "text",
                        asset: "12"
                    }
                }]
            },
            isSelected: true
        }, {
            question: {
                identifier: 'G5Q2',
                max_score: 2
            },
            isSelected: false
        }];
        var item = $scope.items[0];
        $scope.cart.add(item);
        $scope.cart.remove(item);
        expect($scope.cart.items.length).toEqual(0);
        $scope.safeApply();
    });

    it('should call preview', function() {
        pluginObj.controllerCallback($scope, '', { instance: this });
        $scope.items = [{
            question: {
                identifier: 'domain_57876',
                max_score: 2
            },
            isSelected: true
        }];
        $scope.previewItem($scope.items[0]);
        $scope.safeApply();
    });
});
*/