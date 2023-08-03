import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'website-my/config/environment';
import { SIGNUP } from '../constants/analytics';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { ERROR_MESSAGES, REDIRECT_TEXT } from '../constants/signup';
import { AUTH_URL, GOTO_URL } from '../constants/url';
export default class NewSignupRoute extends Route {
  @service analytics;
  @service toast;
  @service featureFlag;

  async model() {
    try {
      this.analytics.trackEvent(SIGNUP.PAGE_LOADED);
      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 401) {
        this.toast.error(
          REDIRECT_TEXT.loggedIn,
          '',
          toastNotificationTimeoutOptions
        );
        setTimeout(() => window.open(AUTH_URL, '_self'), 2000);
      }
      if (response.status === 200 && !userData.incompleteUserDetails) {
        this.analytics.trackEvent(SIGNUP.USER_ALREADY_REGISTERED);
        this.toast.error(
          REDIRECT_TEXT.formAlreadyFilled,
          '',
          toastNotificationTimeoutOptions
        );
        if (this.featureFlag.isDevMode) {
          setTimeout(
            () =>
              window.open('https://realdevsquad.com/goto?dev=true', '_self'),
            2000
          );
        } else {
          setTimeout(() => window.open(GOTO_URL, '_self'), 2000);
        }
      }
    } catch {
      this.toast.error(
        ERROR_MESSAGES.unknown,
        '',
        toastNotificationTimeoutOptions
      );
    }
  }
}
