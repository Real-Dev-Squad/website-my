import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { tasks } from 'website-my/tests/fixtures/tasks';
import { TASK_KEYS, TASK_MESSAGES } from 'website-my/constants/tasks';

module('Unit | Component | tasks', function (hooks) {
  setupRenderingTest(hooks);
  test('shouldTaskProgressBe100 function should return true if task is moving from  in progress to task status other than blocked', async function (assert) {
    tasks[0].status = 'IN_PROGRESS';
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];
    ctrl.taskFields = {
      status: 'SMOKE_TESTING',
    };

    const res = ctrl.shouldTaskProgressBe100(tasks[0].id);

    assert.equal(res, true);
  });
  test('shouldTaskProgressBe100 function should return false if task is moving from in progress to blocked', async function (assert) {
    tasks[0].status = 'BLOCKED';
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];
    ctrl.taskFields = {
      status: 'IN_PROGRESS',
    };

    const res = ctrl.shouldTaskProgressBe100(tasks[0].id);

    assert.equal(res, false);
  });
  test('shouldTaskProgressBe0 function should return true if task is moving to in progress from any status other than block', async function (assert) {
    tasks[0].status = 'SMOKE_TESTING';
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];

    ctrl.taskFields = {
      status: 'IN_PROGRESS',
    };

    const res = ctrl.shouldTaskProgressBe0(tasks[0].id);

    assert.equal(res, true);
  });
  test('shouldTaskProgressBe0 function should return false if task is moving to in progress from blocked status', async function (assert) {
    tasks[0].status = 'BLOCKED';
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];

    ctrl.taskFields = {
      status: 'IN_PROGRESS',
    };

    const res = ctrl.shouldTaskProgressBe0(tasks[0].id);

    assert.equal(res, false);
  });
  test('getInfoMsg function should return current progress and warning that proceeding further will make progress 100, if shouldTaskProgressBe100 returns true', async function (assert) {
    tasks[0].status = 'SMOKE_TESTING';
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];

    ctrl.shouldTaskProgressBe100 = () => true;

    const res = ctrl.getInfoMsg(tasks[0].id);
    const msg = `The progress of current task is ${tasks[0].percentCompleted}%. ${TASK_MESSAGES.CHANGE_TO_100_PROGRESS}`;

    assert.equal(res, msg);
  });
  test('getInfoMsg function should return current progress and warning that proceeding further will make progress 0, if shouldTaskProgressBe0 returns true', async function (assert) {
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];
    ctrl.shouldTaskProgressBe0 = () => true;

    const res = ctrl.getInfoMsg(tasks[0].id);
    const msg = `The progress of current task is ${tasks[0].percentCompleted}%. ${TASK_MESSAGES.CHANGE_TO_0_PROGRESS}`;

    assert.equal(res, msg);
  });
  test('getInfoMsg function should return undefined, if both shouldTaskProgressBe0 and shouldTaskProgressBe100 returns false', async function (assert) {
    const ctrl = this.owner.lookup('controller:tasks');

    ctrl.getTaskById = () => tasks[0];
    ctrl.shouldTaskProgressBe0 = () => false;
    ctrl.shouldTaskProgressBe100 = () => false;

    const res = ctrl.getInfoMsg(tasks[0].id);

    assert.equal(res, undefined);
  });
  test('isProgressChanged function should return true if percentCompleted of task is same as passed down', async function (assert) {
    const ctrl = this.owner.lookup('controller:tasks');

    const res = ctrl.isProgressChanged(tasks[0], 25);

    assert.equal(res, true);
  });
  test('isProgressChanged function should return false if percentCompleted of task is different then passed down value', async function (assert) {
    const ctrl = this.owner.lookup('controller:tasks');

    const res = ctrl.isProgressChanged(tasks[0], 5);

    assert.equal(res, false);
  });
  test('isTaskStatusChanged function should return true if status of task is same as passed down value', async function (assert) {
    const ctrl = this.owner.lookup('controller:tasks');

    const res = ctrl.isTaskStatusChanged(tasks[0], tasks[0].status);

    assert.equal(res, true);
  });
  test('isTaskStatusChanged function should return false if status of task is different then passed down value', async function (assert) {
    const ctrl = this.owner.lookup('controller:tasks');

    const res = ctrl.isTaskStatusChanged(tasks[0], TASK_KEYS.SANITY_CHECK);

    assert.equal(res, false);
  });
});
