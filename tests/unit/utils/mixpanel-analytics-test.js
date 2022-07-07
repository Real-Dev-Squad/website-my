import mixpanelAnalytics from 'website-my/utils/mixpanel-analytics';
import { module, test } from 'qunit';

module('Unit | Utility | mixpanel-analytics', function () {
  test('it returns the event passed in trackEvent util', function (assert) {
    let eventNameResult = 'Test Testing';
    let eventName = mixpanelAnalytics().trackEvent('Test Testing').event;
    assert.equal(eventNameResult, eventName);
  });
});
