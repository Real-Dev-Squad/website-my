import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | signup flow', function(hooks) {
  setupApplicationTest(hooks);

  test('http://localhost:4200/signup', async function(assert) {
    await visit('/signup');

    assert.equal(currentURL(), '/signup');
  });
});
