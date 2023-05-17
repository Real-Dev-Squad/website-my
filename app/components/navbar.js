import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  RDS_CRYPTO_URL,
  RDS_EVENTS_URL,
  RDS_MAIN_URL,
  RDS_MEMBERS_URL,
  RDS_STATUS_URL,
  RDS_WELCOME_URL,
} from '../constants/url';

export default class NavbarComponent extends Component {
  @tracked isNavOpen = false;
  @tracked isMenuOpen = false;
  @service router;

  HOME_PAGE_URL = RDS_MAIN_URL;

  RDS_APPS_MAPPING = [
    {
      siteName: 'Welcome',
      url: RDS_WELCOME_URL,
    },
    {
      siteName: 'Events',
      url: RDS_EVENTS_URL,
    },
    {
      siteName: 'Members',
      url: RDS_MEMBERS_URL,
    },
    {
      siteName: 'Crypto',
      url: RDS_CRYPTO_URL,
    },
    {
      siteName: 'Status',
      url: RDS_STATUS_URL,
    },
  ];

  @action toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  @action toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action outsideClickMenu() {
    this.isMenuOpen = false;
  }

  get isDev() {
    if (this.router.currentRoute) {
      return this.router.currentRoute.queryParams.dev;
    }
    return false;
  }
}
