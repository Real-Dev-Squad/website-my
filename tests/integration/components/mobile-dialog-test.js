import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mobile-dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('Mobile-Dialog does not renders', async function (assert) {

    await render(hbs`<MobileDialog/>`); 

    assert.dom('.appDialog').doesNotExist()
  });
});
