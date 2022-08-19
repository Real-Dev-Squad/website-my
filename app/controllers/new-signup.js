import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import registerUser from '../utils/register-api';
import { SIGNUP_STEPS as SIGNUP_STEPS_CONSTANTS } from '../constants/signup';

const SIGNUP_STEPS = [
  SIGNUP_STEPS_CONSTANTS.getStarted,
  SIGNUP_STEPS_CONSTANTS.firstName,
  SIGNUP_STEPS_CONSTANTS.lastName,
  SIGNUP_STEPS_CONSTANTS.username,
  SIGNUP_STEPS_CONSTANTS.thankYou,
];

export default class SignupController extends Controller {
  @tracked isSubmitClicked = false;
  @tracked isButtonDisabled = true;

  @tracked currentStepIndex = 0;

  @tracked dev = false;
  @tracked userDetails = {
    firstName: '',
    lastName: '',
    username: '',
  };
  @tracked errorMessage;

  get currentStep() {
    console.log(SIGNUP_STEPS[this.currentStepIndex]);
    return SIGNUP_STEPS[this.currentStepIndex];
  }

  get signUpStepsConstants() {
    return SIGNUP_STEPS_CONSTANTS;
  }

  @action changeRouteParams() {
    const nextStepIndex = this.currentStepIndex + 1;

    console.log(nextStepIndex, SIGNUP_STEPS.length);

    if (nextStepIndex >= SIGNUP_STEPS.length) {
      this.signup();
      return;
    }

    this.currentStepIndex = nextStepIndex;
    this.isButtonDisabled = true;
  }

  @action handleInputChange(key, value) {
    set(this.userDetails, key, value);
    if (this.userDetails[key] > '') this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }

  @action signup() {
    const user = {
      first_name: this.userDetails['firstName'],
      last_name: this.userDetails['lastName'],
      username: this.userDetails.username,
    };
    this.isSubmitClicked = true;
    console.log(user);

    registerUser(user)
      .then((res) => {
        if (res.status === 204) {
          window.open('https://realdevsquad.com/goto', '_self');
        } else {
          res.json().then((res) => {
            this.errorMessage = res.errors[0].title;
          });
        }
      })
      .catch((err) => (this.errorMessage = err))
      .finally(() => {
        this.isSubmitClicked = false;
      });
  }
}
