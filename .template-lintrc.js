'use strict';

module.exports = {
  extends: 'octane',

  rules: {
    'no-curly-component-invocation': { allow: ['setTheme'] },
    'no-implicit-this': { allow: ['setTheme'] },
  },
};
