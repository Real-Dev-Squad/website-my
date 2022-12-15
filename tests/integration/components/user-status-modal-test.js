import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-status-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('modal is visible if showModal is true', async function (assert) {
    this.setProperties({
      updateStatus: () => {},
      toggleUserStateModal: () => {},
      newStatus: 'ACTIVE',
      showUserStateModal: true,
    });
    await render(hbs`
        <UserStatusModal
            @newStatus={{this.newStatus}}
            @showUserStateModal={{this.showUserStateModal}}
            @toggleUserStateModal={{this.toggleUserStateModal}}
            @updateStatus={{this.updateStatus}}
        />
        `);

    assert.dom('.modal').exists();
    assert.dom('.modal__close').exists();
    assert.dom('.modal__close').hasProperty('button');
  });

  test('modal is not visible if showModal is false', async function (assert) {
    this.setProperties({
      updateStatus: () => {},
      toggleUserStateModal: () => {},
      newStatus: 'ACTIVE',
      showUserStateModal: false,
    });
    await render(hbs`
        <UserStatusModal
            @newStatus={{this.newStatus}}
            @showUserStateModal={{this.showUserStateModal}}
            @toggleUserStateModal={{this.toggleUserStateModal}}
            @updateStatus={{this.updateStatus}}
        />
        `);

    assert.dom('.modal').doesNotExist();
    assert.dom('.modal__close').doesNotExist();
  });

  test('payload contains relevant data when status is changed to OOO', async function (assert) {
    this.setProperties({
      newStatus: 'OOO',
      showUserStateModal: true,
      toggleUserStateModal: () => {
        this.set('showUserStateModal', !this.showUserStateModal);
      },
      updateStatus: (statusPayLoad) => {
        const {
          currentStatus: { state, from, until, message, updatedAt },
        } = statusPayLoad;
        assert.equal(state, 'OOO', 'new state present in the payload');
        assert.equal(
          message,
          'OOO due to Bad Health',
          'message present in the payload'
        );
        assert.ok(typeof from === 'number', 'from is a numeric timestamp');
        assert.ok(typeof until === 'number', 'until is a numeric timestamp');
        assert.ok(
          typeof updatedAt === 'number',
          'updatedAt is a numeric timestamp'
        );
      },
    });

    await render(hbs`
        <UserStatusModal 
            @showUserStateModal={{this.showUserStateModal}}
            @newStatus={{this.newStatus}}
            @toggleUserStateModal={{this.toggleUserStateModal}}
            @updateStatus = {{this.updateStatus}}
        />
    `);

    await fillIn('[data-test-date-picker-from]', '2022-12-02');
    await fillIn('[data-test-date-picker-until]', '2022-12-05');
    await fillIn('[data-test-textarea-reason]', 'OOO due to Bad Health');
    await click('.modal__submit');
  });

  test('payload contains relevant data when status is changed to IDLE', async function (assert) {
    this.setProperties({
      newStatus: 'IDLE',
      showUserStateModal: true,
      toggleUserStateModal: () => {
        this.set('showUserStateModal', !this.showUserStateModal);
      },
      updateStatus: (statusPayLoad) => {
        const {
          currentStatus: { state, from, message, updatedAt },
        } = statusPayLoad;
        assert.equal(state, 'IDLE', 'new state present in the payload');
        assert.equal(
          message,
          'Rust and GoLang',
          'message present in the payload'
        );
        assert.ok(typeof from === 'number', 'from is a numeric timestamp');
        assert.ok(
          typeof updatedAt === 'number',
          'updatedAt is a numeric timestamp'
        );
      },
    });

    await render(hbs`
        <UserStatusModal 
            @showUserStateModal={{this.showUserStateModal}}
            @newStatus={{this.newStatus}}
            @toggleUserStateModal={{this.toggleUserStateModal}}
            @updateStatus={{this.updateStatus}}
            
        />`);
    await fillIn('[data-test-textarea-reason]', 'Rust and GoLang');
    await click('.modal__submit');
  });

  test('modal is closed on click of close button', async function (assert) {
    this.setProperties({
      newStatus: 'ACTIVE',
      showUserStateModal: true,
      toggleUserStateModal: () => {
        this.set('showUserStateModal', !this.showUserStateModal);
      },
    });
    await render(hbs`
        <UserStatusModal
            @newStatus={{this.newStatus}}
            @showUserStateModal={{this.showUserStateModal}}
            @toggleUserStateModal={{this.toggleUserStateModal}}
        />
        `);

    assert.dom('.modal').exists();
    assert.dom('.modal__close').exists();
    await click('.modal__close');
    assert.dom('.modal').doesNotExist();
  });
});
