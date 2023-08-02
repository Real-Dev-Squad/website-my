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

  test('render label and checkbox(currently behind dev flag)', async function (assert) {
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

  test('checkbox is checked after clicking checkbox', async function (assert) {
    assert.expect(4);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'role',
      dev: true,
    });

    this.set('onChange', function (roleKey, value) {
      assert.equal(
        roleKey,
        'developer',
        'onChange action called with correct roleKey'
      );
      assert.equal(value, true, 'onChange action called with correct value');
    });

    await render(hbs`
    <NewSignup::Checkbox
      @onClick={{this.onClick}} 
      @onChange={{this.onChange}}
      @currentStep={{this.currentStep}}
      @dev={{this.dev}}
    />`);

    const developerCheckbox = find('.checkbox-input[name="developer"]');

    assert.notOk(developerCheckbox.checked, 'Checkbox is unchecked');

    await click(developerCheckbox);

    assert.ok(developerCheckbox.checked, 'Checkbox is checked');
  });
});
