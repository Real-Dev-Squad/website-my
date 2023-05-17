import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | mobile', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:mobile');
    assert.ok(route);
  });
});
