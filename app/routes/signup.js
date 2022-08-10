import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'website-my/config/environment';

export default class SignupRoute extends Route {
  @service mixpanelAnalytics;

  async model() {
    this.mixpanelAnalytics.trackEvent('Signup Page Loaded Successfully');
    const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
      credentials: 'include',
    });
    const userData = await response.json();
    if (response.status === 401) {
      alert('You have not logged in. Please login first to fill this form.');
      window.open(
        'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
        '_self'
      );
    }
    if (response.status === 200 && !userData.incompleteUserDetails) {
      this.mixpanelAnalytics.trackEvent('User Already Registered');
      alert("You already have filled the up form. You'll now be redirected.");
      window.open('https://realdevsquad.com/goto', '_self');
    }
  }
}
