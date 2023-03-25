import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { click, visit, settled } from '@ember/test-helpers';

module('Unit | Route | profile', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:profile');
    assert.ok(route);
  });

  test('test modal close on back button click', async (assert) => {
    await visit('/profile');

    assert.dom('[data-test-btn="edit"]').exists();
    click('[data-test-btn="edit"]');
    await settled();

    assert.dom('[data-test-modal="image-upload"]').exists();
    assert.dom('[data-test-btn="browse"]').exists();
  });
});
