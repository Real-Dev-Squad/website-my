import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'website-my/config/environment';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

export default class MobileController extends Controller {
  @service toast;
  @service router;

  @action async buttonClicked() {
    if (
      confirm(
        'Are you sure you are the one who scanned this QR code?  Do you want to proceed?'
      )
    ) {
      try {
        const authStatus = 'AUTHORIZED';
        const response = await fetch(
          `${ENV.BASE_API_URL}/auth/qr-code-auth/authorization_status/${authStatus}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          this.router.transitionTo('/');
        } else {
          this.toast.error(
            'Something went wrong. Please try again later',
            '',
            toastNotificationTimeoutOptions
          );
        }
      } catch (error) {
        this.toast.error(
          'Something went wrong. Please try again later',
          '',
          toastNotificationTimeoutOptions
        );
        console.error(error.message);
      }
    } else {
      // will cancel the login
    }
  }
}
