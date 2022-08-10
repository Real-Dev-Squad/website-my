import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ButtonComponent extends Component {
  @service mixpanelAnalytics;

  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;

    switch (state) {
      case 'get-started':
        this.mixpanelAnalytics.trackEvent(
          'User Getting-Started - New SignUp Flow'
        );
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        this.mixpanelAnalytics.trackEvent(
          'User entered First Name - New SignUp Flow'
        );
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        this.mixpanelAnalytics.trackEvent(
          'User entered Last Name - New SignUp Flow'
        );
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        this.mixpanelAnalytics.trackEvent(
          'User entered Username - New SignUp Flow'
        );
        !disabled ? clickHandler() : '';
        break;
      default:
        return;
    }
  }
}
