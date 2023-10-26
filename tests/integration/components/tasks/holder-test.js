import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { tasks, overDueTask } from 'website-my/tests/fixtures/tasks';
import {
  TASK_KEYS,
  TASK_STATUS_LIST,
  TASK_KEYS_NEW,
} from 'website-my/constants/tasks';
import { find, render, waitUntil, fillIn, select } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);
    await waitUntil(() => find('[data-test-task-extensionForm-button]'));

    assert.equal(
      this.element.querySelector('[data-test-task-extensionForm-button]')
        .innerText,
      'Extension Status'
    );
  });

  test('Render Task holder and check wether it has progress bar', async function (assert) {
    this.set('task', tasksData[3]);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
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
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);

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

  test('Check if old task status options are displayed when dev is false', async function (assert) {
    this.set('task', tasksData[3]);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);
    class MockFeatureFlagService extends Service {
      isDevMode = false;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
  />`);

    const taskStatusList = this.element.querySelector(
      '[data-test-task-status-select]'
    );

    const oldTaskKeys = Object.keys(TASK_KEYS);

    for (let i = 0; i < taskStatusList.options.length; i++) {
      const optionValue = taskStatusList.options[i].value;
      assert.ok(oldTaskKeys.includes(optionValue));
    }
    assert.equal(taskStatusList.options.length, 13);
  });

  test('Check if new task status options are displayed when dev is true', async function (assert) {
    this.set('task', tasksData[3]);
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);
    class MockFeatureFlagService extends Service {
      isDevMode = true;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);
    await render(hbs`<Task::Holder
    @task={{this.task}} 
    @onTaskChange={{this.mock}} 
    @onStausChange={{this.mock}} 
    @onTaskUpdate={{this.mock}} 
    @isLoading={{this.isLoading}} 
    @userSelectedTask={{this.defaultType}} 
    @disabled={{this.disabled}}
    @dev={{true}}
  />`);

    const taskStatusList = this.element.querySelector(
      '[data-test-task-status-select]'
    );

    const newTaskKeys = Object.keys(TASK_KEYS_NEW);

    for (let i = 0; i < taskStatusList.options.length; i++) {
      const optionValue = taskStatusList.options[i].value;
      assert.ok(newTaskKeys.includes(optionValue));
    }
    assert.equal(taskStatusList.options.length, 12);
  });

  test('Verify task status update to DONE when dev is true', async function (assert) {
    const testTask = tasksData[3];

    testTask.status = TASK_KEYS_NEW.IN_PROGRESS;

    let onTaskUpdateCalled = 0;

    this.set('task', testTask);
    this.set('onTaskUpdate', () => {
      onTaskUpdateCalled++;
    });
    this.set('mock', () => {});
    this.set('isLoading', false);
    this.set('disabled', false);
    this.set('defaultType', DEFAULT_TASK_TYPE);

    class MockFeatureFlagService extends Service {
      isDevMode = true;
    }
    this.owner.register('service:featureFlag', MockFeatureFlagService);

    await render(hbs`<Task::Holder
    @task={{this.task}}
    @onTaskUpdate={{onTaskUpdate}}
    @onTaskChange={{this.mock}}
    @userSelectedTask={{this.defaultType}}
    @disabled={{this.disabled}}
    @dev={{true}}
  />`);

    assert
      .dom('[data-test-task-status-select]')
      .hasValue(TASK_KEYS.IN_PROGRESS);

    await select('[data-test-task-status-select]', TASK_KEYS_NEW.DONE);

    assert.equal(onTaskUpdateCalled, 1, 'onTaskUpdate should be called once');
  });
});
