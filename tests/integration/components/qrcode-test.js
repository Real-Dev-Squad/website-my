import { module, test } from 'qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | qr-code', function (hooks) {
  setupRenderingTest(hooks);

  test('QR code component and text render on mobile route', async function (assert) {
    this.set('userId', '12345');
    await render(hbs`
     <Qrcode @text = {{this.userId}} />
    `);
    assert.dom('[data-test="qr-code"]').exists();
  });

  test('QR code component and text does not render on mobile route', async function (assert) {
    await render(hbs`
     <Qrcode />
    `);
    assert.dom('[data-test="qr-code"]').doesNotExist();
  });

  test('buttonClicked confirms and performs API call when confirmed', async function (assert) {
    await render(hbs`
      <MobileController />
    `);
    window.confirm = () => true;

    await click(find('.btn'));

    assert.ok(
      window.confirm.calledWith(
        'Are you sure you are the one who scanned this QR code? Do you want to proceed?'
      )
    );
  });

  test('buttonClicked cancels login when not confirmed', async function (assert) {
    await render(hbs`
      <MobileController />
    `);

    window.confirm = () => false;

    await click(find('.btn'));
    assert.ok(
      window.confirm.calledWith(
        'Are you sure you are the one who scanned this QR code? Do you want to proceed?'
      )
    );
  });
});
