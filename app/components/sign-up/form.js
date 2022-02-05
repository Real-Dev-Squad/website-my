import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LABEL_TEXT } from '../../constants/signup';
import mixpanel from 'mixpanel-browser';

mixpanel.init('5fcfb02eabfc77f5a6a0e4cb65bbf5e0', { debug: true });
export default class SignupComponent extends Component {
  get label() {
    const { state } = this.args;

    return LABEL_TEXT[state];
  }

  @action inputFieldChanged({ target: { value } }) {
    mixpanel.track('New Signup Flow in Progress');
    const { onChange, state } = this.args;
    onChange(state, value);
  }
}
