import Component from '@glimmer/component';
import { action } from '@ember/object';
import mixpanel from 'mixpanel-browser';

mixpanel.init('5fcfb02eabfc77f5a6a0e4cb65bbf5e0', { debug: true });
export default class ButtonComponent extends Component {
  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;

    mixpanel.track('Get-Started with Real Dev Squad');

    switch (state) {
      case 'get-started':
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        !disabled ? clickHandler() : '';
        break;
      default:
        return;
    }
  }
}
