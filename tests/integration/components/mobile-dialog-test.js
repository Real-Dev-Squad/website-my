import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mobile-dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('Mobile-Dialog does not renders', async function (assert) {
    this.setProperties({
      isDevEnv: false,
      isMobileDevice: false,
    });
    await render(hbs`<MobileDialog @dev={{this.dev}}/>`);

    assert.dom('[data-test-mobile-dialog]').doesNotExist();
  });

  test('Mobile-Dialog should renders', async function (assert) {
    this.setProperties({
      isDevEnv: true,
      isMobileDevice: true,
    });

    await render(
      hbs`<MobileDialog @isDevEnv={{this.isDevEnv}} @isMobileDevice={{this.isMobileDevice}}  />`
    );

    assert.dom('[data-test-mobile-dialog]').exists();
  });
});
