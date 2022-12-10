import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { USER_STATES } from '../constants/user-status';
import { AUTH_URL } from './../constants/signup';
const API_BASE_URL = ENV.BASE_API_URL;
export default class IndexRoute extends Route {
  @service toast;
  model = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/status/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 200) {
        return userData?.data?.currentStatus?.state ?? USER_STATES.DNE;
      } else if (response.status === 401) {
        this.toast.error(
          'You are not logged in. Please login to continue.',
          '',
          toastNotificationTimeoutOptions
        );
        // added setTimeout here because before new page opens user should be notified of error by toast
        setTimeout(() => {
          let authUrl = AUTH_URL;
          if (typeof window !== 'undefined') {
            authUrl = `${authUrl}&state=${window.location.href}`;
          }
          window.open(authUrl, '_self');
        }, 2000);
      } else if (response.status === 404) {
        this.toast.error(
          `Your Status data doesn't exist yet. Please choose your status from the options below.`,
          '',
          toastNotificationTimeoutOptions
        );
        return USER_STATES.DNE;
      }
    } catch (error) {
      console.error(error.message);
    }
  };
}
