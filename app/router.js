import EmberRouter from '@ember/routing/router';
import config from 'website-my/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('signup');
  this.route('new-signup');
  this.route('notifications');
  this.route('tasks');
  this.route('profile');
  this.route('identity');
  this.route('404', { path: '/*' });
  this.route('discord');
  this.route('mobile');
});
