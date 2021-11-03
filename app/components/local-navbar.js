import Component from '@glimmer/component';
import { action } from '@ember/object';
import setCookie from '../helpers/setCookie';

export default class ExampleComponent extends Component {
  @action
  changeTheme(event) {
    if (event.target.src === 'https://dev.realdevsquad.com/assets/moon.png') {
      event.target.src = 'assets/sun.png';
      setCookie.compute('dark');
    } else {
      event.target.src = 'assets/moon.png';
      setCookie.compute('light');
    }
  }
}
