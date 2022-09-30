QSTelemetryLogger = { // eslint-disable-line no-undef
  EVENT_TYPES: {
    TOUCH: 'TOUCH',
    RESPONSE: 'RESPONSE',
    ASSESS: 'ASSESS',
    ASSESSEND: 'ASSESSEND'
  },
  _plugin: {},
  _question: {},
  _assessStart: {},
  _qData: {},
  _qConfig: {}
};
QSTelemetryLogger.logEvent = function(type) { // eslint-disable-line no-undef
  switch (type.toUpperCase()) {
    case 'DEFAULT':
      return true;
  }
};