import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { NEW_SIGNUP_FLOW } from '../../constants/analytics';

export default class ButtonComponent extends Component {
  @service analytics;

  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled, routeParams } = this.args;

    // Click handler should only trigger if the button is not disabled
    !disabled && clickHandler(routeParams.get(state));
  }
}
