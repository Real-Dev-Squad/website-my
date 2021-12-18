import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;
export default class IndexRoute extends Route {
  model = async () => {
    const defaultStatus = 'active';
    const response = await fetch(`${API_BASE_URL}/users/self`, {
      credentials: 'include',
    });
    const userData = await response.json();
    return userData.status ?? defaultStatus;
  };
}
