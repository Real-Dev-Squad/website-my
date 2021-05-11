import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Unit | Component | self-clear-cache', (hooks) => {
  setupRenderingTest(hooks);

  test('should show last time user cleared the cache', async function (assert) {
    assert.expect(1);

    const time = '23 March 1:23 pm IST';
    this.set('lastTime', time);

    await render(hbs`<SelfClearCache @time={{this.lastTime}} />`);

    assert.dom('[data-test-last-time]').hasText(`Last Requested: ${time}`);
  });

  test('Clear cache button should get disabled on clicking it', async function (assert) {
    assert.expect(2);

    this.set('lastTime', '23 March 1:23 pm IST');

    await render(hbs`<SelfClearCache @time={{this.lastTime}} />`);

    const btn = assert.dom('[data-test-clear-cache-btn]');

    assert.equal(btn.hasAttribute('disabled'), false, 'Button is enabled');
    await click(btn);
    btn.hasAttribute('disabled');
  });

  skip('Show the total number times user has already cleared the cache that day', async function (assert) {
    assert.expect(1);

    this.set('lastTime', '23 March 1:23 pm IST');
    this.set('totalTimes', '3');

    await render(hbs`
    <SelfClearCache @time={{this.lastTime}} 
    @totalTimes={{this.totalTimes}} />`);

    assert.equal(
      assert
        .dom('[data-test-pending-requests]')
        .hasText('3 / 3 requests remaing for today'),
      true,
      'Text starts with 3 / 3'
    );
  });

  skip('Clear cache button should be disabled if user has already depleted the thresold upto which he can clear cache in a day', async function (assert) {
    assert.expect(2);

    this.set('lastTime', '23 March 1:23 pm IST');
    this.set('totalTimes', '3');

    await render(hbs`
    <SelfClearCache @time={{this.lastTime}} 
    @totalTimes={{this.totalTimes}} />`);

    assert.equal(
      assert.dom('[data-test-clear-cache-btn]').hasAttribute('disabled'),
      true,
      'Button is Disabled.'
    );
  });
});
