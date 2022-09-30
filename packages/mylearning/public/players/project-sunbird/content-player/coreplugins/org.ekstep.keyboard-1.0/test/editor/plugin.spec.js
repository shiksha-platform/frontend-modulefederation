describe("EditorPlugin", function() {
  var plugin, popupService, $compile, $rootScope;
  beforeEach(module('keyBoardApp'));
  beforeEach(function() {
    plugin = new org.ekstep.keyboard.EditorPlugin({}, {}, {});
    popupService = jasmine.createSpyObj("popupService", ["loadNgModules"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === ServiceConstants.POPUP_SERVICE) {
        return popupService;
      }
    });
  });
  describe("initialize", function() {
    it("should initialize dependancy plugins", function() {
      plugin.initialize();
    });
  });
  describe("newInstance", function() {
    it("should call newInstance plugins method", function() {
      plugin.newInstance();
    });
  });
  describe('directive test case', function() {
    var directiveHtml = '<div class="one column row" style="font-size: 1.42rem;margin-top: 4%;margin-bottom: 2%;"> <span>Select Keyboard: </span></div><form name="keyboardForm"> <div class="two row column"> <div class="four wide column"> <select ng-model="keyboardType" ng-options="type as type for type in keyboardTypes" ng-class="{\'has-success\':keyboardForm.keyboardType.$valid, \'has-error\': keyboardForm.keyboardType.$error.required != true, \'ui dropdown selection\': true}" class="dropdown" ng-change="selectKeyboardType()" required> </select> </div> </div> <div class="two row column" ng-show="customTag"> <div class="two wide column"> <label class="qcMetadateFormLbl">Add keys <span class="star">&nbsp;*</span></label> </div> <div class="four wide column"> <div class="ui input" style="width: 100%"> <input class="form-control" type="text" ng-class="{\'has-success\':keyboardForm.keys.$valid, \'has-error\': keyboardForm.keys.$error.required != true}" ng-model="keys" ng-blur="tokenizeTags($event)" maxlength="51" placeholder="Add keys seprated by comma(,)" required> </div> </div> </div></form>';
    beforeEach(module('keyBoardApp'));
    beforeEach(inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
    }));
    it('Replaces the element with the appropriate content', function() {
      var element = $compile("<keyboard-config></keyboard-config>")($rootScope);
      $rootScope.$digest();
      setTimeout(function(){
        expect(element.html()).toContain(directiveHtml);
      },200);
    });
  });
});