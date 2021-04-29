import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default class IndexController extends Controller {
  @tracked status = this.model;

  @action async updateStatus(status) {
    this.status = status;
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: status,
        }),
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
