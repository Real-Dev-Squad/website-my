import JSONAPIAdapter from '@ember-data/adapter/json-api';
// import { get } from '@ember/object';

import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = API_BASE_URL;
  headers = {
    credentials: 'include',
  };

  _fetchRequest(options) {
    options.credentials = 'include';

    return fetch(options.url, options);
  }

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
