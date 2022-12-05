/* eslint-disable ember/no-pause-test */
/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal-location', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ModalLocation />`);

    assert.dom('.update__link').exists();
    assert.dom('.update__link').hasText('update location');
  });

  test('should open modal', async function (assert) {
    assert.expect(2);

    await render(hbs`<ModalLocation/>`);

    assert.dom('[data-test-update-link]').exists();
    assert.dom('[data-test-update-link]').hasText('update location');

    // Click on the button
    await click('.update__link');
  });

  test('modal opened', async function (assert) {
    await render(hbs`<ModalLocation/>`);

    await click('.update__link');

    const STRING_TYPE = 'string';
    const STRING_INPUT = 'Pune';

    this.set('STRING_TYPE', STRING_TYPE);

    this.set('onChange', (inputValue) => {
      this.set('inputValue', inputValue);
    });

    // Act

    await fillIn('[data-test-input-location]', STRING_INPUT);

    await fillIn('[data-test-update_location]', ['travelling'], true);

    await fillIn('[data-test-send-notification]', ['Developers'], true);

    // await this.pauseTest();

    assert.dom('[data-test-submit-btn]').exists();

    assert.dom('[data-test-submit-btn]').hasAttribute('type', 'submit');

    await click('[data-test-submit-btn]');

    assert.verifySteps([]);
  });

  test('cross mark icon closes icon', async function (assert) {
    await render(hbs`<ModalLocation/>`);

    await click('.update__link');

    assert.dom('[data-test-cross-icon]').exists();

    await click('[data-test-cross-icon]');
  });
});
