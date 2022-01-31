import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'website-my/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.BASE_API_URL;
}
