import { helper } from '@ember/component/helper';

function setCookie(name, value, days = 30) {
  const domain = '.realdevsquad.com';
  const cookieExpiryDate = new Date(days + 31 * 24 * 60 * 60 * 1000);
  const cookie = `${name}=${value}; domain=${domain}; expires=${cookieExpiryDate} path=/`;
  document.cookie = cookie;
}

export default helper(setCookie);
