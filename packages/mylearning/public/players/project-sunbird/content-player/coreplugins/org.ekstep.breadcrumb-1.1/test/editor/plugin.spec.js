/**
 * Test cases for breadcrumb plugin
 * @author Akash Gupta <akash.gupta@tarento.com>
 */

'use strict';
describe('breadcrumb plugin', function () {
    var instance, controller, scope;

    beforeAll(function () {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.breadcrumb");
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/breadcrumbApp.js");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.breadcrumb");
    });

    beforeEach(module('editorApp'));

    beforeEach(inject(function ($rootScope, _$controller_) {
        $scope = $rootScope.$new();
        controller = _$controller_('breadcrumbController', {
            $scope: $scope,
            instance: { manifest: manifest }
        });
    }));

    it('Generate breadcrumb flow when active node is folder', function () {
        spyOn(scope, 'getPath');
        spyOn(scope, 'getBreadcrumb');
        expect(ecEditor.jQuery('#collection-tree').fancytree("getTree").getActiveNode()).toBeDefined();
        scope.getPath();
        expect(scope.getPath).toHaveBeenCalled();
        expect(scope.getBreadcrumb).toHaveBeenCalled();
        expect(scope.path.length).toBeGreaterThan(0);
    });

    it('Add new breadcrumb', function () {
        spyOn(scope, 'addToBreadcrumb');
        spyOn(scope, 'hideBreadcrumb');
        var breadcrumbLength = ecEditor._.deepClone($scope.path.length);
        scope.addToBreadcrumb(undefined, scope.path[0]);
        expect(scope.addToBreadcrumb).toHaveBeenCalled();
        expect(scope.hideBreadcrumb).toHaveBeenCalled();
        expect(scope.path.length).toBeGreaterThan(breadcrumbLength);
    });

    it('Hide any breadcrumb', function () {
        spyOn(scope, 'hideBreadcrumb');
        scope.path.push(scope.path[0])
        scope.path.push(scope.path[0])
        scope.path.push(scope.path[0])
        scope.path.push(scope.path[0])
        scope.path.push(scope.path[0])
        scope.hideBreadcrumb();
        expect(scope.hideBreadcrumb).toHaveBeenCalled();
        expect(scope.path[4].show).toBeFalsy();
    });

    it('setActiveNode by clicking on breadcrumb', function () {
        spyOn(org.ekstep.collectioneditor.api.getService('collection'), 'setActiveNode');
        spyOn(scope, 'setActiveNode');
        scope.setActiveNode(scope.path[0]);
        expect(scope.setActiveNode).toHaveBeenCalled();
        expect(org.ekstep.collectioneditor.api.getService('collection').setActiveNode).toHaveBeenCalled();
    });

    it('Active root node of selected node', function () {
        spyOn(org.ekstep.services.collectionService, 'setActiveNode');
        spyOn(scope, 'goToRootParent');
        expect(org.ekstep.services.collectionService.getActiveNode()).toBeDefined();
        scope.goToRootParent(scope.path[0]);
        expect(scope.goToRootParent).toHaveBeenCalled();
        expect(org.ekstep.services.collectionService.setActiveNode).toHaveBeenCalled();
    });

    it('Get parent node', function () {
        spyOn(scope, 'getPartentNode');
        expect(org.ekstep.services.collectionService.getActiveNode()).toBeDefined();
        var parent = scope.getPartentNode();
        expect(scope.goToRootParent).toHaveBeenCalled();
        expect(parent).toBeDefined();
    });
});