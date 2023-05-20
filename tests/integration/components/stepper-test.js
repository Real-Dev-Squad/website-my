import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stepper', (hooks) => {
  setupRenderingTest(hooks);

  test('it not renders the stepper component when no props passed', async function (assert) {
    await render(hbs`<Stepper />`);

    assert.dom('[data-test-stepper]').doesNotExist();
  });

  test('it renders the stepper component without completed steps', async function (assert) {
    this.setProperties({
      totalSteps: 5,
      completedSteps: 0,
    });

    await render(
      hbs`<Stepper
      @totalSteps={{this.totalSteps}}
      @completedSteps={{this.completedSteps}}
       />`
    );

    assert.dom('[data-test-stepper]').exists();
    assert
      .dom('[data-test-stepper-step="active"]')
      .exists({ count: 1 }, 'Active Step present on step-1 in the stepper');
    assert
      .dom('[data-test-stepper-step="completed"]')
      .exists({ count: 0 }, 'No Cleared Steps present in the stepper');
  });

  test('it renders the stepper component with completed steps', async function (assert) {
    this.setProperties({
      totalSteps: 5,
      completedSteps: 2,
    });

    await render(
      hbs`<Stepper
      @totalSteps={{this.totalSteps}}
      @completedSteps={{this.completedSteps}}
       />`
    );

    assert.dom('[data-test-stepper]').exists();
    assert
      .dom('[data-test-stepper-step="active"]')
      .exists({ count: 1 }, 'Active Step present on step-3 in the stepper');
    assert
      .dom('[data-test-stepper-step="completed"]')
      .exists({ count: 2 }, 'Two Cleared Steps present in the stepper');
  });
});
