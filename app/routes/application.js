import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import redirectAuth from '../utils/redirect-auth';

const API_BASE_URL = ENV.BASE_API_URL;
export default class ApplicationRoute extends Route {
  @service toast;
  @service userState;
  model = async () => {
    const defaultName = 'User';
    const defaultPicture = 'dummyProfilePicture.png';

    try {
      const response = await fetch(`${API_BASE_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 200 && !userData.incompleteUserDetails) {
        const firstName = userData?.first_name || defaultName;
        const profilePictureURL = userData?.picture?.url || defaultPicture;
        this.userState.add('id', userData.id);
        return { firstName, profilePictureURL };
      } else if (response.status === 401) {
        this.toast.error(
          'You are not logged in. Please login to continue.',
          '',
          toastNotificationTimeoutOptions
        );
        // added setTimeout here because before new page opens user should be notified of error by toast
        setTimeout(redirectAuth, 2000);
      }
    } catch (error) {
      console.error(error.message);
      this.toast.error(
        'API Fetch Request failed',
        '',
        toastNotificationTimeoutOptions
      );
    }
  };
}
