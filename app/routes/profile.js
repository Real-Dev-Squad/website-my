import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

export default class ProfileRoute extends Route {
  async model() {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error(error.message);
    }
  }
}
