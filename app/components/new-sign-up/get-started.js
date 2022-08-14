import Component from '@glimmer/component';
import {
  GET_STARTED_MAIN_HEADING,
  GET_STARTED_SUB_HEADING,
  THANK_YOU_MAIN_HEADING,
  THANK_YOU_SUB_HEADING,
} from '../../constants/signup';

export default class GetStartedComponent extends Component {
  get mainHeading() {
    const { currentStep } = this.args;

    return currentStep === 'get-started'
      ? GET_STARTED_MAIN_HEADING
      : THANK_YOU_MAIN_HEADING;
  }

  get subHeading() {
    const { currentStep } = this.args;

    return currentStep === 'get-started'
      ? GET_STARTED_SUB_HEADING
      : THANK_YOU_SUB_HEADING;
  }
}
