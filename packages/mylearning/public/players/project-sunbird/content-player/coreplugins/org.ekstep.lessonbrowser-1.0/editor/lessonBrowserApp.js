angular.module('org.ekstep.lessonbrowserapp', [])
.controller('lessonController', ['$scope', 'instance', 'callback', 'callerFilters', function($scope, instance, callback, callerFilters) {
    var ctrl = this;

    // QUICK FIX - Return selected lesson from repo. Service should be implemented
    $scope.selectedLessons = {};

    ctrl.lessonbrowser = instance;

    $scope.telemetry = {"pluginid":ctrl.lessonbrowser.manifest.id, "pluginver":ctrl.lessonbrowser.manifest.ver};

    var collectionService = org.ekstep.collectioneditor.api.getService('collection');
    ctrl.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "target": data.target,
            "targetid":data.targetid,
            "pluginid": $scope.telemetry.pluginid,
            "pluginver": $scope.telemetry.pluginver,
            "objectid": '',
            "stage": collectionService.getActiveNode().id
        })
    };


    // Delay init of tabs till DOM is loaded
    $scope.$on('ngDialog.opened', function(){
        setTimeout(function(){$('.tabular.menu .item').tab()}, 200);
    });

    // Get and return the selected lessons
    $scope.returnSelectedLessons = function(selectedLessons){
        ctrl.generateTelemetry({type: 'click', subtype: 'submit', target: 'addlesson',targetid: 'button-add'});

    	// return selected lessons to the lesson browser caller
    	var err = null;
        var res = selectedLessons;
    	callback(err, res);

    	// close popup
    	$scope.closePopup();
    };

    // Close the popup
    $scope.closePopup = function() {
        ctrl.generateTelemetry({type: 'click', subtype: 'cancel', target: 'addlesson', targetid: 'button-cancel'});
        $scope.closeThisDialog();
    };

    $scope.browserApi = {
    	filters: function(repoId) {
    		var repo = ecEditor._.find(instance.repos, ['id', repoId]);
    		var filters = {};

    		if (repo) {
    			filters = repo.getFilters();
    		}

            var mergedFilters = {"language":[], "grade": [], "lessonType": [], "domain": []};
            angular.forEach(mergedFilters, function(idx, filterKey){
                if (filters[filterKey] && callerFilters[filterKey]) {
                    mergedFilters[filterKey] = filters[filterKey].concat(callerFilters[filterKey]);
                    mergedFilters[filterKey] = arrayUnique(mergedFilters[filterKey]);
                }
            });
    		return mergedFilters;
    	}
    };

    var arrayUnique = function(array) {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    }
}]);