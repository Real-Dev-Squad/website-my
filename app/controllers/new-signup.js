import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import registerUser from '../utils/register-api';

export default class SignupController extends Controller {
  queryParams = ['state', 'dev'];

  @tracked isSubmitClicked = false;
  @tracked isButtonDisabled = true;

  @tracked state = 'get-started';

  // stores the order in which the route transition will happen
  // based on the signup steps
  // get-started -> capture first name -> captur last name -> capture username
  @tracked routeParamsMap = new Map([
    ['get-started', 'firstName'],
    ['firstName', 'lastName'],
    ['lastName', 'username'],
    ['username', ''],
  ]);

  @tracked dev = false;
  @tracked userDetails = {
    firstName: '',
    lastName: '',
    username: '',
  };
  @tracked errorMessage;

  @action changeRouteParams(paramValue) {
    this.isButtonDisabled = true;
    if (paramValue > '')
      this.transitionToRoute({ queryParams: { state: paramValue } });
    else this.signup();
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
