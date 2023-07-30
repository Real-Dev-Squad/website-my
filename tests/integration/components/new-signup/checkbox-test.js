import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

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
    assert.dom('.checkbox-input[name="maven"]').isNotChecked();
    assert.dom('.checkbox-input[name="productmanager"]').isNotChecked();

    assert.dom('.checkbox-label:nth-child(1)').hasText('Developer');
    assert.dom('.checkbox-label:nth-child(2)').hasText('Designer');
    assert.dom('.checkbox-label:nth-child(3)').hasText('Maven');
    assert.dom('.checkbox-label:nth-child(4)').hasText('Product Manager');
  });

  test('should call the onChange function with the correct parameters when checkbox is clicked', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
      dev: true,
    });

    this.set('onChange', (key, value) => {
      assert.deepEqual(
        { key, value },
        { key: 'developer', value: true },
        'onChange function called with correct parameters'
      );
    });

    await render(hbs`
    <NewSignup::Checkbox
      @onClick={{this.onClick}} 
      @onChange={{this.onChange}}
      @currentStep={{this.currentStep}}
      @dev={{this.dev}}
    />`);

    const checkboxElement = find('.checkbox-input');

    await click(checkboxElement);
  });
});
