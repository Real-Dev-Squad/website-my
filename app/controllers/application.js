import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { LOGOUT_URL, MAIN_SITE_URL } from '../constants/url';
import { action } from '@ember/object';
import { GITHUB_URL } from '../constants/url';

export default class ApplicationController extends Controller {
  @service router;
  GITHUB_URL = GITHUB_URL;
  get canShowNavBar() {
    return this.router.currentRouteName != 'signup';
  }

  @action async signOutHandler() {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 200) {
        location.href = MAIN_SITE_URL;
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
}
