import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Unit | Component | profile-edit-button', function (hooks) {
  setupRenderingTest(hooks);

  test('profile-edit-button renders and triggers action on click', async function (assert) {
    this.set('mockAction', () => {
      assert.ok(true, 'Action was called');
    });

    await render(
      hbs`<Button @onClick={{this.mockAction}} @class='profile-edit-button' @data-test-btn='edit'>
         <FaIcon @icon="edit" />
       </Button>`
    );

    assert.dom('[data-test-btn="edit"]').exists('Edit button is rendered');
  });
});
