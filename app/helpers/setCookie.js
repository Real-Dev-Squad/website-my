import { helper } from '@ember/component/helper';

function setCookie(mode) {
  const domain = '.realdevsquad.com';
  const expire = new Date(Date.now() + 24 * 31 * 60 * 60 * 1000);
  const cookie = `mode=${mode}; domain=${domain}; expires=${expire} path=/`;
  document.cookie = cookie;
}

export default helper(setCookie);
