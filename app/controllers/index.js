import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

const BASE_URL = ENV.BASE_API_URL;

export default class IndexController extends Controller {
  @service toast;
  @tracked status = this.model;
  @tracked isStatusUpdating = false;
  @tracked showUserStateModal = false;
  @tracked newStatus;

  @action toggleUserStateModal() {
    this.showUserStateModal = !this.showUserStateModal;
  }

  @action async updateStatus(newStatus) {
    this.isStatusUpdating = true;
    try {
      const response = await fetch(`${BASE_URL}/users/status/self`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        this.status = newStatus.currentStatus.state;
      }
    } catch (error) {
      console.error('Error : ', error);
      this.toast.error(
        'Something went wrong.',
        '',
        toastNotificationTimeoutOptions
      );
    } finally {
      this.isStatusUpdating = false;
    }
    this.toggleUserStateModal();
  }

  @action async changeStatus(status) {
    this.newStatus = status;
    this.toggleUserStateModal();
  }
}
