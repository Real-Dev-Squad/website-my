import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// Lets say we have component with name 'self-clear-cache.hbs'
// The UI Design can be found here : https://www.figma.com/file/LMujWCqnzXl1wQJVwAzCPV/Clear-your-member-details-page?node-id=0%3A1
// It shows the time at which user clears the cache last time.
// Last Requested : {{ time }}

module('Cache Clear Page', (hooks) => {
  setupRenderingTest(hooks);

  test('should show last time user cleared the cache', async function (assert) {
    assert.expect(1);

    // set the outer context '23 March 1:23 pm IST'
    this.set('lastTime', '23 March 1:23 pm IST');

    await render(hbs`<SelfClearCache @time={{this.lastTime}} />`);

    assert.equal(
      this.element.querySelector('.last-time').textContent,
      'Last Requested : 23 March 1:23 pm IST',
      'Last time it was request at 23 March 1:23 pm IST'
    );
  });

  // Clear cache button should get disabled on clicking it
  test('On Clicking Clear Cache button time should get updated', async function (assert) {
    assert.expect(2);

    // set the outer context '23 March 1:23 pm IST'
    this.set('lastTime', '23 March 1:23 pm IST');

    await render(hbs`<SelfClearCache @time={{this.lastTime}} />`);

    assert.equal(
      this.element.querySelector('.clear-cache-btn').disabled,
      true,
      'Button is enabled right now'
    );

    await click('.clear-cache-btn');

    assert.equal(
      this.element.querySelector('.clear-cache-btn').disabled,
      true,
      'Button got disabled post clicking'
    );
  });

  // Below button should show the total number times user has
  // already cleared the cache that day
  test('On Clicking Clear Cache button time should get updated', async function (assert) {
    assert.expect(1);

    //pending-requests
    // set the outer context '23 March 1:23 pm IST'
    this.set('lastTime', '23 March 1:23 pm IST');
    this.set('totalTimes', '3');

    await render(hbs`
    <SelfClearCache @time={{this.lastTime}} 
    @totalTimes={{this.totalTimes}} />`);

    assert.equal(
      this.element.querySelector('.pending-requests').textContent,
      '3 / 3 requests remaing for today',
      'Text starts with 3 / 3'
    );
  });

  // Clear cache button should be disabled if all user has already
  // cleared cache 3 times
  test('On Clicking Clear Cache button time should get updated', async function (assert) {
    assert.expect(2);

    //pending-requests
    // set the outer context '23 March 1:23 pm IST'
    this.set('lastTime', '23 March 1:23 pm IST');
    this.set('totalTimes', '3');

    await render(hbs`
    <SelfClearCache @time={{this.lastTime}} 
    @totalTimes={{this.totalTimes}} />`);

    assert.equal(
      this.element.querySelector('.clear-cache-btn').disabled,
      true,
      'Button is Disabled.'
    );
  });
});
