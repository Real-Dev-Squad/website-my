import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { Server } from 'ember-cli-mirage';
import ENV from 'website-my/config/environment';

module('Integration | Component | identity/step3', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the identity step3 component', async function (assert) {
    let stub = sinon.stub(window, 'confirm');
    stub.returns(true);

    this.set('setState', (val) => {
      assert.step(val);
    });

    let server = new Server({
      models: {},
      routes() {
        this.namespace = ENV.BASE_API_URL;

        this.post('/users/verify', {});
      },
    });

    await render(hbs`<Identity::Step3 @setState={{this.setState}}/>`);

    assert.dom('[data-test-step3-heading]').exists();
    assert
      .dom('[data-test-step3-heading]')
      .hasText('Step 3: Link Profile Service');

    assert.dom('[data-test-step3-desc]').exists();

    await click('[data-test-step3-button]');

    stub.restore();
    server.shutdown();
  });
});
