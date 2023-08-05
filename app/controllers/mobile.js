import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class MobileController extends Controller {
  @action buttonClicked() {
    if (
      confirm(
        'Are you sure you are the one who scanned this QR code?  Do you want to proceed?'
      )
    ) {
      // will do api call to authenticate the user
    } else {
      // will cancel the login
    }
  }
}
