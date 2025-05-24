import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/step1', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity step1 component', async function (assert) {
    this.set('setState', (val) => {
      assert.step(val);
    });

    await render(hbs`<Identity::Step1 @setState={{this.setState}} />`);

    assert.dom('[data-test-step1-heading]').exists();
    assert
      .dom('[data-test-step1-heading]')
      .hasText('Step 1: Chaincode Generation');

    assert.dom('[data-test-step1-desc]').exists();
    assert.dom('[data-test-step1-button]').exists();
  });
});
