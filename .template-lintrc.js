'use strict';

module.exports = {
  extends: 'octane',

  rules: {
    'no-curly-component-invocation': { allow: ['initialTheme'] },
    'no-implicit-this': { allow: ['initialTheme'] },
  },
};
