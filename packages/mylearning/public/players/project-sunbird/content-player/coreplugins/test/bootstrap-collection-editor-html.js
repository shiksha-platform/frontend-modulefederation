'use strict';
(function addtreeToBody() {
    var domElement = '<div id="collection-tree"></div>';
    var body = document.getElementsByTagName("body")[0];
    var div = document.createElement('div');
   div.innerHTML = domElement;
   body.appendChild(div.children[0]);
})();
