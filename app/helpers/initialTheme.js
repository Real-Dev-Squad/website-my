import { helper } from '@ember/component/helper';
import setTheme from './setTheme';
import setCookie from './setCookie';
import { THEME } from '../constants/theme';

function initialTheme() {
  const getCookies = document.cookie.split(';');
  let cookies = {};

  //storing cookie as key value pair in Object
  //eg. cookies = { rds-session: asdfjkl }
  getCookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookies = { ...cookies, [key.trim()]: value };
  });

  if (!Object.prototype.hasOwnProperty.call(cookies, 'theme')) {
    setCookie.compute('theme', THEME.LIGHT, 30);
  } else {
    if (cookies.theme === THEME.DARK) {
      setTheme.compute(THEME.DARK);
    } else {
      setTheme.compute(THEME.LIGHT);
    }
  }
}

export default helper(initialTheme);
