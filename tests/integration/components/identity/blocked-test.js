import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/blocked', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity blocked component', async function (assert) {
    this.set('setState', (val) => {
      assert.step(val);
    });

    await render(hbs`<Identity::Blocked @setState={{this.setState}}/>`);

    assert.dom('[data-test-blocked-heading]').exists();
    assert.dom('[data-test-blocked-heading]').hasText('Status Blocked');

    assert.dom('[data-test-blocked-desc]').exists();

    await click('[data-test-blocked-button]');

    assert.verifySteps(['step1']);
  });
});
