import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sign-up/button', function (hooks) {
  setupRenderingTest(hooks);

  test('Button should be disabled if @disabled is true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button @disabled={{true}}>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').isDisabled();
  });

  test('Button should not be disabled if @disabled is undefined', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').isNotDisabled();
  });

  test('Button should not be disabled if @disabled is not true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button @disabled={{false}}>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').isNotDisabled();
  });

  test('Button should be of type button', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').hasAttribute('type', 'button');
  });

  test('Button should have spinner if @isSubmitClick is true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button @isSubmitClicked={{true}}>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button-spinner]').exists();
  });

  test('Button should not have spinner if @isSubmitClick is not true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button-spinner]').doesNotExist();
  });

  skip('Click event should not execute if button is disabled', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.set('clickFnc', () => {
      this.set('isClicked', true);
    });

    await render(hbs`
      <SignUp::Button @disabled={{true}}>{{inputValue}}</SignUp::Button>
    `);

    const button = this.element.querySelector(
      '[data-test-signup-button-spinner]'
    );
    button.addEventListener('click', this.clickFn);

    await click(button);
    assert.notStrictEqual(this.isClicked, true);
  });

  skip('Click event should execute if button is not disabled', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.set('clickFnc', () => {
      this.set('isClicked', true);
    });

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    const button = this.element.querySelector(
      '[data-test-signup-button-spinner]'
    );
    button.addEventListener('click', this.clickFn);

    await click(button);
    assert.strictEqual(this.isClicked, true);
  });
});
