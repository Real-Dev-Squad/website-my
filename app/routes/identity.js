import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { AUTH_URL } from '../constants/signup';

export default class IdentityRoute extends Route {
  @service toast;
  async model() {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 401) {
        throw new Error('You are not logged in. Please login to continue.');
      }
      return userData;
    } catch (error) {
      console.error(error.message);
      this.toast.error(error, '', toastNotificationTimeoutOptions);
      // added setTimeout here because before new page opens user should be notified of error by toast
      setTimeout(() => {
        let authUrl = AUTH_URL;
        if (typeof window !== 'undefined') {
          authUrl = `${authUrl}&state=${window.location.href}`;
        }
        window.open(authUrl, '_self');
      }, 2000);
    }
  }
}
