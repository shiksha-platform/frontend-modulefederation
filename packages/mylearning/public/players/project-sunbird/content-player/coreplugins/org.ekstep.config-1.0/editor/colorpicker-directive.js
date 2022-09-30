angular.module('editorApp').directive('uiColorpicker', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            id: "@"
        },
        template: '<span><input class="input" id="{{id}}" id="{{id}}"/></span>',
        link: function(scope, element) {
            var input = element.find('input');
            input.spectrum({
                color: "#eeeeee"
            });
        }
    };
});
