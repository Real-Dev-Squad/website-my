import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mobile-dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('Mobile-Dialog does not renders', async function (assert) {
    this.setProperties({
      dev: false,
    });
    await render(hbs`
    <MobileDialog
    @dev={{this.dev}}  
    />`);

    assert.dom('.mobile-dialog__dialog').doesNotExist();
  });
});
