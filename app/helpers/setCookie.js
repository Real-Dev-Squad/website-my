import { helper } from '@ember/component/helper';

function setCookie(theme) {
  const domain = '.realdevsquad.com';
  const cookieExpiryDate = new Date(Date.now() + 24 * 31 * 60 * 60 * 1000);
  const cookie = `theme=${theme}; domain=${domain}; expires=${cookieExpiryDate} path=/`;
  document.cookie = cookie;
}

export default helper(setCookie);
