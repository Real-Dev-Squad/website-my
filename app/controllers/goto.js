import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { MAIN_SITE_PREFIX, REDIRECT_URLS } from '../constants/url';
import { REDIRECTION_TIME } from '../constants/redirection-time';
export default class GotoController extends Controller {
  @service router;
  queryParams = ['from'];

  @action
  redirectToAppropriatePage() {
    const source = this.from;
    console.log('this is from', source);
    if (source) {
      const redirectUrl = REDIRECT_URLS[source];
      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, REDIRECTION_TIME);
      }
    } else {
      setTimeout(() => {
        window.location.href = MAIN_SITE_PREFIX;
      }, REDIRECTION_TIME);
    }
  }
}
