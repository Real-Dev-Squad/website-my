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
});
