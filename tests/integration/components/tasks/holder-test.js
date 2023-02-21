import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import tasks from 'website-my/tests/fixtures/tasks';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { find, render, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Tasks Holder', function (hooks) {
  setupRenderingTest(hooks);
  let tasksData, DEFAULT_TASK_TYPE;

  hooks.before(function () {
    tasksData = tasks;
    DEFAULT_TASK_TYPE = TASK_STATUS_LIST.find(
      (obj) => obj.key === TASK_KEYS.ALL
    );
  });

  test('Render Task holder and check wether or not it has extension status button', async function (assert) {
    this.set('task', tasksData[3]);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder @task={{this.task}} @onTaskChange={{this.mock}} @onStausChange={{this.mock}} @onTaskUpdate={{this.mock}} @isLoading={{this.isLoading}} @userSelectedTask={{this.defaultType}} @disabled={{this.disabled}}
  />`);
    await waitUntil(() => find('.task-card__extensionForm-button'));
    assert.equal(
      this.element.querySelector('.task-card__extensionForm-button').innerText,
      'Extension Status'
    );
  });
});
