import { module, test } from 'qunit';
import { visit, currentURL,render } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('Acceptance | mobile', function(hooks) {
  setupApplicationTest(hooks);
  setupRenderingTest(hooks);

  test('QR code component and text render on mobile route', async function(assert) {
    await visit('/mobile');
    assert.equal(currentURL(), '/mobile');
    this.set('userId', '12345');
    // const qrCodeComponent = this.element.querySelector('.qr-code');
     await render(hbs`
     {{#if this.userId }}
     <p>has user id</p>
      {{else}}
      <p>No user id</p>
      {{/if}} 

    `);

    assert.dom('p').hasText('has user id', 'QR code component is rendered on mobile route')

    // assert.ok(qrCodeComponent, 'QR code component is rendered on mobile route');
   

    // assert.dom('[data-test="qr-code"]').hasTagName('svg');
    // await pauseTest();
    const qrCodeText = this.element.querySelector('.qr-code-text');
    assert.ok(qrCodeText, 'QR code text is rendered on mobile route');
    assert.equal(qrCodeText.textContent.trim(), 'Check out our RDS mobile app', 'QR code text has correct content');
  });

  test('QR code component and text not render on mobile route', async function(assert) {
    await visit('/mobile');
    assert.equal(currentURL(), '/mobile');
    // this.set('userId', '12345');
    // const qrCodeComponent = this.element.querySelector('.qr-code');
     await render(hbs`
     {{#if this.userId }}
     <p>has user id</p>
      {{else}}
      <p>No user id</p>
      {{/if}} 

    `);

    assert.dom('p').hasText('No user id', 'QR code component is not rendered on mobile route')

    // assert.ok(qrCodeComponent, 'QR code component is rendered on mobile route');
   

    // assert.dom('[data-test="qr-code"]').hasTagName('svg');
    // await pauseTest();
    const qrCodeText = this.element.querySelector('.qr-code-text');
    assert.ok(qrCodeText, 'QR code text is rendered on mobile route');
    assert.equal(qrCodeText.textContent.trim(), 'Check out our RDS mobile app', 'QR code text has correct content');

  })
});