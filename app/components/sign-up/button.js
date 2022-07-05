import Component from '@glimmer/component';
import { action } from '@ember/object';
import mixpanelAnalytics from '../../utils/mixpanel-analytics';

export default class ButtonComponent extends Component {
  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;

    switch (state) {
      case 'get-started':
        mixpanelAnalytics().trackEvent(
          'User Getting-Started - New SignUp Flow'
        );
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        mixpanelAnalytics().trackEvent(
          'User entered First Name - New SignUp Flow'
        );
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        mixpanelAnalytics().trackEvent(
          'User entered Last Name - New SignUp Flow'
        );
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        mixpanelAnalytics().trackEvent(
          'User entered Username - New SignUp Flow'
        );
        !disabled ? clickHandler() : '';
        break;
      default:
        return;
    }
  }
}
