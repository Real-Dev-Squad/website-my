import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SignupComponent extends Component {
  get label() {
    const { state } = this.args;

    const labelText = {
      firstName: 'What is your First Name?',
      lastName: 'And what\'s is your Last Name?',
      userName: 'Now choose your awesome username!',
    };

    return labelText[state];
  }

  @action inputFieldChanged({ target: { value } }) {
    const { onChange, state } = this.args;
    onChange(state, value);
  }
}
