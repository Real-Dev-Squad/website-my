import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import fillIn from '@ember/test-helpers/dom/fill-in';

module('Integration | Component | form-input-validator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Assemble
    await render(hbs`
      <FormInputValidator />
    `);

    // Assert
    assert.dom('input').exists();
  });

  test('it shows the error', async function (assert) {
    // Assemble
    await render(hbs`
      <FormInputValidator
        @errorMessage={{'SAMPLE ERROR'}}
        @required={{true}}
        @showError={{true}}
      />
    `);

    // Assert
    assert.dom('.error').exists();
  });

  test('it returns the right type of input entered for number', async function (assert) {
    // Assemble
    const NUMBER_TYPE = 'number';
    const NUMBER_INPUT = 12345;

    // Assemble
    this.set('onChange', (inputValue) => {
      this.set('inputValue', inputValue);

      if (typeof inputValue !== NUMBER_TYPE) {
        assert.step('Wrong Type');
      }
    });

    await render(hbs`
      <FormInputValidator
        @type={{NUMBER_TYPE}}
        @value={{this.inputValue}}
        @onChange={{this.onChange}}
      />
    `);

    // Act
    await fillIn('input', NUMBER_INPUT);

    // Assert
    assert.verifySteps([]);
  });

  test('it returns the right type of input entered for string', async function (assert) {
    const STRING_TYPE = 'string';
    const STRING_INPUT = '12345';

    // Assemble
    this.set('onChange', (inputValue) => {
      this.set('inputValue', inputValue);

      if (typeof inputValue !== STRING_TYPE) {
        assert.step('Wrong Type');
      }
    });

    await render(hbs`
      <FormInputValidator
        @type={{STRING_TYPE}}
        @value={{this.inputValue}}
        @onChange={{this.onChange}}
      />
    `);

    // Act
    await fillIn('input', STRING_INPUT);

    // Assert
    assert.verifySteps([]);
  });
});
