import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { AUTH_STATUS } from '../constants/auth-status';
import { FETCH_AUTH_STATUS, FETCH_DEVICE_INFO } from '../constants/url';

export default class MobileController extends Controller {
  @service toast;
  @service router;

  async fetchAuthStatus(authStatus) {
    const response = await fetch(`${FETCH_AUTH_STATUS}${authStatus}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return response;
  }

  @action async verifyAuth() {
    if (
      confirm(
        'Are you sure you are the one who scanned this QR code?  Do you want to proceed?'
      )
    ) {
      try {
        const checkStatus = await this.fetchAuthStatus(AUTH_STATUS.AUTHORIZED);
        if (checkStatus.status !== 200) {
          throw Error('Something went wrong. Please try again later');
        }
        this.router.transitionTo('/');
        this.toast.success('Mobile login successful', 'Success');
      } catch (error) {
        this.toast.error(
          'Something went wrong. Please try again later',
          '',
          toastNotificationTimeoutOptions
        );
      }
    } else {
      // will cancel the login
      try {
        const checkStatus = await this.fetchAuthStatus(AUTH_STATUS.REJECTED);
        if (checkStatus.response.status !== 200) {
          throw Error('Something went wrong. Please try again later');
        }
        this.toast.success('Your request has been cancelled', 'Success');
      } catch (error) {
        this.toast.error(
          'Something went wrong. Please try again later',
          '',
          toastNotificationTimeoutOptions
        );
      }
    }
  }

  @action async buttonClicked() {
    try {
      const response = await fetch(FETCH_DEVICE_INFO, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        await this.verifyAuth();
      } else {
        this.toast.error(
          'Please scan the QR code to continue',
          'Not verified',
          toastNotificationTimeoutOptions
        );
      }
    } catch (error) {
      this.toast.error('error');
    }
  }
}
