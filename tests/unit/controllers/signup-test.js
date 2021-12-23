import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | signup', function (hooks) {
  setupTest(hooks);
  test('it test', function (assert) {
    let controller = this.owner.lookup('controller:signup');
    assert.expect(4);
    assert.equal(
      controller.isSubmitClicked,
      false,
      'initially isSubmitClicked is false'
    );
    assert.equal(
      controller.isButtonDisabled,
      true,
      'initially isButtonDisabled is true'
    );
    assert.equal(
      controller.state,
      'get-started',
      'initially state is get-started'
    );
    assert.equal(
      controller.errorMessage,
      null,
      'initially errorMessage is null'
    );
  });
});
