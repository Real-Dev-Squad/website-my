import Component from '@glimmer/component';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;
export default class IndexButtonsComponent extends Component {
  async updateStatus(status) {
    const newStatus = { [status]: true };
    console.log(newStatus);
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log(response);
    } catch (error) {
      console.error('Error : ', error);
    }
  }
}
