import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

export default class ProfileRoute extends Route {
  async model() {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 401) {
        alert('You are not logged in. Please login to continue.');
        window.open('https://my.realdevsquad.com/signup', '_self');
      } else {
        return userData;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
