import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const LOGOUT_URL = 'https://api.realdevsquad.com/auth/signout';
export default class NavbarComponent extends Component {
  @tracked isNavOpen = false;
  @tracked isMenuOpen = false;
  @service router;

  HOME_PAGE_URL = 'http://realdevsquad.com/';

  RDS_APPS_MAPPING = [
    {
      siteName: 'Welcome',
      url: 'https://welcome.realdevsquad.com/',
    },
    {
      siteName: 'Events',
      url: 'http://realdevsquad.com/events.html',
    },
    {
      siteName: 'Members',
      url: 'https://members.realdevsquad.com/',
    },
    {
      siteName: 'Crypto',
      url: 'https://crypto.realdevsquad.com/',
    },
    {
      siteName: 'Status',
      url: 'https://status.realdevsquad.com/',
    },
  ];

  @action async logoutHandler() {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.status === 200) {
        location.reload();
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

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
