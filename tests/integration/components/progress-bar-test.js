import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module.only('Integration | Component | progress-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ProgressBar />`);

    assert.dom('[data-test-progress-bar]').exists();
  });

  test('it has progress value', async function (assert) {
    await render(hbs`<ProgressBar />`);

    assert.dom('[data-test-progress-bar-text]').exists();
  });

  test('it should display the correct value on update', async function (assert) {
    this.setProperties({
      percentageCompleted: '10',
      onUpdate: (value) => {
        this.percentageCompleted = value;
      },
    });
    await render(
      hbs`<ProgressBar @value={{this.percentageCompleted}} @onUpdate={{this.onUpdate}} />`
    );

    // const editButton = find('[progress-slider__text]');

    // await click(editButton);

    const progressBarInput = find('[data-test-progress-bar]');

    await fillIn(progressBarInput, '50');

    assert.equal(progressBarInput.value, '50', "The value should be '50'.");
  });

  test('it should display the old value when an update fails', async function (assert) {
    this.setProperties({
      percentageCompleted: '10',
      onChange: () => {
        this.percentageCompleted = '10';
      },
    });
    await render(
      hbs`<ProgressBar @value={{this.percentageCompleted}} @onChange={{this.onChange}} />`
    );

    // const editButton = find('[data-test-progress-bar-button]');

    // await click(editButton);
    let progressBarInput = find('[data-test-progress-bar]');

    await fillIn(progressBarInput, '50');

    // assert.dom('[data-test-progress-bar-button]').exists();

    await new Promise((r) => setTimeout(r, 2000));

    // await click(editButton);

    assert.dom('[data-test-progress-bar-text]').hasText('10');
  });
});
