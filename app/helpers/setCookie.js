import { helper } from '@ember/component/helper';

function setCookie(mode) {
  const domain = '.realdevsquad.com';
  const expire = new Date(Date.now() + 24 * 31 * 60 * 60 * 1000);
  const cookie = `mode=${mode}; domain=${domain}; expires=${expire} path=/`;
  document.cookie = cookie;

  if (mode == 'light') {
    document.body.classList.remove('darkTheme');
    document.body.classList.add('lightTheme');
  } else {
    document.body.classList.remove('lightTheme');
    document.body.classList.add('darkTheme');
  }
}

export default helper(setCookie);
