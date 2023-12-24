import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/reload', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity reload component', async function (assert) {
    await render(hbs`<Identity::Reload />`);

    assert.dom('[data-test-reload-heading]').exists();
    assert.dom('[data-test-reload-heading]').hasText('Status Pending');

    assert.dom('[data-test-reload-desc]').exists();
  });
});
