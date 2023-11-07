import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mobile-dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('Mobile-Dialog does not renders', async function (assert) {
    this.setProperties({
      dev: false,
      deviceType: false,
    });
    await render(hbs`<MobileDialog @dev={{this.dev}}/>`);

    assert.dom('[data-test-mobile-dialog]').doesNotExist();
  });

  test('Mobile-Dialog should renders', async function (assert) {
    this.setProperties({
      dev: true,
      deviceType: true,
    });

    await render(
      hbs`<MobileDialog @dev={{this.dev}} @deviceType={{this.deviceType}}  />`
    );

    assert.dom('[data-test-mobile-dialog]').exists();
  });
});
