import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import redirectAuth from '../utils/redirect-auth';

export default class IdentityRoute extends Route {
  @service toast;
  async model() {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/users?profile=true`, {
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
      setTimeout(redirectAuth, 2000);
    }
  }
}
