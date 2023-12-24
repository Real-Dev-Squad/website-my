import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/verified', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity verified component', async function (assert) {
    await render(hbs`<Identity::Verified />`);

    assert.dom('[data-test-verified-heading]').exists();
    assert.dom('[data-test-verified-heading]').hasText('Verified');

    assert.dom('[data-test-verified-desc]').exists();
  });
});
