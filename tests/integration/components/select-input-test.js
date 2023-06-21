import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { TASK_STATUS_LIST, TASK_KEYS } from 'website-my/constants/tasks';

module('Integration | Component | select-input', function (hooks) {
  setupRenderingTest(hooks);

  test('render select-input', async function (assert) {
    this.set('availabletaskStatusList', TASK_STATUS_LIST);
    this.set('TASK_KEYS', TASK_KEYS);

    this.set('onStatusChange', function () {});
    this.set('onTaskUpdate', function () {});

    await render(hbs`
      <select
        id='task-update'
        onchange={{action this.onStatusChange}}
        onchange={{action this.onTaskUpdate @task.id}}
      >
        {{#each this.availabletaskStatusList as |taskStatus|}}
          {{#if (not-eq taskStatus.key this.TASK_KEYS.ALL)}}
            <option value={{taskStatus.key}}>
              {{taskStatus.displayLabel}}
            </option>
          {{/if}}
        {{/each}}
      </select>
    `);

    // Assert
    assert.dom('select').exists();

    const selectOptions = find('#task-update').querySelectorAll('option');

    assert.equal(
      selectOptions.length,
      this.availabletaskStatusList.length - 1,
      'Correct number of options are rendered'
    );
  });
});
