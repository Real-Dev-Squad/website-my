import { helper } from '@ember/component/helper';

function setCookie(mode) {
  const domain = '.realdevsquad.com';
  const cookieExpiryDate = new Date(Date.now() + 24 * 31 * 60 * 60 * 1000);
  const cookie = `theme=${mode}; domain=${domain}; expires=${cookieExpiryDate} path=/`;
  document.cookie = cookie;

  if (mode === 'light') {
    document.body.classList.remove('darkTheme');
    document.body.classList.add('lightTheme');
  } else {
    document.body.classList.remove('lightTheme');
    document.body.classList.add('darkTheme');
  }
}

export default helper(setCookie);
