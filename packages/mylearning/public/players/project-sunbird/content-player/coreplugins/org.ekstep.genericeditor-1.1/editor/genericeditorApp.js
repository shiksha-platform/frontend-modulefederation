angular.module('org.ekstep.genericeditor', ["Scope.safeApply", "oc.lazyLoad"]).controller('mainController', ['$scope', '$location', '$ocLazyLoad', function($scope, $location, $ocLazyLoad) {

    $scope.contentDetails = {
        contentTitle: ""
    };
    $scope.contentId = ecEditor.getContext('contentId');
    //Header scope starts
    $scope.headers = [];

    $scope.addToHeader = function(header) {
        $scope.headers.push(header);
        $scope.$safeApply();
    }

    org.ekstep.contenteditor.headerManager.initialize({ loadNgModules: $scope.loadNgModules, scope: $scope });

    //Header scope ends

    //canvasarea scope starts
    $scope.canvaslist = [];

    $scope.addToCanvasArea = function(canvas) {
        $scope.canvaslist.push(canvas);
        $scope.$safeApply();
    }

    //On title change / Metadata changes listen event to change PDF header title
    ecEditor.addEventListener('org.ekstep.contenteditor:save:meta', function(event,data){
        setTimeout(function(){
            ecEditor.dispatchEvent("atpreview:show");
        }, 500);
    });
    
    org.ekstep.contenteditor.canvasManager.initialize({ loadNgModules: $scope.loadNgModules, scope: $scope });

    //canvasarea scope ends

    //sidebar scope starts
    $scope.registeredCategories = [];
    $scope.loadNgModules = function(templatePath, controllerPath) {
        var files = [];
        if (templatePath) files.push({ type: 'html', path: templatePath });
        if (controllerPath) files.push({ type: 'js', path: controllerPath + '?' + ecEditor.getConfig('build_number') });
        if (files.length) return $ocLazyLoad.load(files)
    };

    org.ekstep.contenteditor.sidebarManager.initialize({ loadNgModules: $scope.loadNgModules, scope: $scope });

    $scope.fireSidebarTelemetry = function(menu, menuType) {
        var pluginId, pluginVer, objectId;
        var pluginObject = org.ekstep.contenteditor.api.getCurrentObject() || org.ekstep.contenteditor.api.getCurrentStage();
        if (pluginObject) {
            pluginId = pluginObject.manifest.id;
            pluginVer = pluginObject.manifest.ver;
            objectId = pluginObject.id;
        }
        $scope.telemetryService.interact({ "type": "modify", "subtype": "sidebar", "target": menuType, "pluginid": pluginId || "", 'pluginver': pluginVer || "", "objectid": objectId || "", "stage": org.ekstep.contenteditor.stageManager.currentStage.id });
    };

    $scope.addToSidebar = function(sidebar) {
        $scope.registeredCategories.push(sidebar);
        $scope.$safeApply();
    };

    $scope.refreshSidebar = function() {
        $scope.$safeApply();
    };

    //sidebar scope ends

    $scope.loadContent = function(callback) {
        ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContent(org.ekstep.contenteditor.api.getContext('contentId'), function(err, res) {
            if (res) {
                $scope.$safeApply();
                callback && callback(err, res);
                ecEditor.dispatchEvent("content:load:complete");
            } else {
                callback && callback('unable to fetch the content!', res);
            }
        });
    };


    $scope.telemetry = function(data) {
        var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.genericeditor");
        org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": data.subtype, "target": data.target, "pluginid": manifest.ver, "pluginver": manifest.id, "objectid": ecEditor.getCurrentStage().id, "stage": ecEditor.getCurrentStage().id });
    };

    ecEditor.addEventListener('org.ekstep.genericeditor:reload', function() {
        $scope.loadContent(function(err, res) {
            if (res) {
                ecEditor.dispatchEvent('content:title:update', res.name);
                ecEditor.dispatchEvent('sidebar:show');
                ecEditor.dispatchEvent("atpreview:show");
            } else {
                ecEditor.jQuery('.loading-message').remove();
                ecEditor.jQuery('.sk-cube-grid').remove();
                ecEditor.jQuery('.pg-loading-html').prepend('<p class="loading-message">Unable to fetch content! Please try again later</p><button class="ui red button" onclick="ecEditor.dispatchEvent(\'org.ekstep.collectioneditor:content:notfound\');"><i class="window close icon"></i>Close Editor!</button>');
            }
        });
        $scope.$safeApply()
    }, $scope);

    ecEditor.addEventListener('org.ekstep.genericeditor:preview', function() {
        var loadingScreen = setInterval (function(){
            if(window.loading_screen.finishing){             
                ecEditor.dispatchEvent("atpreview:show");
                clearInterval (loadingScreen);
            }
        },100);
    }, $scope);

    org.ekstep.genericeditor.api.initEditor(ecEditor.getConfig('editorConfig'), function() {
        var startTime = (new Date()).getTime()
        if (ecEditor.getContext('contentId')) {
            $scope.loadContent(function(err, res) {
                if (res) {
                    // close the loading screen
                    ecEditor.dispatchEvent('content:title:update', res.name);
                    ecEditor.dispatchEvent('sidebar:show');
                    window.loading_screen && window.loading_screen.finish();
                    org.ekstep.services.telemetryService.impression({
                        type: 'edit',
                        pageid: ecEditor.getContext('env') || 'generic-editor',
                        uri: encodeURIComponent(location.href),
                        duration: (new Date()).getTime() - startTime
                    })
                } else {
                    ecEditor.jQuery('.loading-message').remove();
                    ecEditor.jQuery('.sk-cube-grid').remove();
                    ecEditor.jQuery('.pg-loading-html').prepend('<p class="loading-message">Unable to fetch content! Please try again later</p><button class="ui red button" onclick="ecEditor.dispatchEvent(\'org.ekstep.collectioneditor:content:notfound\');"><i class="window close icon"></i>Close Editor!</button>');
                }
            });
        } else {
            if (!ecEditor.getContext('framework')) {
                var channel = ecEditor.getContext('channel') || "in.ekstep";
                ecEditor.getService(ServiceConstants.META_SERVICE).getFrameworks(channel, function(err, res) {
                    if (res && res.data) {
                        ecEditor.setContext("framework", res.data.result.channel.defaultFramework);
                        org.ekstep.services.telemetryService.impression({
                            type: 'edit',
                            pageid: ecEditor.getContext('env') || 'genericeditor',
                            uri: encodeURIComponent(location.href),
                            duration: (new Date()).getTime() - startTime
                        })
                        window.loading_screen && window.loading_screen.finish();
                    } else {
                        ecEditor.jQuery('.loading-message').remove();
                        ecEditor.jQuery('.sk-cube-grid').remove();
                        ecEditor.jQuery('.pg-loading-html').prepend('<p class="loading-message">Unable to fetch defaultFramework! Please try again later</p><button class="ui red button" onclick="ecEditor.dispatchEvent(\'org.ekstep.collectioneditor:content:notfound\');"><i class="window close icon"></i>Close Editor!</button>');
                    }
                });
            } else {
                window.loading_screen && window.loading_screen.finish();
            }
        }
    });
}]);
//# sourceURL=genericeditorApp.js