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
      document.body.classList.remove('lightTheme');
      document.body.classList.add('darkTheme');
    } else {
      document.body.classList.remove('darkTheme');
      document.body.classList.add('lightTheme');
    }
  }
}

export default helper(setTheme);
