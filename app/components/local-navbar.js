import Component from '@glimmer/component';
import { action } from '@ember/object';
import setCookie from '../helpers/setCookie';

export default class ExampleComponent extends Component {
  @action
  changeTheme(event) {
    const sunURL = 'assets/sun.png';
    const moonURL = 'assets/moon.png';

    if (event.target.src === 'https://dev.realdevsquad.com/assets/moon.png') {
      setCookie.compute('dark');
      event.target.src = sunURL;
      document.body.classList.remove('lightTheme');
      document.body.classList.add('darkTheme');
    } else {
      setCookie.compute('light');
      event.target.src = moonURL;
      document.body.classList.add('lightTheme');
      document.body.classList.remove('darkTheme');
    }
  }
}
