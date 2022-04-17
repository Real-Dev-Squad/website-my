import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @tracked isNavOpen = false;

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

  @action toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
