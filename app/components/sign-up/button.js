import Component from '@glimmer/component';
import { action } from '@ember/object';
import { trackEvent } from '../../utils/mixpanel';

export default class ButtonComponent extends Component {
  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;

    switch (state) {
      case 'get-started':
        trackEvent('User Getting-Started - New SignUp Flow');
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        trackEvent('User entered First Name - New SignUp Flow');
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        trackEvent('User entered Last Name - New SignUp Flow');
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        trackEvent('User entered Username - New SignUp Flow');
        !disabled ? clickHandler() : '';
        break;
      default:
        return;
    }
  }
}
