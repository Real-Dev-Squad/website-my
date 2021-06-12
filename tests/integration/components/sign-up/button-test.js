import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sign-up/button', function (hooks) {
  setupRenderingTest(hooks);

  skip('Button should not render if its content is not present', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SignUp::Button></SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').doesNotExist();
  });

  skip('Button should be disabled if @disabled is true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button @disabled={{true}}>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').isDisabled();
  });

  skip('Button should not be disabled if @disabled is undefined', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').isNotDisabled();
  });

  skip('Button should not be disabled if @disabled is not true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button @disabled="hello">{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').isNotDisabled();
  });

  skip('Button should be of type button', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button]').hasAttribute('type', 'button');
  });

  skip('Button should have spinner if @isSubmitClick is true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');

    await render(hbs`
      <SignUp::Button>{{inputValue}}</SignUp::Button>
    `);

    assert.dom('[data-test-signup-button-spinner]').exists();
  });

  skip('Button should not have spinner if @isSubmitClick is not true', async function (assert) {
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
