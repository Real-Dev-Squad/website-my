import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | new-sign-up/form', function (hooks) {
  setupRenderingTest(hooks);

  test('it has a label', async function (assert) {
    assert.expect(1);

    this.set('changeRouteParams', function () {
      this.transitionToRoute({ queryParams: { state: 'firstName' } });
    });

    await render(
      hbs`<NewSignUp::Form @handleRouteParamsChange={{this.changeRouteParams}} />`
    );

    assert.dom('[data-test-signup-form-label]').hasAnyText();
  });

  test('It should have button with text', async function (assert) {
    assert.expect(2);

    this.set('changeRouteParams', function () {
      this.transitionToRoute({ queryParams: { state: 'firstName' } });
    });

    await render(
      hbs`<NewSignUp::Form @handleRouteParamsChange={{this.changeRouteParams}} />`
    );

    assert.dom('[data-test-signup-button]').exists();
    assert.dom('[data-test-signup-button]').hasAnyText();
  });

  test('It should have input field', async function (assert) {
    assert.expect(3);

    this.set('changeRouteParams', function () {
      this.transitionToRoute({ queryParams: { state: 'firstName' } });
    });

    await render(
      hbs`<NewSignUp::Form @handleRouteParamsChange={{this.changeRouteParams}} />`
    );

    assert.dom('[data-test-signup-form-input]').exists();
    assert
      .dom('[data-test-signup-form-input]')
      .hasProperty('type', 'text')
      .hasAttribute('placeholder');
  });
});
