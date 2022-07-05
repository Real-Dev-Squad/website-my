import mixpanelAnalytics from 'website-my/utils/mixpanel-analytics';
import { module, test } from 'qunit';

module('Unit | Utility | mixpanel-analytics', function () {
  test('should return the event passed in trackEvent util', function (assert) {
    let result = 'Test Testing';
    let input = mixpanelAnalytics().trackEvent('Test Testing').event;
    assert.equal(input, result);
  });
});
