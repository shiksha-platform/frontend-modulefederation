/*
 * Plugin to create mathtext
 * @class org.ekstep.mathtext.mathTextController
 * @author Swati Singh <swati.singh@tarento.com>
 */
angular.module('org.ekstep.mathtext', [])
  .controller('mathTextController', ['$scope', 'instance', '$timeout', function ($scope, instance, $timeout) {

    var mathField, latex, latexSpan, hiddenSpanArea;
    $scope.isMathWysiwyg = true;
    $scope.latexValue = ''; 
    $scope.cursorPosition = undefined;
    $scope.text_hint = true;
    $scope.pluginLoadStartTime = new Date();
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
        "title": "Fourier series",
        "latex": "f(x)=a_0+\\sum _{n=1}^{\\infty }(a_n\\cos \\frac{n\\Pi x}{L}+b_n\\sin \\frac{n\\Pi x}{L})"
      },
      {
        "title": "Slope of a line",
        "latex": "m=\\frac{y_2-y_1}{x_2-x_1}"
      },
      {
        "title": "Distance between two points",
        "latex": "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"
      },
      {
        "title": "Volume of a sphere",
        "latex": "\\frac{4}{3}\\pi r^3"
      },
      {
        "title": "Product rule",
        "latex": "a^n\\times a^m=a^{n+m}"
      }
    ];
    $scope.activeTab = "library";
    // Each object definition is:
    // {
    //   latex: <string>, // Latex string to enter into math-field on click
    //   latexDisplay: <string>, // Latex string used to display in the UI (sometimes the latex used to display is different from the latex entered into math-field)
    //   icon: <string>, // If an icon should be displayed instead of latex
    //   symbol: <string> // If a literal symbol should be displayed instead of latex
    // }
    // Precedence for display in the UI: latexDisplay -> icon -> symbol -> latex
    $scope.symbols = {
      greek: [
        {
          latex: "\\alpha"
        },
        {
          latex: "\\beta"
        },
        {
          latex: "\\delta"
        },
        {
          latex: "\\epsilon"
        },
        {
          latex: "\\eta"
        },
        {
          latex: "\\gamma"
        },
        {
          latex: "\\iota"
        },
        {
          latex: "\\kappa"
        },
        {
          latex: "\\lambda"
        },
        {
          latex: "\\mu"
        },
        {
          latex: "\\nu"
        },
        {
          latex: "o"
        },
        {
          latex: "\\omega"
        },
        {
          latex: "\\phi"
        },
        {
          latex: "\\pi"
        },
        {
          latex: "\\psi"
        },
        {
          latex: "\\rho"
        },
        {
          latex: "\\sigma"
        },
        {
          latex: "\\tau"
        },
        {
          latex: "\\theta"
        },
        {
          latex: "\\upsilon"
        },
        {
          latex: "\\xi"
        },
        {
          latex: "\\zeta"
        },
        {
          latex: "\\Delta"
        },
        {
          latex: "\\Gamma"
        },
        {
          latex: "\\Lambda"
        },
        {
          latex: "\\Omega"
        },
        {
          latex: "\\Phi"
        },
        {
          latex: "\\Pi"
        },
        {
          latex: "\\Psi"
        },
        {
          latex: "\\Sigma"
        },
        {
          latex: "\\Theta"
        },
        {
          latex: "\\Upsilon"
        }],
      binary: [
        {
          latex: "\\ast"
        },
        {
          latex: "\\times"
        },
        {
          latex: "\\div"
        },
        {
          latex: "\\cdot"
        },
        {
          latex: "\\equiv"
        },
        {
          latex: "\\cong"
        },
        {
          latex: "\\ne"
        },
        {
          latex: "\\sim"
        },
        {
          latex: "\\simeq"
        },
        {
          latex: "\\approx"
        },
        {
          latex: "\\propto"
        },
        {
          latex: "\\models"
        },
        // {
        //   latex: "\\approxeq"
        // },
        {
          latex: "\\pm"
        },
        {
          latex: "\\mp"
        },
        {
          latex: "\\leq"
        },
        {
          latex: "\\ll"
        },
        {
          latex: "\\subset"
        },
        {
          latex: "\\subseteq"
        },
        {
          latex: "\\in"
        },
        {
          latex: "\\perp"
        },
        {
          latex: "\\mid"
        },
        {
          latex: "\\parallel"
        },
        {
          latex: "\\notin"
        },
        {
          latex: "\\cap"
        },
        {
          latex: "\\cup"
        },
        {
          latex: "\\geq"
        },
        {
          latex: "\\wedge"
        },
        {
          latex: "\\vee"
        },
        {
          latex: "\\gg"
        },
        {
          latex: "\\supset"
        },
        {
          latex: "\\supseteq"
        },
        {
          latex: "a^b"
        },
        {
          latex: "\\lt"
        },
        {
          latex: "\\gt"
        },
        {
          latex: "\\+"
        },
        {
          latex: "\\-"
        }
      ],
      arrow: [
        {
          latex: "\\leftarrow"
        },
        {
          latex: "\\Leftarrow"
        },
        {
          latex: "\\rightarrow"
        },
        {
          latex: "\\Rightarrow"
        },
        {
          latex: "\\leftrightarrow"
        },
        {
          latex: "\\Leftrightarrow"
        },
        // {
        //   latex: "\\dashrightarrow"
        // },
        // {
        //   latex: "\\leftrightarrows"
        // },
        // {
        //   latex: "\\rightleftharpoons"
        // },
        {
          latex: "\\rightharpoonup"
        },
        {
          latex: "\\rightharpoondown"
        },
        // {
        //   latex: "\\dashleftarrow"
        // },
        // {
        //   latex: "\\leftrightharpoons"
        // }
      ],
      misc: [
        {
          latex: "\\infty"
        },
        {
          latex: "\\nabla"
        },
        {
          latex: "\\partial"
        },
        {
          latex: "\\angle"
        },
        {
          latex: "\\measuredangle"
        },
        {
          latex: "\\triangle"
        },
        {
          latex: "\\square"
        },
        {
          latex: "\\overrightarrow{AB}"
        },
        {
          latex: "A^T"
        },
        {
          latex: "A^{-1}"
        },
        {
          latex: "^c"
        },
        {
          latex: "^g"
        },
        {
          latex: "\\overline{x}"
        },
        {
          latex: "\\vec{x}"
        },
        {
          latex: "\\hat{x}"
        }
      ]
    };
    $scope.symbolGroup = 'all';
    $scope.equations = {
      trig: [
        {
          latex: "\\sin\\theta"
        },
        {
          latex: "\\cos\\theta"
        },
        {
          latex: "\\sec\\theta"
        },
        {
          latex: "\\csc\\theta"
        },
        {
          latex: "\\tan\\theta"
        },
        {
          latex: "\\cot\\theta"
        },
        {
          latex: "\\log_{}\\left(\\right)",
          latexDisplay: "\\log_{b}a"
        },
        {
          latex: "\\lg"
        },
        {
          latex: "\\ln"
        },
        {
          latex: "\\lim_{x\\to\\infty}\\left(\\right)",
          latexDisplay: "lim"
        },
        {
          latex: "\\dim"
        },
        {
          latex: "y^{(n)}"
        },
        {
          latex: "\\frac{dy}{dx}"
        },
        {
          latex: "\\frac{d^2y}{dx^2}"
        },
        {
          latex: "\\frac{d^ny}{dx^n}"
        },
        {
          latex: "\\frac{\\partial f(x,y)}{\\partial x}"
        },
        {
          latex: "\\int "
        },
        {
          latex: "\\int _{ }^{ }"
        },
        {
          latex: "\\oint"
        }
      ],
      supsub: [
        {
          latex: "x^2",
          latexDisplay: "x^2"
        },
        {
          latex: "e^{ }",
          latexDisplay: "e^{\\square}"
        },
        {
          latex: "{ }^{ }",
          latexDisplay: "\\square^\\square"
        },
        {
          latex: "x_2",
          latexDisplay: "x_2"
        },
        {
          latex: "{ }_{ }",
          latexDisplay: "\\square_\\square"
        }
      ],
      root: [
        {
          latexCmd: "\\sqrt",
          latexDisplay: "\\sqrt{\\square}"
        },
        {
          latexCmd: "\\nthroot",
          latexDisplay: "\\sqrt[\\square]{\\square}"
        },
        {
          latex: "\\sqrt[3]{}",
          latexDisplay: "\\sqrt[3]{a}"
        },
        {
          latex: "\\sqrt[4]{}",
          latexDisplay: "\\sqrt[4]{a}"
        }
      ],
      frac: [
        {
          latex: "\\frac{ }{ }",
          latexDisplay: "\\frac{\\square}{\\square}"
        }
      ],
      misc: [
        {
          latex: "\\sigma^2",
          latexDisplay: "\\sigma^2"
        },
        {
          latex: "\\sigma_X",
          latexDisplay: "\\sigma_X"
        },
        {
          latex: "\\rho_{X,Y}",
          latexDisplay: "\\rho_{X,Y}"
        },
        {
          latex: "_n P^k",
          latexDisplay: "_n P^k"
        },
        {
          latex: "_n C^k",
          latexDisplay: "_n C^k"
        },
        {
          latex: "\\binom{n}{k}"
        }
      ]
    };
    $scope.advancedSymbols = [
      {
        latexText: "\\begin{vmatrix} a&b\\\\ c&d\\\\ \\end{vmatrix}"
      },
      {
        latexText: "\\begin{matrix} a&b\\\\ c&d\\\\ \\end{matrix}"
      },
      {
        latexText: "\\begin{bmatrix} a&b\\\\ c&d\\\\ \\end{bmatrix}"
      },
      {
        latexText: "\\xrightarrow{\\Delta}"
      },
      {
        latexText: "\\sphericalangle"
      },
      {
        latexText: "\\xleftrightharpoons{abc}",
        customImage: 'assets/equilibrium.png'
      },
      {
        latexText: "\\leftrightarrows"
      },
      {
        latexText: "\\widetilde{a}"
      },
      {
        latexText: "\\overgroup{AB}",
        customImage: 'assets/arc.png'
      }];
    $scope.equationGroup = 'all';
    $scope.advanceField = false;
    $scope.advancedImageArray = [];
    var MQ = MathQuill.getInterface(2); // eslint-disable-line no-undef
    $scope.valid = false;

    $scope.equationType = _.uniqBy($scope.equations, function (equation) {
      return equation.type;
    });
    $scope.symbolsDivision = {};
    $scope.equationsDivision = {};
    $scope.latexDivision = {};

    _.each($scope.symbolType, function (value, key) {
      $scope.symbolsDivision[value.type] = [];
      $scope.latexDivision[value.type] = [];
      _.each($scope.symbols, function (val, key) {
        if (value.type == val.type) {
          $scope.symbolsDivision[value.type].push(val);
          $scope.latexDivision[val.type].push(val);
        }
      });
    });

    _.each($scope.equationType, function (value, key) {
      $scope.equationsDivision[value.type] = [];
      _.each($scope.equations, function (val, key) {
        if (value.type == val.type) {
          $scope.equationsDivision[value.type].push(val);
        }
      });
    });

    _.each($scope.advancedSymbols, function(value,key){
      var url;
      if(value.customImage){
        url = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, value.customImage);
      }else{
        url = "https://latex.codecogs.com/gif.latex?" + encodeURIComponent(value.latexText);
      } 
      $scope.advancedImageArray.push(url);
    })

    $scope.generateImpression = function(data) {
      if (data){
        ecEditor.getService('telemetry').impression({
          "type": data.type,
          "subtype": data.subtype || "",
          "pageid": data.pageid || "",
          "uri": window.location.href,
          "visits": [],
          "duration": (new Date()) - $scope.pluginLoadStartTime
        });
      }
    }

    $scope.mergeAllSymbols = function () {
      return _.union($scope.symbols.greek, $scope.symbols.binary, $scope.symbols.arrow, $scope.symbols.misc);
    };

    $scope.symbolsDropDown = $scope.mergeAllSymbols();
    $scope.equationsDropDown = $scope.equationsDivision;
    $scope.latexDropDown = $scope.latexDivision;

    $scope.instance = instance;

    $scope.$on('ngDialog.opened', function (e, $dialog) {
      var currentScope = e.currentScope;
      if (currentScope.instance.mode === currentScope.instance.modes.integration) {
        if (currentScope.instance.textSelected) {
          $timeout(function () {
            $scope.advanceField = currentScope.instance.advance;
            $scope.selectedText = currentScope.instance.textSelected;
            $scope.latexToEquations({latex: currentScope.instance.latex,advance:currentScope.instance.advance});
          }, 500);
        }
      } else {
        $scope.selectedText = false;
        var textObj = ecEditor.getCurrentObject();
        if (currentScope.ngDialogData && currentScope.ngDialogData.textSelected && textObj) {
          $scope.selectedText = true;
          $timeout(function () {
            $scope.advanceField = textObj.config.advance;
            $scope.latexToEquations({latex: textObj.config.latex,advance:textObj.config.advance});
          }, 500);
        }
      }
      $scope.instanceId = currentScope.ngDialogData.instanceId;
      $timeout(function () {
        $('.mq-render').each(function (index, element) {
          MQ.StaticMath(element);
        });
      /**
       * @description 
       * - Responsible for returning the range of Cursor from selection Start
       *   to End through MOUSE EVENT.
       * - Click event has more priority than select event.
       */
      ecEditor.jQuery( '#advInput' ).select(function(selectTextEvent) {
          $scope.selectionEnd= selectTextEvent.target.selectionEnd
          $scope.selectionStart= selectTextEvent.target.selectionStart
       });
       ecEditor.jQuery( '#advInput' ).on('click',function() {
         $scope.selectionStart = $scope.selectionEnd = undefined;
       }); 
      }, 1000);
      $scope.generateImpression({ type: 'view', subtype: 'popup-open', pageid: 'MathText' });
    });

    $timeout(function () {
      $('.menu .item').tab({
        onVisible: function (e) {
          if(e == 'advanced'){
            $scope.advanceField = true;
            $scope.text_hint = false;
          }else{
            $scope.text_hint = true;
          }
          // before tab swiched
          if(e != 'advanced' && $scope.activeTab == 'advanced'){
            $scope.advanceField = false;
            $scope.$safeApply();
            var latexVal = $scope.latexValue;
            mathField.latex('');
            mathField.write(latexVal);
            if(_.isEmpty(mathField.latex())){
              $scope.latexValue = latexVal;              
              $scope.advanceField = true;
            }
            else{
              $scope.advanceField = false;
            }
          }
          $scope.activeTab = e;
          $scope.$safeApply();
         }
      });
      $('.ui.dropdown.latex-dropdown').dropdown({
        onChange: function (val, text, $choice) {
          $scope.latexDropDown = $scope.latexDivision;
          if (val != "all") {
            $scope.latexDropDown = {};
            $scope.latexDropDown[text] = $scope.latexDivision[text];
          }
          $scope.$safeApply();
        }
      });
      $('.ui.dropdown.equations-dropdown').dropdown({
        onChange: function (val, text, $choice) {
          $scope.equationsDropDown = $scope.equationsDivision;
          if (val != "all") {
            $scope.equationsDropDown = {};
            $scope.equationsDropDown[text] = $scope.equationsDivision[text];
          }
          $scope.$safeApply();
        }
      });
      $('.ui.dropdown.symbols-dropdown').dropdown({
        onChange: function (val, text, $choice) {
          $scope.symbolsDropDown = $scope.mergeAllSymbols();
          if (val != "all") {
            $scope.symbolsDropDown = {};
            $scope.symbolsDropDown[text] = $scope.symbolsDivision[text];
          }
          $scope.$safeApply();
        }
      });
    }, 1000);

    $timeout(function () {
      var mathFieldSpan = document.getElementById('math-field');
      latexSpan = document.getElementById('latex');
      hiddenSpanArea = document.getElementById('hiddenSpan');
      mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true,
        handlers: {
          edit: function () {
            latexSpan.textContent = mathField.latex();
            $scope.latexValue = latexSpan.textContent;
            $scope.valid = true;
          }
        }
      });
      window.mathField = mathField;
      $(mathFieldSpan).keydown(function (e) {
        if (e.keyCode == 86 || e.keycode == 13) { //keycode value for "v"
          $timeout(function () {
            if (!$scope.valid) { // checks if the pasted value is not valid
              ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                title: 'Incorrect formula entered.',
                position: 'topCenter',
              });
            }
            $scope.valid = false;
          }, 1);
        }
      });
    }, 300);

    $scope.latexToEquations = function (object, callbackFn) {
      var cursorPosition = !_.isUndefined($scope.cursorPosition) ? $scope.cursorPosition : $scope.latexValue.length;
      if($scope.advanceField){
        if(object.latexCmd) {
          $scope.latexValue = $scope.latexValue.substr(0, cursorPosition) + object.latexValue + $scope.latexValue.substr(cursorPosition);
        } else if(object.latex){
          $scope.latexValue = $scope.latexValue.substr(0, cursorPosition) + object.latex + $scope.latexValue.substr(cursorPosition);
        } else{
          $scope.latexValue = $scope.latexValue.substr(0, cursorPosition) + object.latexText + $scope.latexValue.substr(cursorPosition);
        }
      }
      else{
        if(object.latexCmd) {
          mathField.cmd(object.latexCmd);
        } else if(object.latex){
          mathField.write(object.latex);
        } else{
          $scope.latexValue = $scope.latexValue.substr(0, cursorPosition)  + object.latexText + $scope.latexValue.substr(cursorPosition);
        }
      }
    };

    $scope.latexToFormula = function (id, latex) {
      var mathDiv = document.getElementById(id);
      katex.render(latex, mathDiv, {displayMode: true}); // eslint-disable-line no-undef
    };

    // Some latex are not rendered correctly by katex. Use mathquill in those cases.
    $scope.latexToFormulaMQ = function(id) {
      var field = document.getElementById(id);
      MQ.StaticMath(field);
    };

    $scope.extractHTML = function(htmlElement) {
      var divElement= document.createElement('div');
      divElement.innerHTML= htmlElement;
      return divElement.textContent || divElement.innerText;
    }

    $scope.getCursorPosition = function(e){
      var currentPosition = e.target.selectionEnd;
      if(!_.isUndefined($scope.selectionStart)){
        $scope.cursorPosition = $scope.selectionStart ;
      }else{
        if(e.which == 8 && currentPosition > 0 ){
          $scope.cursorPosition = currentPosition -1;
        }else{
          $scope.cursorPosition = currentPosition;
        } 
      }
    };

    $scope.addToStage = function (activeTab) {
      var equation,advance;
      if(!$scope.advanceField){
        var htmlElement = document.getElementById('latex').innerHTML;
        equation = $scope.extractHTML(htmlElement);
        advance = false;

      }
      else {
        equation = $scope.latexValue;
        advance = true;
      }
      if (instance.mode === instance.modes.integration) {
        var mathtextObj = {"latex": equation,
                           "editMode": instance.textSelected,
                           "advance" : advance
                          };
        instance.callbackFn(mathtextObj);
      } else {
        // Convert the latex or mathquill to equation
        // add it to the stage
        if ($scope.selectedText && $scope.instanceId) {
          ecEditor.dispatchEvent('org.ekstep.mathtext:edit', {
            instanceId: $scope.instanceId,
            latex: equation,
            advance: advance
          });
        } else {
          ecEditor.dispatchEvent('org.ekstep.mathtext:create', {
            "latex": equation,
            "advance": advance,
            "type": "rect",
            "x": 10,
            "y": 20,
            "fill": "rgba(0, 0, 0, 0)",
            "opacity": 1,
            "fontFamily": 'NotoSans',
            "fontSize": 18,
            "backgroundcolor": "#fff"
          });
        }
      }
      ecEditor.dispatchEvent('org.ekstep.mathtext:addEquation', {
        latex: equation,
        advance: advance
      });
      $scope.closeThisDialog();
    }
  }]);

//# sourceURL=mathText.js