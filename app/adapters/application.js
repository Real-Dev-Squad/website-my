import JSONAPIAdapter from '@ember-data/adapter/json-api';
// import { get } from '@ember/object';

import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = API_BASE_URL;

  ajaxOptions() {
    const options = super.ajaxOptions(...arguments);
    options.credentials = 'include';
    return options;
  }

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
