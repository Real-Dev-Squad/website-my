import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tasks', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Tasks />`);

    assert.ok(this.element.textContent.trim().includes('tasks'));
  });

  test('there is a fetch task button if no in progress task are there', async function (assert) {
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
});
