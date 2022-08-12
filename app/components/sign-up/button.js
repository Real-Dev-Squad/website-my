import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ButtonComponent extends Component {
  @service mixpanelAnalytics;

  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;
    let event;

    switch (state) {
      case 'get-started':
        event = 'User Getting-Started - New SignUp Flow';
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        event = 'User entered First Name - New SignUp Flow';
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        event = 'User entered Last Name - New SignUp Flow';
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        event = 'User entered Username - New SignUp Flow';
        !disabled ? clickHandler() : '';
        break;
      default:
        event = 'Something went wrong - New SignUp Flow';
        return;
    }

    this.mixpanelAnalytics.trackEvent(event);
  }
}
