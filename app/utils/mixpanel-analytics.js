import ENV from 'website-my/config/environment';
import mixpanel from 'mixpanel-browser';

export default function mixpanelAnalytics() {
  mixpanel.init(ENV.MIXPANEL_TOKEN);

  const trackEvent = (event) => {
    return mixpanel.track(event);
  };

  const identifyUser = () => {
    return mixpanel.identify();
  };

  return { trackEvent, identifyUser };
}
