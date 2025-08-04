import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import redirectAuth from '../utils/redirect-auth';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksRoute extends Route {
  @service toast;
  @service router;

  beforeModel() {
    // This route is deprecated and redirects to the status site
    // See ticket for context on the redirection strategy
    // https://github.com/Real-Dev-Squad/website-www/issues/1031
    return this.router.transitionTo('goto', {
      queryParams: { from: this.routeName },
    });
  }

  model = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/self`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status == 401) {
          throw new Error('Please log in to continue');
        }
        throw new Error('Oops, We ran into a problem!');
      }
      return await response.json();
    } catch (error) {
      this.toast.error(error, '', toastNotificationTimeoutOptions);
      // added setTimeout here because before new page opens user should be notified of error by toast
      setTimeout(redirectAuth, 2000);
    }
  };
}
