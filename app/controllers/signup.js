import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import registerUser from '../utils/register-api';

export default class SignupController extends Controller {
  queryParams = ['what'];

  @tracked isSubmitClicked = false;

  @tracked what = null;
  @tracked firstName = '';
  @tracked lastName = '';
  @tracked userName = '';
  @tracked errorMessage;

  @action changeRouteParams(paramValue) {
    if (paramValue)
      this.transitionToRoute({ queryParams: { what: paramValue } });
  }

  @action registerUser() {
    const user = {
      first_name: this.firstName,
      last_name: this.lastName,
      username: this.userName,
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
