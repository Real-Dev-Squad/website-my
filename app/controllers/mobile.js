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

        if (response.status !== 200) {
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
    }
  }
}
