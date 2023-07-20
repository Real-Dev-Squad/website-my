import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, fillIn, click, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | progress-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ProgressBar />`);

    assert.dom('[data-test-progress-bar]').exists();
  });

  test('it has edit button', async function (assert) {
    await render(hbs`<ProgressBar />`);

    assert.dom('[data-test-progress-bar-button]').exists();
  });

  test('verify edit button click', async function (assert) {
    this.setProperties({
      percentageCompleted: '10',
      onUpdate: (value) => {
        this.percentageCompleted = value;
      },
    });
    await render(
      hbs`<ProgressBar @value={{this.percentageCompleted}} @onUpdate={{this.onUpdate}} />`
    );
    const editButton = find('[data-test-progress-bar-button]');

    await click(editButton);
    assert.dom(editButton).containsText('10');
  });

  test('verify update success', async function (assert) {
    this.setProperties({
      percentageCompleted: '10',
      onUpdate: (value) => {
        this.percentageCompleted = value;
      },
    });
    await render(
      hbs`<ProgressBar @value={{this.percentageCompleted}} @onUpdate={{this.onUpdate}} />`
    );

    const editButton = find('[data-test-progress-bar-button]');

    await click(editButton);

    const progressBarInput = find('[data-test-progress-bar]');

    await fillIn(progressBarInput, '50');

    assert.dom('[data-test-progress-bar-button]').exists();
    assert.equal(progressBarInput.value, '50', "The value should be '50'.");
  });

  test('verify update error', async function (assert) {
    this.setProperties({
      percentageCompleted: '10',
      onChange: (e) => {
        this.percentageCompleted = '10';
      },
    });
    await render(
      hbs`<ProgressBar @value={{this.percentageCompleted}} @onChange={{this.onChange}} />`
    );

    const editButton = find('[data-test-progress-bar-button]');

    await click(editButton);
    let progressBarInput = find('[data-test-progress-bar]');

    await fillIn(progressBarInput, '50');

    assert.dom('[data-test-progress-bar-button]').exists();

    await waitFor(editButton);

    await click(editButton);

    assert.dom('[data-test-progress-bar-button]').hasText('10');
  });
});
