import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import registerUser from '../utils/register-api';
import { inject as service } from '@ember/service';

const SIGNUP_STEPS = [
  'get-started',
  'firstName',
  'lastName',
  'username',
  'thank-you',
];

export default class SignupController extends Controller {
  @service router;

  @tracked isSubmitClicked = false;
  @tracked isButtonDisabled = true;

  currentStepIndex = 0;

  // new-signup?state=firstName

  @tracked dev = false;
  @tracked userDetails = {
    firstName: '',
    lastName: '',
    username: '',
  };
  @tracked errorMessage;

  get currentStep() {
    return this.router.currentRoute?.queryParams.state;
  }

  @action changeRouteParams() {
    const nextStepIndex = this.currentStepIndex + 1;

    if (nextStepIndex > SIGNUP_STEPS.length) {
      throw new Error('Invalid Step');
    }

    this.currentStepIndex = nextStepIndex;

    this.router.transitionTo({
      queryParams: {
        state: SIGNUP_STEPS[nextStepIndex],
      },
    });
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
