import { helper } from '@ember/component/helper';
import { THEME } from '../constants/theme';

function setTheme(theme) {
  if (theme === THEME.LIGHT) {
    document.body.classList.remove('darkTheme');
    document.body.classList.add('lightTheme');
  } else {
    document.body.classList.remove('lightTheme');
    document.body.classList.add('darkTheme');
  }
}

export default helper(setTheme);
