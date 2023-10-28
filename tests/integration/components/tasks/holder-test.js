import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { tasks, overDueTask } from 'website-my/tests/fixtures/tasks';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { find, render, waitUntil, fillIn, select } from '@ember/test-helpers';
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
    this.set('dev', true);

    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
    @dev={{this.dev}}
  />`);
    assert
      .dom('[data-test-task-extensionForm-button]')
      .hasText('Request Extension');
  });

  test('Render Task holder and check wether it has progress bar', async function (assert) {
    this.set('task', tasksData[3]);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);
    await waitUntil(() => find('[data-test-task-progress-bar]'));

    assert.ok(
      find('[data-test-task-progress-bar]'),
      'Progress bar is rendered'
    );
  });

  test('Render Task holder and verify progress bar style', async function (assert) {
    this.set('task', overDueTask);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);

    const progressBarElement = this.element.querySelector(
      '[data-test-task-progress-bar]'
    );
    assert.dom(progressBarElement).hasClass('progress-bar-red');
  });

  test('Render Task holder and verify style for on-time task', async function (assert) {
    const onTimeTask = tasksData[3];
    onTimeTask.startedOn = Date.now() / 1000;

    //Current time + 5days in seconds
    onTimeTask.endsOn = (Date.now() + 1000 * 60 * 60 * 24 * 5) / 1000;

    this.set('task', onTimeTask);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);

    const taskCardElement = this.element.querySelector('[data-test-task-card]');
    assert.dom(taskCardElement).doesNotHaveClass('task-late');

    assert.dom(taskCardElement).hasStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: '2px solid rgb(217, 217, 217)',
    });
  });

  test('Render Task holder and verify style for overdue task', async function (assert) {
    this.set('task', overDueTask);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);

    const taskCardElement = this.element.querySelector('[data-test-task-card]');
    assert.dom(taskCardElement).hasClass('task-late');

    assert.dom(taskCardElement).hasStyle({
      backgroundColor: 'rgb(255, 235, 238)',
      border: '2px solid rgb(255, 0, 0)',
    });
  });

  test('Verify values of input slider upon api failures', async function (assert) {
    const testTask = tasksData[3];
    testTask.percentCompleted = '50';
    testTask.status = TASK_KEYS.IN_PROGRESS;

    this.set('task', testTask);
    this.set('mock', () => {});
    this.set('onTaskUpdate', (taskId, error) => {
      error();
    });
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder 
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.onTaskUpdate}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);

    assert.dom('[data-test-task-progress-bar]').hasValue('50');

    await fillIn('[data-test-task-progress-bar]', '25');

    assert.dom('[data-test-task-progress-bar]').hasValue('50');
  });

  test('Verify values of task status upon api failures', async function (assert) {
    const testTask = tasksData[3];
    testTask.status = TASK_KEYS.IN_PROGRESS;

    this.set('task', testTask);
    this.set('mock', () => {});
    this.set('onTaskUpdate', (taskId, error) => {
      error();
    });
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder
    @task={{this.task}}
    @onTaskChange={{this.mock}}
    @onStausChange={{this.mock}}
    @onTaskUpdate={{this.onTaskUpdate}}
    @userSelectedTask={{this.defaultType}}
    @disabled={{this.disabled}}
  />`);

    assert
      .dom('[data-test-task-status-select]')
      .hasValue(TASK_KEYS.IN_PROGRESS);

    await select('[data-test-task-status-select]', TASK_KEYS.COMPLETED);

    assert
      .dom('[data-test-task-status-select]')
      .hasValue(TASK_KEYS.IN_PROGRESS);
  });

  test('Verify status change to VERIFIED', async function (assert) {
    const testTask = tasksData[3];

    testTask.status = TASK_KEYS.IN_PROGRESS;

    let onTaskUpdateCalled = 0;

    this.set('task', testTask);
    this.set('onTaskUpdate', () => {
      onTaskUpdateCalled++;
    });
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    await render(hbs`<Task::Holder
    @task={{this.task}}
    @onTaskUpdate={{onTaskUpdate}}
    @onTaskChange={{this.mock}}
    @userSelectedTask={{this.defaultType}}
    @disabled={{this.disabled}}
  />`);

    assert
      .dom('[data-test-task-status-select]')
      .hasValue(TASK_KEYS.IN_PROGRESS);

    await select('[data-test-task-status-select]', TASK_KEYS.VERIFIED);

    assert.equal(onTaskUpdateCalled, 1, 'onTaskUpdate should be called once');
  });
});
