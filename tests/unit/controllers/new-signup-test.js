import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | new-signup', function (hooks) {
  setupTest(hooks);
  test('testing current state after running their separate controller function', function (assert) {
    let controller = this.owner.lookup('controller:new-signup');

    assert.equal(
      controller.currentStep,
      'get-started',
      'current step initially will be get-started'
    );

    controller.send('changeStepToTwo');
    assert.equal(
      controller.currentStep,
      'firstName',
      'current step updated to first name'
    );

    controller.send('changeStepToThree');
    assert.equal(
      controller.currentStep,
      'lastName',
      'current step updated to lastName'
    );

    controller.send('changeStepToFour');
    assert.equal(
      controller.currentStep,
      'username',
      'current step updated to username'
    );

    controller.send('changeStepToFive');
    assert.equal(
      controller.currentStep,
      'role',
      'current step updated to role'
    );
  });

  test('testing handleInput change function', function (assert) {
    let controller = this.owner.lookup('controller:new-signup');
    let firstName = 'firstName';
    let lastName = 'lastName';
    let username = 'username';

    assert.equal(
      controller.signupDetails[firstName],
      '',
      'initially the value of first name is going to be emply string'
    );

    assert.equal(
      controller.signupDetails[lastName],
      '',
      'initially lastName is going to be empty'
    );

    assert.equal(
      controller.signupDetails[username],
      '',
      'initially username is going to be empty'
    );

    controller.send('handleInputChange', 'firstName', 'vinayak');
    assert.equal(
      controller.signupDetails[firstName],
      'vinayak',
      'value of first name updated'
    );

    controller.send('handleInputChange', 'lastName', 'trivedi');
    assert.equal(
      controller.signupDetails[lastName],
      'trivedi',
      'lastName value updated'
    );

    controller.send('handleInputChange', 'username', 'vinayak');
    assert.equal(
      controller.signupDetails[username],
      'vinayak',
      'username value updated'
    );
  });

  test('testing handleCheckboxInput change function', function (assert) {
    let controller = this.owner.lookup('controller:new-signup');
    let developer = 'developer';
    let designer = 'designer';
    let maven = 'maven';
    let productmanager = 'productmanager';

    controller.send('handleCheckboxInputChange', 'developer', true);
    assert.equal(controller.signupDetails.roles[developer], true);

    controller.send('handleCheckboxInputChange', 'designer', true);
    assert.equal(controller.signupDetails.roles[designer], true);

    controller.send('handleCheckboxInputChange', 'maven', true);
    assert.equal(controller.signupDetails.roles[maven], true);

    controller.send('handleCheckboxInputChange', 'productmanager', true);
    assert.equal(controller.signupDetails.roles[productmanager], true);
  });
});
