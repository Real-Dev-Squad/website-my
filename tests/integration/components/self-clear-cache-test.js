import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { click, visit } from '@ember/test-helpers';

module('Unit | Controller | signup', function (hooks) {
  setupTest(hooks);

  test('Check For the last time user clears the cache', async (assert) => {
    let button = this.element.querySelector('.last-time');

    // QUnit
    assert.strictEqual(
      button.textContent.trim(),
      'Last time cached cleared at : '
    );

    // QUnit DOM
    assert.dom(button).hasText('Clear Cache');

    await visit('/clear-user-cache');
    await click('button.clear-cache');
  });
});
