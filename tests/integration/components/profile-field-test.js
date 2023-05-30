import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | profile-field', function (hooks) {
  setupRenderingTest(hooks);

  test('profile field renders', async function (assert) {
    this.setProperties({
      label: 'First Name*',
      icon_url: 'icons/user.svg',
    });

    await render(hbs`
      <ProfileField 
        @label={{this.label}} 
        @icon_url={{this.icon_url}}
      />
    `);

    assert.dom('[data-test-profile-field-label]').hasText(this.label);
    assert
      .dom('[data-test-profile-field-icon]')
      .exists()
      .hasAttribute('src', this.icon_url);
    assert.dom('[data-test-profile-field-input]').exists();
    assert.dom('[data-test-profile-field-error]').exists();
  });

  test('profile field error state', async function (assert) {
    this.setProperties({
      showError: true,
      errorMessage: 'This field is required',
    });

    await render(hbs`
      <ProfileField 
        @showError={{this.showError}} 
        @errorMessage={{this.errorMessage}}
      />
    `);

    assert.dom('[data-test-profile-field]').hasClass('profile-field-error');
    assert.dom('[data-test-profile-field-error]').hasText(this.errorMessage);
  });
});
