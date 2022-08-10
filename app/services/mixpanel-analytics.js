import Service from '@ember/service';
import ENV from 'website-my/config/environment';
import mixpanel from 'mixpanel-browser';

mixpanel.init(ENV.MIXPANEL_TOKEN);

export default class MixpanelAnalyticsService extends Service {
  trackEvent(event) {
    return mixpanel.track(event);
  }

  identifyUser() {
    return mixpanel.identify();
  }
}
