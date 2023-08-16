import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LABEL_TEXT } from '../../constants/new-signup';

export default class SignupComponent extends Component {
  get label() {
    const { currentStep, dev } = this.args;

    if (dev) {
      if (currentStep === 'username') {
        return 'Your Auto-generated Username!';
      }
    } else {
      return LABEL_TEXT[currentStep];
    }
  }

  @action inputFieldChanged({ target: { value } }) {
    const { onChange, currentStep } = this.args;
    onChange(currentStep, value);
  }
}
