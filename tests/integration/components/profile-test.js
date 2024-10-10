import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | profile-component', function (hooks) {
  setupRenderingTest(hooks);

  test('button appearance based on isDev property', async function (assert) {
    this.set('handleShowEditProfilePictureModal', () => {
      this.set('showEditProfilePictureModal', true);
    });

    this.set('isDev', true);

    await render(hbs`
      {{#if this.isDev}}
        <Button @onClick={{this.handleShowEditProfilePictureModal}}
         @class='profile-edit-button '
         @data-test-btn='edit'>
          <FaIcon @icon="edit" />
        </Button>
      {{else}}
        <Button @onClick={{this.handleShowEditProfilePictureModal}}
         @class='edit-btn btn'
         @data-test-btn='edit'>
          Update Picture
        </Button>
      {{/if}}
    `);

    assert.dom('[data-test-btn="edit"]').exists();
    assert.dom('[data-test-btn="edit"]').hasClass('profile-edit-button');

    await click('[data-test-btn="edit"]');

    assert.ok(
      this.showEditProfilePictureModal,
      'Modal should be shown after clicking the button'
    );

    this.set('isDev', false);

    await settled();

    assert.dom('[data-test-btn="edit"]').exists();
    assert.dom('[data-test-btn="edit"]').hasClass('edit-btn');
    assert.dom('[data-test-btn="edit"]').hasText('Update Picture');

    await click('[data-test-btn="edit"]');

    assert.ok(
      this.showEditProfilePictureModal,
      'Modal should be shown after clicking the button'
    );
  });
});
