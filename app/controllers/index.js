import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { USER_STATES } from '../constants/user-status';

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
    if (newStatus.currentStatus.state !== USER_STATES.ACTIVE) {
      this.toggleUserStateModal();
    }
    try {
      const response = await fetch(`${BASE_URL}/users/status/self`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const { status, statusText } = response;
      if (status === 200) {
        this.status = newStatus.currentStatus.state;
      } else {
        this.toast.error(
          `${statusText}. Status Update failed`,
          '',
          toastNotificationTimeoutOptions
        );
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
  }

  @action changeStatus(status) {
    this.newStatus = status;
    this.toggleUserStateModal();
  }
}
