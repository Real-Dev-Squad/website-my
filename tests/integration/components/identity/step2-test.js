import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { Server } from 'ember-cli-mirage';
import ENV from 'website-my/config/environment';

module('Integration | Component | identity/step2', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity step2 component without next button', async function (assert) {
    this.set('setState', (val) => {
      assert.step(val);
    });

    await render(
      hbs`<Identity::Step2 @setState={{this.setState}} @profileURL="" />`
    );

    assert.dom('[data-test-step2-heading]').exists();
    assert
      .dom('[data-test-step2-heading]')
      .hasText('Step 2: Profile Service URL');

    assert.dom('[data-test-step2-desc]').exists();
    assert.dom('[data-test-step2-input]').exists().hasNoText();
    assert.dom('[data-test-step2-next-button]').doesNotExist();
  });

  test('it renders the identity step2 component without next button', async function (assert) {
    let server = new Server({
      models: {},
      routes() {
        this.namespace = ENV.BASE_API_URL;

        this.patch('/users/profileURL', {});
      },
    });

    this.set('setState', (val) => {
      assert.step(val);
    });

    await render(
      hbs`<Identity::Step2 @setState={{this.setState}} @profileURL="https://test.com" />`
    );

    assert.dom('[data-test-step2-heading]').exists();
    assert
      .dom('[data-test-step2-heading]')
      .hasText('Step 2: Profile Service URL');

    assert.dom('[data-test-step2-input]').exists().hasNoText();
    assert.dom('[data-test-step2-input]').exists().hasNoText();
    assert.dom('[data-test-step2-next-button]').exists();

    await click('[data-test-step2-next-button]');

    assert.verifySteps(['step3']);

    server.shutdown();
  });
});
