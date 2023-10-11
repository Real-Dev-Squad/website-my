import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-status', function (hooks) {
  setupRenderingTest(hooks);

  test('show relevant data when status is ONBOARDING', async function (assert) {
    this.setProperties({
      changeStatus: () => {},
      updateStatus: () => {},
      status: 'ONBOARDING',
      isStatusUpdating: false,
    });

    await render(hbs`
        <UserStatus 
          @status={{this.status}} 
          @changeStatus={{this.changeStatus}} 
          @isStatusUpdating={{this.isStatusUpdating}}
          @updateStatus={{this.updateStatus}}
        />
    `);

    assert.dom('[data-test-onboarding-details]').exists();
    assert.dom('[data-test-status]').hasText('You are undergoing onboarding');
  });

  test('show relevant data when status is IDLE', async function (assert) {
    this.setProperties({
      changeStatus: () => {},
      updateStatus: () => {},
      status: 'IDLE',
      isStatusUpdating: false,
    });

    await render(hbs`
        <UserStatus 
          @status={{this.status}} 
          @changeStatus={{this.changeStatus}} 
          @isStatusUpdating={{this.isStatusUpdating}}
          @updateStatus={{this.updateStatus}}
        />
    `);

    assert.dom('[data-test-status]').hasText(`You are Idle`);
    assert
      .dom('[data-test-update-status-OOO]')
      .hasText('Change your status to OOO');
  });

  test('show relevant data when status is OOO', async function (assert) {
    this.setProperties({
      status: 'OOO',
      isStatusUpdating: false,
      changeStatus: () => {},
      updateStatus: () => {},
    });

    await render(hbs`
        <UserStatus 
          @status={{this.status}} 
          @changeStatus={{this.changeStatus}} 
          @isStatusUpdating={{this.isStatusUpdating}}
          @updateStatus={{this.updateStatus}}
        />
    `);

    assert.dom('[data-test-status]').hasText(`You are OOO`);
    assert.dom('[data-test-cancel-status-OOO]').hasText('Cancel OOO');
  });

  test('payload contains relevant data when status is changed from OOO to IDLE or ACTIVE', async function (assert) {
    this.setProperties({
      status: 'OOO',
      isStatusUpdating: false,
      changeStatus: () => {},
      updateStatus: (cancelOOOPayload) => {
        const { cancelOoo } = cancelOOOPayload;
        assert.equal(cancelOoo, true, 'cancel OOO status');
      },
    });

    await render(hbs`
        <UserStatus 
          @status={{this.status}} 
          @changeStatus={{this.changeStatus}} 
          @isStatusUpdating={{this.isStatusUpdating}}
          @updateStatus={{this.updateStatus}}
        />
    `);

    await click('.buttons__cancel--ooo');
  });
});
