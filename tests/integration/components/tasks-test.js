import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, waitUntil, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { tasks } from 'website-my/tests/fixtures/tasks';
import { TASK_KEYS } from 'website-my/constants/tasks';

module('Integration | Component | tasks', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Tasks />`);

    assert.ok(this.element.textContent.trim().includes('tasks'));
  });

  skip('there is a fetch task button if no in progress task are there', async function (assert) {
    this.setProperties({
      onTaskChange: () => {},
      onTaskUpdate: () => {},
      showFetchButton: true,
      handleAssignment: () => {},
      findingTask: false,
      dev: true,
    });

    await render(hbs`
      <Tasks
        @onTaskChange={{this.onTaskChange}}
        @onTaskUpdate={{this.handleUpdateTask}}
        @noInProgressTask={{this.showFetchButton}}
        @handleAssignment={{this.handleAssignment}}
        @findingTask={{this.findingTask}}
        @dev={{this.dev}}
      />
    `);

    assert.dom('[data-test-fetchSection]').exists();
  });

  test('Spinner should be visible only on the current updating card', async function (assert) {
    tasks[0].status = 'IN_PROGRESS';
    this.setProperties({
      onTaskChange: () => {},
      onTaskUpdate: () => {},
      showFetchButton: false,
      handleUpdateTask: async () => new Promise((res) => setTimeout(res, 1000)),
      handleAssignment: () => {},
      findingTask: false,
      dev: true,
      tasksToShow: tasks,
    });

    await render(hbs`
      <Tasks
        @tasksToShow={{this.tasksToShow}}
        @onTaskChange={{this.onTaskChange}}
        @onTaskUpdate={{this.handleUpdateTask}}
        @noInProgressTask={{this.showFetchButton}}
        @handleAssignment={{this.handleAssignment}}
        @findingTask={{this.findingTask}}
        @dev={{this.dev}}
      />
    `);

    assert.dom('[data-test-task-spinner]').doesNotExist();

    await fillIn('[data-test-task-status-select]', TASK_KEYS.DONE);

    assert.dom('[data-test-task-spinner]').exists({ count: 1 });

    await waitUntil(
      () => {
        return !find('[data-test-task-spinner]');
      },
      { timeout: 1000 }
    );
    assert.dom('[data-test-task-spinner]').doesNotExist();
  });
  test('changing the task status from any status other than BLOCKED to IN_PROGRESS inform proceeding further will make progress 0', async function (assert) {
    tasks[0].status = 'SMOKE_TESTING';
    this.set('dev', true);
    const ctrl = this.owner.lookup('controller:tasks');

    // before action
    assert.equal(ctrl.showModal, false);
    assert.equal(ctrl.message, '');

    ctrl.allTasks = tasks;
    ctrl.dev = true;
    ctrl.taskFields = {
      status: 'IN_PROGRESS',
    };

    //action
    ctrl.send('handleUpdateTask', tasks[0].id, () => {});

    //after action
    assert.equal(ctrl.showModal, true);
    assert.equal(
      ctrl.message,
      'Proceeding further will make task progress 0%.'
    );
  });
  test('changing the task status from IN_PROGRESS to any status other than BLOCKED inform proceeding further will make progress 100', async function (assert) {
    tasks[0].status = 'IN_PROGRESS';
    this.set('dev', true);
    const ctrl = this.owner.lookup('controller:tasks');

    // before action
    assert.equal(ctrl.showModal, false);
    assert.equal(ctrl.message, '');

    ctrl.allTasks = tasks;
    ctrl.dev = true;
    ctrl.taskFields = {
      status: 'SMOKE_TESTING',
    };

    // action
    ctrl.send('handleUpdateTask', tasks[0].id, () => {});

    // after action
    assert.equal(ctrl.showModal, true);
    assert.equal(
      ctrl.message,
      'Proceeding further will make task progress 100%.'
    );
  });
  test('changing the task status from BLOCKED to any status other than IN_PROGRESS when percentCompleted is less than 100, inform the user proceeding further will make progress 100', async function (assert) {
    tasks[0].status = 'BLOCKED';
    this.set('dev', true);
    const ctrl = this.owner.lookup('controller:tasks');

    // before action
    assert.equal(ctrl.showModal, false);
    assert.equal(ctrl.message, '');

    ctrl.allTasks = tasks;
    ctrl.dev = true;
    ctrl.taskFields = {
      status: 'SMOKE_TESTING',
    };

    // action
    ctrl.send('handleUpdateTask', tasks[0].id, () => {});

    // after action
    assert.equal(ctrl.showModal, true);
    assert.equal(
      ctrl.message,
      `The progress of current task is ${tasks[0].percentCompleted}%. Proceeding further will make task progress 100%.`
    );
  });
});
