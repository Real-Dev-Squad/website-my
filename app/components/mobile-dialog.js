import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MobileDialogComponent extends Component {
  @tracked toShow = this.checkDeviceType();

  @action
  closeDialog() {
    this.toShow = false;
  }

  @action
  openRDSApp() {
    this.openApp();
  }

  checkDeviceType() {
    let regexp = /android|iphone|kindle|ipad/i;
    let details = navigator.userAgent;
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      return true;
    } else {
      return false;
    }
  }

  openApp() {
    var flag = false;
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
          flag = true;
        }
      });

      setTimeout(function () {
        if (!flag) {
          document.body.removeChild(iframe);
          window.location.href = fallbackURL;
        }
        this.toShow = false;
      }, 1000);
    }
  }
}
