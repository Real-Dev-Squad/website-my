import Component from '@glimmer/component';
import { action } from '@ember/object';
import setCookie from '../helpers/setCookie';

export default class ExampleComponent extends Component {
  @action
  changeTheme(event) {
    const sunURL = 'assets/sun.png';
    const moonURL = 'assets/moon.png';

    if (event.target.src === 'https://dev.realdevsquad.com/assets/moon.png') {
      event.target.src = sunURL;
      setCookie.compute('dark');
    } else {
      event.target.src = moonURL;
      setCookie.compute('light');
    }
  }
}
