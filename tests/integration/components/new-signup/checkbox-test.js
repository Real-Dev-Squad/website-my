import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// handler functions are creating some problems need to fix em
module('Integration | Component | new-sign-up/form', function (hooks) {
  setupRenderingTest(hooks);

  test('it has a select your role label when current step is role(currently behind dev flag)', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
      dev: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
      />`);

    assert.dom('[data-test-signup-form-label]').hasText('Select your role');
  });

  test('button should have text Submit if the current step is role(currently behind dev flag)', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
      dev: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
      />`);

    assert.dom('[data-test-btn="signup"]').exists();
    assert.dom('[data-test-btn="signup"]').hasText('Submit');
  });

  test('It should have label and checkbox(currently behind dev flag)', async function (assert) {
    assert.expect(10);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
      dev: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
      />`);

    assert.dom('.checkbox-label').exists({ count: 4 });
    assert.dom('.checkbox-input').exists({ count: 4 });

    assert.dom('.checkbox-input[name="developer"]').isNotChecked();
    assert.dom('.checkbox-input[name="designer"]').isNotChecked();
    assert.dom('.checkbox-input[name="mavens"]').isNotChecked();
    assert.dom('.checkbox-input[name="productmanager"]').isNotChecked();

    assert.dom('.checkbox-label:nth-child(1)').hasText('Developer');
    assert.dom('.checkbox-label:nth-child(2)').hasText('Designer');
    assert.dom('.checkbox-label:nth-child(3)').hasText('Mavens');
    assert.dom('.checkbox-label:nth-child(4)').hasText('Product Manager');
  });
});
