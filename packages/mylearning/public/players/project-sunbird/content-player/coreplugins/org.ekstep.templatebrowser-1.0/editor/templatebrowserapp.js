'use strict';

angular.module('org.ekstep.templatebroser-1.0', []).controller('templatebrowser', ['$scope','$injector', 'instance', function($scope, $injector, instance) {
    var templateData,
        dynamicText = [],
        ctrl = this;

    ctrl.lastSelected;
    ctrl.template = {};
    ctrl.dynamicText = [];
    ctrl.error = false;

    ctrl.closeWindow = function() {
    	$scope.closeThisDialog();
    };

    ctrl.search = function() {
        dynamicText = [];
        var search = $('#templateSearch').val();
        search && instance.getTemplates(search, ctrl.getTemplatesCallback);
    };

    ctrl.getTemplatesCallback = function(err, res) {
        if (res) {
            ctrl.templates = res.data.result.items;
            ctrl.error = false;
        }
        if (err) {
            ctrl.error = true;
        }
        ecEditor.getAngularScope().safeApply();
        if (res) ctrl.initPopup(res.data.result.items);
    };

    instance.getTemplates(undefined, ctrl.getTemplatesCallback);

    ctrl.initPopup = function(item) {
        _.forEach(item, function(obj, index) {
            $('#templatebrowser-' + index).popup({
                hoverable: true,
                position: 'right center'
            });
        });
    };

    ctrl.templateSelected = function(identifier, index) {
        templateData = _.find(ctrl.templates, function(obj) {
            return obj.identifier === identifier
        });
        if (!_.isUndefined(ctrl.lastSelected)) ctrl.template[ctrl.lastSelected] = false;
        ctrl.lastSelected = index;
    };

    ctrl.save = function() {
        console.log('templateData', templateData);
        if (!_.isUndefined(ctrl.lastSelected)) instance.callback && instance.callback(templateData);
        ctrl.closeWindow();
    };
}]);
