import Component from '@glimmer/component';
import {
  GET_STARTED_MAIN_HEADING,
  GET_STARTED_SUB_HEADING,
  THANK_YOU_MAIN_HEADING,
  THANK_YOU_SUB_HEADING,
  SIGNUP_STEPS,
  SIGNUP_STEPS_BUTTON_LABELS,
} from '../../constants/signup';

export default class GetStartedComponent extends Component {
  get mainHeading() {
    const { currentStep } = this.args;

    return currentStep === SIGNUP_STEPS.getStarted
      ? GET_STARTED_MAIN_HEADING
      : THANK_YOU_MAIN_HEADING;
  }

  get subHeading() {
    const { currentStep } = this.args;

    return currentStep === SIGNUP_STEPS.getStarted
      ? GET_STARTED_SUB_HEADING
      : THANK_YOU_SUB_HEADING;
  }

  get signUpStepsConstants() {
    return SIGNUP_STEPS;
  }

  get buttonLabels() {
    return SIGNUP_STEPS_BUTTON_LABELS;
  }
}
