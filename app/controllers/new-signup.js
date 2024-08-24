import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { registerUser, newRegisterUser } from '../utils/register-api';
import { GOTO_URL } from '../constants/url';
import { NEW_SIGNUP_FLOW } from '../constants/analytics';
import { ERROR_MESSAGES, NEW_SIGNUP_STEPS } from '../constants/new-signup';
import checkUserName from '../utils/check-username';
import ENV from 'website-my/config/environment';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

export default class NewSignUpController extends Controller {
  @service analytics;
  @service featureFlag;
  @service toast;

  queryParams = ['currentStep', 'dev'];

  @tracked isLoading = false;
  @tracked isButtonDisabled = true;
  @tracked error = '';
  @tracked currentStep = NEW_SIGNUP_STEPS[0];
  FIRST_STEP = NEW_SIGNUP_STEPS[0];
  SECOND_STEP = NEW_SIGNUP_STEPS[1];
  THIRD_STEP = NEW_SIGNUP_STEPS[2];
  FOURTH_STEP = NEW_SIGNUP_STEPS[3];
  FIFTH_STEP = NEW_SIGNUP_STEPS[4];
  LAST_STEP = NEW_SIGNUP_STEPS[5];

  get isDevMode() {
    return this.featureFlag.isDevMode;
  }

  @tracked signupDetails = {
    firstName: '',
    lastName: '',
    username: '',
    roles: {},
  };

  @action changeStepToTwo() {
    this.currentStep = this.SECOND_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_GETTING_STARTED);
  }

  async generateUsername(firstname, lastname) {
    if (typeof firstname !== 'string' || typeof lastname !== 'string') {
      throw new Error('Invalid input: firstname and lastname must be strings');
    }
    try {
      const sanitizedFirstname = firstname.toLowerCase();
      const sanitizedLastname = lastname.toLowerCase();

      const response = await fetch(
        `${ENV.BASE_API_URL}/users/username?dev=true&firstname=${sanitizedFirstname}&lastname=${sanitizedLastname}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const user = await response.json();

      if (user && user.username) {
        return user;
      }
      throw new Error(
        'Username generation failed: Invalid response from server'
      );
    } catch (err) {
      this.toast.error(
        ERROR_MESSAGES.usernameGeneration,
        'error!',
        toastNotificationTimeoutOptions
      );
      throw new Error(ERROR_MESSAGES.usernameGeneration);
    }
  }
  @action changeStepToThree() {
    this.currentStep = this.THIRD_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_FIRST_NAME);
    this.isButtonDisabled = true;
  }
  @action changeStepToFour() {
    this.currentStep = this.FOURTH_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_LAST_NAME);
    this.isButtonDisabled = true;
  }
  @action changeStepToFive() {
    this.currentStep = this.FIFTH_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_USERNAME);
    this.isButtonDisabled = true;
  }
  @action register() {
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_ROLE);
    this.isButtonDisabled = true;
    this.signup();
  }
  @action completeSignUp() {
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.NEW_SIGNUP_FLOW_DONE);
    if (this.isDevMode) {
      window.open('https://realdevsquad.com/goto?dev=true', '_self');
    } else {
      window.open(GOTO_URL, '_self');
    }
  }
  @action handleInputChange(key, value) {
    this.error = '';
    set(this.signupDetails, key, value);
    if (this.signupDetails[key] > '') this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }
  @action handleCheckboxInputChange(key, value) {
    set(this.signupDetails.roles, key, value);
    if (Object.values(this.signupDetails.roles).includes(true)) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }
  @action async signup() {
    try {
      let user;
      this.isLoading = true;
      if (!this.isDevMode)
        user = await this.generateUsername(
          this.signupDetails.firstName,
          this.signupDetails.lastName
        );
      const signupDetails = {
        first_name: this.signupDetails.firstName,
        last_name: this.signupDetails.lastName,
        username: this.isDevMode ? this.signupDetails.username : user.username,
      };
      const roles = {};
      Object.entries(this.signupDetails.roles).forEach(([key, value]) => {
        if (value === true) {
          roles[key] = value;
        }
      });
      const isUsernameAvailable = await checkUserName(signupDetails.username);
      if (!isUsernameAvailable) {
        this.analytics.trackEvent(NEW_SIGNUP_FLOW.USERNAME_NOT_AVAILABLE);
        this.isLoading = false;
        this.isButtonDisabled = false;
        return (this.error = ERROR_MESSAGES.userName);
      }
      const res = this.isDevMode
        ? await newRegisterUser(signupDetails, roles)
        : await registerUser(signupDetails);
      if (res.status === 204) {
        this.analytics.identifyUser();
        this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_REGISTERED);
        this.currentStep = this.LAST_STEP;
      } else {
        this.analytics.trackEvent(NEW_SIGNUP_FLOW.UNABLE_TO_SIGNUP);
        this.error = ERROR_MESSAGES.others;
        this.isButtonDisabled = false;
      }
    } catch (error) {
      this.analytics.trackEvent(NEW_SIGNUP_FLOW.UNABLE_TO_REGISTER);
      console.log(error);
      this.error = error?.message || ERROR_MESSAGES.others;
      this.isButtonDisabled = false;
    } finally {
      this.isLoading = false;
    }
  }
}
