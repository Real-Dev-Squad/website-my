import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  HOME_PAGE_URL = 'http://realdevsquad.com/';
  WELCOME_SITE_URL = 'https://welcome.realdevsquad.com/';
  EVENTS_SITE_URL = 'http://realdevsquad.com/events.html';
  MEMBERS_SITE_URL = 'https://members.realdevsquad.com/';
  CRYPTO_SITE_URL = 'https://crypto.realdevsquad.com/';
  STATUS_SITE_URL = 'https://status.realdevsquad.com/';

  @tracked isOpen = true;

  @action toggleNav() {
    this.isOpen = !this.isOpen;
  }
}
