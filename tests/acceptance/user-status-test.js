import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { click } from '@ember/test-helpers';

module('Acceptance | user status', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /user-status', async function(assert) {
    await visit('/user-status');

    assert
      .dom('[data-test-status]')
      .hasText('I am idle', 'The user sees the correct status.');

    assert
      .dom('[data-test-button-text]')
      .hasText(
        'Change status to ‘Doing a task’',
        'The user sees the correct button text.'
      );

    await click('[data-test-button]');

    assert
      .dom('[data-test-status]')
      .hasText('I am doing a task', 'The user sees the correct status.');

    assert
      .dom('[data-test-button-text]')
      .hasText(
        'Change status to ‘Idle’',
        'The user sees the correct button text.'
      );

    assert.equal(currentURL(), '/user-status');
  });
});
