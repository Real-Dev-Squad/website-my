import Component from '@glimmer/component';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { tracked } from '@glimmer/tracking';

export default class MobileDialogComponent extends Component {
  @tracked isDialogVisible = true;

  @action
  closeDialog() {
    this.isDialogVisible = false;
  }

  @action
  openRDSApp() {
    this.openApp();
  }

  openApp() {
    let isAppInstalled = false;
    const appScheme = ENV.RDS_ANDROID_SCHEME;
    const fallbackURL = ENV.ANDROID_GITHUB_URL;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const MAXTIME = 1000;

    if (/android/i.test(userAgent)) {
      const startTime = Date.now();
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appScheme;
      document.body.appendChild(iframe);
      this.isDialogVisible = false;

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
        this.isDialogVisible = false;
      }, 1000);
    }
  }
}
