import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sign-up/form', function (hooks) {
  setupRenderingTest(hooks);

  skip('It should have label', async function (assert) {
    assert.expect(1);

    this.set('label', 'Form Label');
    await render(hbs`
      <SignUp::Form 
        @label={{this.label}}
      />
    `);

    assert.dom('[data-test-signup-form-label]').hasText(this.label);
  });

  skip('It should have button with text', async function (assert) {
    assert.expect(2);

    await render(hbs`<SignUp::Form /> `);

    assert.dom('[data-test-signup-button]').exists();
    assert.dom('[data-test-signup-button]').hasAnyText();
  });

  skip('It should have input field', async function (assert) {
    assert.expect(3);

    await render(hbs`<SignUp::Form /> `);

    assert.dom('[data-test-signup-form-input]').exists();
    assert
      .dom('[data-test-signup-form-input]')
      .hasProperty('type', 'text')
      .hasAttribute('placeholder');
  });
});
