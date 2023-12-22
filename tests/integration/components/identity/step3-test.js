import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/step3', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity step3 component', async function (assert) {
    await render(hbs`<Identity::Step3 @setState={{this.setState}}/>`);

    assert.dom('[data-test-step3-heading]').exists();
    assert
      .dom('[data-test-step3-heading]')
      .hasText('Step 3: Link Profile Service');

    assert.dom('[data-test-step3-desc]').exists();
  });
});
