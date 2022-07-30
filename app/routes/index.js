import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;
export default class IndexRoute extends Route {
  model = async () => {
    const defaultStatus = 'active';
    try {
      const response = await fetch(`${API_BASE_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 200 && !userData.incompleteUserDetails) {
        return userData.status ?? defaultStatus;
      } else if (response.status === 401) {
        alert('You are not logged in. Please login to continue.');
        window.open(
          'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
          '_self'
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  model = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logs/member/CACHE_SELF`, {
        credentials: 'include',
      });

      const logsData = await response.json();
      const { count, logs } = logsData;
      const timestamp = logs[logs.length - 1].timestamp;
      const time =
        new Date(timestamp._seconds * 1000).toString().slice(0, 25) +
        new Date(timestamp._seconds * 1000).toString().slice(34);

      return { count, time };
    } catch (error) {
      console.error(error.message);
    }
  };
}
