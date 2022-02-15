import ENV from 'website-my/config/environment';
import mixpanel from 'mixpanel-browser';

mixpanel.init(ENV.mixpanel, { debug: true });

const trackEvent = (event) => {
  mixpanel.track(event);
};

const identifyUser = () => {
  mixpanel.identify();
};

export default trackEvent && identifyUser;
