import { helper } from '@ember/component/helper';
import setCookie from './setCookie';

function setTheme() {
  const allCookies = document.cookie.split(';');
  let obj = {};
  for (let cookie of allCookies) {
    const [key, value] = cookie.split('=');
    obj = { ...obj, [key.trim()]: value };
  }
  if (!Object.prototype.hasOwnProperty.call(obj, 'mode')) {
    setCookie.compute('light');
  } else {
    if (obj.mode === 'dark') {
      const img = document.getElementById('themeLogo');
      img.src = 'assets/sun.png';
      setCookie.compute('dark');
    } else {
      setCookie.compute('light');
    }
  }
}

export default helper(setTheme);
