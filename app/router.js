import EmberRouter from '@ember/routing/router';
import config from 'website-my/config/environment';
import { inject as service } from '@ember/service';
export default class Router extends EmberRouter {
  @service router;
  location = config.locationType;
  rootURL = config.rootURL;
  queryParams = {
    dev: {
      refreshModel: false,
    },
  };
}
Router.map(function () {
  this.route('signup');
  this.route('new-signup');
  this.route('notifications');
  this.route('tasks');
  this.route('profile');
  this.route('identity');
});
