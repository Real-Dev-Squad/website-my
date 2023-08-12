import { module, skip } from 'qunit';
import {
  visit,
  currentURL,
  click,
  pauseTest,
  resumeTest,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { Server } from 'ember-cli-mirage';
import { setupWindowMock } from 'ember-window-mock/test-support';
import sinon from 'sinon';
import ENV from 'website-my/config/environment';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);
  setupWindowMock(hooks);

  skip('visit button click redirects to home', async function (assert) {
    let stub = sinon.stub(window, 'confirm');
    stub.returns(true);

    let server = new Server({
      models: {},
      routes() {
        this.namespace = ENV.BASE_API_URL;

        this.patch('auth/qr-code-auth/authorization_status/AUTHORIZED', {});
      },
    });

    await visit('/mobile');
    assert.equal(currentURL(), '/mobile');
    await click('[data-test-verify-button]');
    setTimeout(() => {
      resumeTest();
    }, 500);
    // eslint-disable-next-line ember/no-pause-test
    await pauseTest();
    assert.equal(currentURL(), '/');

    server.shutdown();
  });

  skip('visit button click gives error', async function (assert) {
    // eslint-disable-next-line ember/no-pause-test
    let server = new Server({
      models: {},
      routes() {
        this.namespace = ENV.BASE_API_URL;

        this.patch(
          'auth/qr-code-auth/authorization_status/AUTHORIZED',
          {},
          500
        );
      },
    });

    await visit('/mobile');
    assert.equal(currentURL(), '/mobile');
    await click('[data-test-verify-button]');
    setTimeout(() => {
      resumeTest();
    }, 500);
    // eslint-disable-next-line ember/no-pause-test
    await pauseTest();
    assert.equal(currentURL(), '/mobile');

    server.shutdown();
  });
});
