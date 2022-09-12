import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'website-my/config/environment';
import { SIGNUP } from '../constants/analytics';
import { REDIRECT_TEXT } from '../constants/signup';

export default class SignupRoute extends Route {
  @service analytics;
  @service router;

  afterModel(model, transition) {
    if (transition?.to?.queryParams?.dev === 'true') {
      this.router.transitionTo('new-signup');
    }
  }
  async model() {
    this.analytics.trackEvent(SIGNUP.PAGE_LOADED);
    const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
      credentials: 'include',
    });
    const userData = await response.json();
    if (response.status === 401) {
      alert(REDIRECT_TEXT.loggedIn);
      window.open(
        'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
        '_self'
      );
    }
    if (response.status === 200 && !userData.incompleteUserDetails) {
      this.analytics.trackEvent(SIGNUP.USER_ALREADY_REGISTERED);
      alert(REDIRECT_TEXT.formAlreadyFilled);
      window.open('https://realdevsquad.com/goto', '_self');
    }
  }
}
