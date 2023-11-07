import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MobileDialogComponent extends Component {
  @tracked toShow = true;

  @action
  closeDialog() {
    this.toShow = false;
  }

  @action
  openRDSApp() {
    this.openApp();
  }

  openApp() {
    let isAppInstalled = false;
    const appScheme = 'app://realdevsquad.com';
    const fallbackURL =
      'https://play.google.com/store/apps/details?id=com.github.android';
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const MAXTIME = 1000;

    if (/android/i.test(userAgent)) {
      const startTime = Date.now();
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appScheme;
      document.body.appendChild(iframe);
      this.toShow = false;

      window.addEventListener('blur', function () {
        document.body.removeChild(iframe);

        const timeTaken = Date.now() - startTime;
        if (timeTaken <= MAXTIME) {
          isAppInstalled = true;
        }
      });

      setTimeout(function () {
        if (!isAppInstalled) {
          document.body.removeChild(iframe);
          window.location.href = fallbackURL;
        }
        this.toShow = false;
      }, 1000);
    }
  }
}
