/* eslint-disable ember/no-pause-test */
/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal-location', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    
    await render(hbs`<ModalLocation />`);

   

    assert.dom('.update__link').exists();
    assert.dom('.update__link').hasText('update location');


   
  });
});
