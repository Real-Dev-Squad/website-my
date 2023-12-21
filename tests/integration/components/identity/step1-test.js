import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { Server } from 'ember-cli-mirage';
import ENV from 'website-my/config/environment';
import sinon from 'sinon';

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

  test('it generates the chaincode', async function (assert) {
    let stub = sinon.stub(window, 'confirm');
    stub.returns(true);

    let server = new Server({
      models: {},
      routes() {
        this.namespace = ENV.BASE_API_URL;

        this.get('/users/chaincode', { chaincode: 'abcdefghijklmnopqrs' });
      },
    });

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

    await click('[data-test-step1-button]');

    setTimeout(() => {
      this.resumeTest();
    }, 500);
    // eslint-disable-next-line ember/no-pause-test
    await this.pauseTest();

    assert
      .dom('[data-test-step1-chaincode]')
      .exists()
      .hasText('********************');

    await click('[data-test-step1-eye]');
    assert
      .dom('[data-test-step1-chaincode]')
      .exists()
      .hasText('abcdefghijklmnopqrs');

    await click('[data-test-step1-next-button]');

    assert.verifySteps(['step2']);
    stub.restore();
    server.shutdown();
  });
});
