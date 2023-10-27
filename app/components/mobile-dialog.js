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
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  };

  openApp() {
    var flag = false;
    var appScheme = 'app://realdevsquad.com';
    var fallbackURL =
      'https://play.google.com/store/apps/details?id=com.github.android'; // For demo. It will replace with app playstore url
  
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      var startTime = Date.now();
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appScheme;
      document.body.appendChild(iframe);
      this.toShow = false;

      window.addEventListener('blur', function () {
        document.body.removeChild(iframe);
        
        var timeTaken = Date.now() - startTime;
        if (timeTaken <= 1000) {
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
    } else {
      // If the user is not on an Android device, provide a fallback action
    }
  };
}
