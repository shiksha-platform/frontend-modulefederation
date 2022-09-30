angular.module('editorApp')
  .controller('org.ekstep.mathtext:config-controller', ['$scope', function($scope) {
    $scope.openTransliterator = function() {
      ecEditor.dispatchEvent("org.ekstep.mathtext:showpopup");
    };

    $scope.config = $scope.config;
    $scope.textTypeSelected;
    $scope.refreshTab = true;
    $scope.activeTextPluginControlItem = "";

    $scope.fontSize = [18, 20, 22, 24, 26, 28, 32, 36, 40, 44];


    $scope.showColorpicker = function(id, color) {
      var eventData = {
        id: id,
        callback: function(key, value) {
          $scope.configData['color'] = value;
          // org.ekstep.contenteditor.api.dispatchEvent('config:on:change', { key: key, value: value });
          ecEditor.dispatchEvent('org.ekstep.mathtext:changeConfig', {
            "configData": $scope.configData,
          });
        },
        color: color
      };
      setTimeout(function() { org.ekstep.contenteditor.api.dispatchEvent("colorpicker:state", eventData) }, 500);
    };






    $scope.showBackgroundColorpicker = function(id, color) {
      var eventData = {
        id: id,
        callback: function(key, value) {
          $scope.configData['backgroundcolor'] = value;
          // org.ekstep.contenteditor.api.dispatchEvent('config:on:change', { key: key, value: value });
          ecEditor.dispatchEvent('org.ekstep.mathtext:changeConfig', {
            "configData": $scope.configData,
          });
        },
        color: color
      };
      setTimeout(function() { org.ekstep.contenteditor.api.dispatchEvent("colorpicker:state", eventData) }, 500);
    };





    $scope.textOpacityConfig = {
      "propertyName": "opacity",
      "title": "Transparency",
      "description": "Set the transparency for element",
      "dataType": "rangeslider",
      "labelSuffix": "%",
      "required": true,
      "defaultValue": 100,
      "minimumValue": 0,
      "maximumValue": 100
    };



    // ecEditor.jQuery('.ui.accordion').accordion();


    $scope.collapseAllAccordionItems = function() {
      ecEditor.jQuery(".sidebar-accordion > .title").removeClass('active');
      ecEditor.jQuery('#textFormatting').addClass('active');
      $scope.activeTextPluginControlItem = 'textFormatting';
      // ecEditor.jQuery('.sidebar-accordion').accordion({ active: 0 });
    }

    setTimeout(function() {
      ecEditor.jQuery('.font-face-dropdown').dropdown();
      ecEditor.jQuery('.font-size-dropdown').dropdown();
    }, 0);

    $scope.onTextSelect = function(event, data) {
      data = ecEditor.getCurrentObject() || data;
      $scope.textTypeSelected = undefined;
      $scope.hasReadAlong = false;
      $scope.hasWordInfo = false;
      $scope.configData['color'] = data.attributes.color;
      $scope.configData['fontSize'] = data.attributes.fontSize;
      $scope.configData['backgroundcolor'] = data.attributes.backgroundcolor;

      $scope.updateAdvancedTab();
      $scope.$safeApply();
    };


    $scope.updateAdvancedTab = function() {
      $scope.refreshTab = false;
      $scope.refreshTab = true;
      $scope.showColorpicker('textcolor', $scope.configData['color']);
      $scope.showBackgroundColorpicker('backgroundcolor', $scope.configData['backgroundcolor']);

      $scope.$safeApply();
    };

    $scope.onTextSelect();

    //remove listeners on object:unselect. controller is executed everytime object is selected, 
    //so everytime listeners are registered with new scope.
    //if we dont clean up the listeners, it will pile up the eventbus and causes performance issue.

    // ecEditor.jQuery('.sidebar-accordion').accordion();

    setTimeout(function() {
      ecEditor.jQuery('.font-face-dropdown').dropdown();
      ecEditor.jQuery('.font-size-dropdown').dropdown();
    }, 0);


    $scope.toggleActiveAcordionTitle = function(clickEvent) {
      let targetId = $scope.activeTextPluginControlItem = clickEvent.target.id;
      ecEditor.jQuery(".sidebar-accordion>.title").removeClass('active');
      ecEditor.jQuery('#' + targetId + '').addClass('active');

    };


    $scope.changeConfig = function() {
      ecEditor.dispatchEvent('org.ekstep.mathtext:changeConfig', {
        "configData": $scope.configData,
      });
    }

    ecEditor.addEventListener("org.ekstep.mathtext:add", $scope.onTextSelect, $scope);
    ecEditor.addEventListener("org.ekstep.mathtext:modified", $scope.onTextSelect, $scope);
    ecEditor.addEventListener("org.ekstep.mathtext:unselected", $scope.unregisterListeners, $scope);
    ecEditor.addEventListener("config:show", $scope.onTextSelect, $scope);
  }]);

//# sourceURL=mathConfigController.js