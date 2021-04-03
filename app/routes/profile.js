import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

export default class SignupRoute extends Route {
  async model() {
    const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
      credentials: 'include',
    });
    const userData = await response.json();
    return userData;
  }
}
