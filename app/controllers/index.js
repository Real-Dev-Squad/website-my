import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { USER_STATES } from '../constants/user-status';
import {
  MAX_CACHE_PURGE_COUNT,
  LAST_UPDATED_REQUEST,
} from '../constants/self-clear-cache';
import { getUTCMidnightTimestampFromDate } from '../utils/date-conversion';

const BASE_URL = ENV.BASE_API_URL;

export default class IndexController extends Controller {
  @service featureFlag;
  @service toast;
  @tracked status = this.model;
  @tracked isStatusUpdating = false;
  @tracked showUserStateModal = false;
  @tracked newStatus;
  @tracked isPurgingCache = false;
  @tracked cacheTriggeredPending = MAX_CACHE_PURGE_COUNT;
  lastUpdatedCacheRequest = LAST_UPDATED_REQUEST;

  @action toggleUserStateModal() {
    this.showUserStateModal = !this.showUserStateModal;
  }

  get isDevMode() {
    return this.featureFlag.isDevMode;
  }
  get isCacheEnabled() {
    return this.featureFlag.isCacheEnabled;
  }

  @action async updateStatus(newStatus) {
    this.isStatusUpdating = true;
    if (!('cancelOoo' in newStatus)) {
      if (newStatus.currentStatus.state !== USER_STATES.ACTIVE) {
        this.toggleUserStateModal();
      }
    }
    try {
      await fetch(`${BASE_URL}/users/status/self?userStatusFlag=true`, {
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

  @action
  async statusUpdateDevApi(from, until, message) {

    this.toggleUserStateModal();

    const statusRequestBody = {
      type: 'OOO',
      from: getUTCMidnightTimestampFromDate(from),
      until: getUTCMidnightTimestampFromDate(until),
      reason: message,
    };
    try {
      const response = await fetch(`${BASE_URL}/requests?dev=true`, {
        method: 'POST',
        body: JSON.stringify(statusRequestBody),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        this.toast.success(data.message, '', toastNotificationTimeoutOptions);
      } else {
        this.toast.error(data.message, '', toastNotificationTimeoutOptions);
      }
    } catch (error) {
      this.toast.error(
        'OOO status request failed. Something went wrong.',
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

  @action async purgeCache() {
    this.isPurgingCache = true;
    try {
      const response = await fetch(`${BASE_URL}/cache`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        this.cacheTriggeredPending--;
        this.toast.success(data.message, '', toastNotificationTimeoutOptions);
      } else {
        this.toast.error(
          'Something went wrong.',
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
      this.isPurgingCache = false;
    }
  }
}
