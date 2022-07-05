import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default class IndexController extends Controller {
  @tracked status = this.model;
  @tracked isStatusUpdating = false;

  @tracked isPurgingCache = false;
  @tracked timestamp = '';
  @tracked cacheCount = 0;

  @action async updateStatus(status) {
    this.isStatusUpdating = true;
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify({
          status,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        this.status = status;
      }
    } catch (error) {
      console.error('Error : ', error);
      alert('Something went wrong!');
    } finally {
      this.isStatusUpdating = false;
    }
  }

  @action async purgeCache() {
    this.isPurgingCache = true;
    try {
      const response = await fetch(`${BASE_URL}/members/cache/clear/self`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.error('Error : ', error);
      alert('Something went wrong!');
    } finally {
      this.isPurgingCache = false;
    }
  }
}
