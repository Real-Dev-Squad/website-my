import { helper } from '@ember/component/helper';
import setTheme from './setTheme';
import setCookie from './setCookie';
import { SUN_URL, THEME } from '../constants/theme';

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
    setCookie.compute(THEME.LIGHT);
  } else {
    if (cookies.theme === THEME.DARK) {
      setTheme.compute(THEME.DARK);
      const img = document.getElementById('themeLogo');
      img.src = SUN_URL;
    } else {
      setTheme.compute(THEME.LIGHT);
    }
  }
}

export default helper(initialTheme);
