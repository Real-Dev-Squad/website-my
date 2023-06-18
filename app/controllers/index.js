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
  @service userStatus;
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
      await fetch(`${BASE_URL}/users/status/self`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.data.currentStatus?.state) {
            this.status = responseData.data.currentStatus.state;
            console.log('response', responseData);
            this.userStatus.updateCurrentUserStatus(
              responseData.data.currentStatus.state
            );
            this.toast.success(
              'Current status updated successfully.',
              '',
              toastNotificationTimeoutOptions
            );
          } else if (responseData.data.futureStatus?.state) {
            this.toast.success(
              'Future status updated successfully.',
              '',
              toastNotificationTimeoutOptions
            );
          }
        });
    } catch (error) {
      console.error('Error : ', error);
      this.toast.error(
        'Status Update failed. Something went wrong.',
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
