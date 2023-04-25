import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | qr-code', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a QR code with the correct text and dark color', async function (assert) {
    this.set('userId', '12345');

    await render(hbs`
          <Qrcode
           @userId={{this.userId}}
          />    
    `);

    assert.dom('[data-test="qr-code"]').hasTagName('svg');
  });
});
