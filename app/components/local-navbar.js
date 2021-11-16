import Component from '@glimmer/component';
import { action } from '@ember/object';
import setTheme from '../helpers/setTheme';
import setCookie from '../helpers/setCookie';
import { SUN_URL, MOON_URL, THEME } from '../constants/theme';

export default class ExampleComponent extends Component {
  @action
  changeTheme(event) {
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
