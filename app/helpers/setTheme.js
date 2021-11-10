import { helper } from '@ember/component/helper';
import setCookie from './setCookie';
import { SUN_URL, THEME } from '../constants/theme';

function setTheme() {
  const getCookies = document.cookie.split(';');
  let cookies = {};

  //storing cookie as key value pair in Object
  getCookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookies = { ...cookies, [key.trim()]: value };
  });

  if (!Object.prototype.hasOwnProperty.call(cookies, 'theme')) {
    setCookie.compute(THEME.LIGHT);
  } else {
    if (cookies.theme === THEME.DARK) {
      const img = document.getElementById('themeLogo');
      img.src = SUN_URL;
      setCookie.compute(THEME.DARK);
    } else {
      setCookie.compute(THEME.LIGHT);
    }
  }
}

export default helper(setTheme);
