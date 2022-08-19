import Component from '@glimmer/component';
import { action } from '@ember/object';
import {
  LABEL_TEXT,
  PLACEHOLDER_TEXT,
  SIGNUP_STEPS_BUTTON_LABELS,
} from '../../constants/signup';

export default class SignupComponent extends Component {
  get labels() {
    const { currentStep } = this.args;

    return {
      heading: LABEL_TEXT[currentStep],
      placeholder: PLACEHOLDER_TEXT[currentStep],
    };
  }

  @action inputFieldChanged({ target: { value } }) {
    const { onChange, currentStep } = this.args;
    onChange(currentStep, value);
  }

  get buttonLabels() {
    return SIGNUP_STEPS_BUTTON_LABELS;
  }
}
