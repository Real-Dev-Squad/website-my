import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | mixpanelAnalytics', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let service = this.owner.lookup('service:mixpanel-analytics');
    assert.ok(service);
  });

  test('it returns the event passed in trackEvent util', function (assert) {
    let service = this.owner.lookup('service:mixpanel-analytics');
    let eventNameResult = 'Test Testing';
    let eventName = service.trackEvent('Test Testing').event;
    assert.equal(eventNameResult, eventName);
  });
});
