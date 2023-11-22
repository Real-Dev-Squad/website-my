import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { MAIN_SITE_URL } from '../constants/url';
import { action } from '@ember/object';
import { GITHUB_URL } from '../constants/url';
import ENV from 'website-my/config/environment';

export default class ApplicationController extends Controller {
  @service router;
  @service featureFlag;
  @service toast;
  @tracked toVisible = this.checkDeviceType();

  GITHUB_URL = GITHUB_URL;
  BASE_API_URL = ENV.BASE_API_URL;
  get canShowNavBar() {
    return this.router.currentRouteName != 'signup';
  }

  get isDevMode() {
    return this.featureFlag.isDevMode;
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
      this.toast.error(
        'Unable to sign out. Something went wrong. Please try again.'
      );
    }
  }

  checkDeviceType() {
    let regexp = /android|iphone|kindle|ipad/i;
    let details = navigator.userAgent;
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      return true;
    } else {
      return false;
    }
  }
}
