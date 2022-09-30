describe("Math text Editor template controller", function() {
    var $controller, $scope, ctrl, $rootScope, plugin, $timeout, instance;
     var latexSpan,hiddenSpanArea;
     beforeAll(function(done){
        ContentEditorTestFramework.init(function() {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
          ecEditor.instantiatePlugin("org.ekstep.stage");
          ecEditor.instantiatePlugin("org.ekstep.config");
         done();
        });
      })
    beforeEach(module('org.ekstep.mathtext'));
    beforeEach(function(done) {
        plugin = {};
        plugin.manifest = {'id': "org.ekstep.mathtext"};
      setTimeout(function() {
        inject(function(_$rootScope_, _$controller_, _$timeout_) {
          $rootScope = _$rootScope_;
          $scope = _$rootScope_.$new();
          $controller = _$controller_;
          $timeout = _$timeout_;
          $scope.closeThisDialog = function() {};
          $scope.$safeApply = function() {};
          done();
        });
      }, 2000);
      var elem = '<div ><span id="latex"></span><span id="math-field"></span><span id="hiddenSpan"></span></div>';
      var body = document.getElementsByTagName("body")[0];
      var div = document.createElement('div');
      div.innerHTML = elem;
      body.appendChild(div.children[0]);
      var mathField;
      spyOn(katex, "render");
      spyOn(ecEditor, "dispatchEvent");
  
    });
    describe("Math text  Creation", function() {
        beforeEach(function() {
            ctrl = $controller('mathTextController', {
                $scope: $scope,
                instance: plugin,
                $timeout: $timeout
            });
        });
        it("Should load mathtextcontroller and check distance formula", function(done) {
            $scope.libraryEquations = [
                {
                    "title": "Area of circle",
                    "latex": "A = \\pi r^2"
                },
                {
                    "title": "Quadratic equation",
                    "latex": "x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"
                },
                {
                    "title": "Binomial theorem",
                    "latex": "(x+a)^n = \\sum _{k=0}^n(\\frac{n_{ }}{k})x^ka^{n-k}"
                },
                {
                    "title": "Expansion of a sum",
                    "latex": "(1+x)^n=1+\\frac{nx}{1!}+\\frac{n(n-1)x^2}{2!}+......."
                },
                {
                  "title": "Distance between two points",
                  "latex": "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"
                }
            ];
            expect($scope.libraryEquations).toContain( 
                {"title": "Distance between two points",
                "latex": "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"
            });
            done();
        });
        it("Should call katex render function", function() {
            $scope.latexToFormula('libFormula1', 'text');
            expect(katex.render).toHaveBeenCalled();
        });
        it("Should call latexToEquations function", function() {
            var obj = {"title":"Area of circle","latex":"A = \\pi r^2","$$hashKey":"object:1171"};
            spyOn($scope, 'latexToEquations').and.callThrough();
            $scope.latexToEquations(obj);
            expect($scope.latexToEquations).toHaveBeenCalled();
        });
        it("Should call latexToFormulaMQ  function", function() {
            var id = 'math-data';
            spyOn($scope, 'latexToFormulaMQ').and.callThrough();
            $scope.latexToFormulaMQ(id);
            expect($scope.latexToFormulaMQ).toHaveBeenCalled();
        });
        it("Should call generateImpression   function", function() {
            var data = {"type":"view","subtype":"popup-open","pageid":"MathText"};
            spyOn($scope, 'generateImpression ').and.callThrough();
            $scope.generateImpression(data);
            expect($scope.generateImpression ).toHaveBeenCalled();
        });     
        it("Should call mergeAllSymbols    function", function() {
            spyOn($scope, 'mergeAllSymbols ').and.callThrough();
            $scope.mergeAllSymbols();
            expect($scope.mergeAllSymbols ).toHaveBeenCalled();
        });   
        it("Should dispatch event", function() {
            spyOn($scope, 'addToStage').and.callThrough();
            $scope.addToStage();
            expect(ecEditor.dispatchEvent).toHaveBeenCalled();
        });
        it("Should call getCursorPosition function", function() {
            var element = {};
            element.target = {};
            element.target.selectionEnd = 24;
            element.which = 8;
            spyOn($scope, 'getCursorPosition').and.callThrough();
            $scope.getCursorPosition(element);
            expect($scope.getCursorPosition).toHaveBeenCalled();
            expect(element.which).toEqual(8);
        });
    });
  });
  //# sourceURL=math-controller.spec.js