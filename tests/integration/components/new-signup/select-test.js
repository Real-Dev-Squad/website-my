import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// handler functions are creating some problems need to fix em
module('Integration | Component | new-sign-up/form', function (hooks) {
  setupRenderingTest(hooks);

  test('it has a select your role label when current step is role', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
    });

    await render(hbs`
      <NewSignup::Select
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-signup-form-label]').hasText('Select your role');
  });

  test('button should have text Submit if the current step is role', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
    });

    await render(hbs`
      <NewSignup::Select
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-btn="signup"]').exists();
    assert.dom('[data-test-btn="signup"]').hasText('Submit');
  });

  test('It should have select field', async function (assert) {
    assert.expect(3);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
    });

    await render(hbs`
      <NewSignup::Select
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-signup-form-select]').exists();
    assert
      .dom('[data-test-signup-form-select]')
      .hasAttribute('name', 'role')
      .hasAttribute('id', 'role');
  });
});
