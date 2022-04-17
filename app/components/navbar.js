import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import setTheme from '../helpers/setTheme';
import setCookie from '../helpers/setCookie';
import { SUN_URL, MOON_URL, THEME } from '../constants/theme';

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

  @action
  changeTheme(event) {
    console.log(event.target.src);
    if (event.target.src.includes(MOON_URL)) {
      event.target.src = SUN_URL;
      setTheme.compute(THEME.DARK);
      setCookie.compute(THEME.DARK);
    } else {
      event.target.src = MOON_URL;
      setTheme.compute(THEME.LIGHT);
      setCookie.compute(THEME.LIGHT);
    }
  }
}
