'use strict';

angular.module('puigcerber.camelize', [])
  .filter('camelize', function () {
    return function (input) {
      if (!input) {
        return input;
      }
      return input.replace(/[^A-Za-z0-9]+(\w|$)/g, function (_, letter) {
        return letter.toUpperCase();
      }).replace(/^(.)/, function (_, letter) {
        return letter.toLowerCase();
      });
    };
});
