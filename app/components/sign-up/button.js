import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonComponent extends Component {
  get buttonClass() {
    const { disabled } = this.args;

    if (disabled) return 'btn-disabled';
    return '';
  }
  @action
  buttonClickHandler() {
    const { what, clickHandler, disabled } = this.args;

    switch (what) {
      case 'get-started':
        !disabled ? clickHandler('first-name') : '';
        break;
      case 'first-name':
        !disabled ? clickHandler('last-name') : '';
        break;
      case 'last-name':
        !disabled ? clickHandler('user-name') : '';
        break;
      case 'user-name':
        !disabled ? clickHandler() : '';
        break;
      default:
        return;
    }
  }
}
