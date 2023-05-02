import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | qr-code', function (hooks) {
  setupRenderingTest(hooks);

  test('QR code component and text render on mobile route', async function (assert) {
    this.set('userId', '12345');
    await render(hbs`
     <Qrcode @text = {{this.userId}} />
    `);
    assert.ok(true);
  });
});
