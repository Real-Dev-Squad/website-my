import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { MAIN_SITE_URL } from '../constants/url';
import { action } from '@ember/object';
import { GITHUB_URL } from '../constants/url';
import ENV from 'website-my/config/environment';
import { checkDeviceType } from '../utils/checkDeviceType';

export default class ApplicationController extends Controller {
  @service router;
  @service rdsdialogState;

  GITHUB_URL = GITHUB_URL;
  BASE_API_URL = ENV.BASE_API_URL;
  get canShowNavBar() {
    return this.router.currentRouteName != 'signup';
  }

  constructor() {
    super(...arguments);
    this.rdsdialogState.updateData(checkDeviceType());
  }

  @action async signOutHandler() {
    try {
      const response = await fetch(`${this.BASE_API_URL}/auth/signout`, {
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
