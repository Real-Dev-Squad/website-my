import { helper } from '@ember/component/helper';
import setCookie from './setCookie';

function setTheme() {
  const allCookies = document.cookie.split(';');
  let obj = {};
  for (let cookie of allCookies) {
    const [key, value] = cookie.split('=');
    obj = { ...obj, [key.trim()]: value };
  }

  if (!Object.prototype.hasOwnProperty.call(obj, 'theme')) {
    setCookie.compute('light');
  } else {
    if (obj.theme === 'dark') {
      const img = document.getElementById('themeLogo');
      img.src = 'assets/sun.png';
      setCookie.compute('dark');
    } else {
      setCookie.compute('light');
    }
  }
}

export default helper(setTheme);
