windowmock.open = function(url, target, settings) { // eslint-disable-line no-undef
  return {
    addEventListener: function(event, callback) {
      if (event == 'loadstart') {
        callback({
          url: 'URL',
          originalEvent: {},
        });
      }
    },
    close: function() {}
  }
}