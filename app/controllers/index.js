import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default class IndexController extends Controller {
  @tracked status = this.model.user.status;
  @tracked isStatusUpdating = false;

  @tracked timestamp = this.model.cache.timestamp;
  @tracked count = this.model.cache.count;

  @tracked isPurgingCache = false;

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
      const response = await fetch(`${BASE_URL}/members/cache`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error : ', error);
      alert('Something went wrong!');
    } finally {
      this.isPurgingCache = false;
      const newCache = await this.store.queryRecord('caches', {});
      this.timestamp = newCache.timestamp;
      this.count = newCache.count;
    }
  }
}
