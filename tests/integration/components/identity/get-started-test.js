import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/get-started', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity get-started component', async function (assert) {
    this.set('setState', (val) => {
      assert.step(val);
    });

    await render(hbs`<Identity::GetStarted @setState={{this.setState}}/>`);

    assert.dom('[data-test-getStarted-heading]').exists();
    assert
      .dom('[data-test-getStarted-heading]')
      .hasText('Qualification Criteria');

    assert.dom('[data-test-getStarted-desc]').exists();

    await click('[data-test-getStarted-button]');

    assert.verifySteps(['step1']);
  });
});
