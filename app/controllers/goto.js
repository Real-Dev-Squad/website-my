import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { MAIN_SITE_PREFIX, REDIRECT_URLS } from '../constants/url';
import { REDIRECTION_TIME } from '../constants/redirection-time';
export default class GotoController extends Controller {
  @service router;
  queryParams = ['from', 'token'];

  @action
  redirectToAppropriatePage() {
    let redirectUrl = REDIRECT_URLS[this.from];
    if (this.token) {
      redirectUrl = `${redirectUrl}?token=${this.token}`;
    }
    setTimeout(() => {
      window.location.href = redirectUrl ?? MAIN_SITE_PREFIX;
    }, REDIRECTION_TIME);
  }
}
