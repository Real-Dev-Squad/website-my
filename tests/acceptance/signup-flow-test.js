import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {fields} from '../mocks/user-data';
import { setupWorker } from 'msw';
import { handlers } from '../mocks/handler';
import sinon from 'sinon';

module('Acceptance | signup flow', function (hooks) {
  const worker = setupWorker(...handlers);

  hooks.beforeEach(() => {
    worker.start();
    class Blob {}
        Blob = Blob;
       window = {
          open() {},
          URL: {
            createObjectURL() {},
          },
        };
  });
  hooks.afterEach(() => {
    worker.stop();
  });

  setupApplicationTest(hooks);

  test('signup flow', async function (assert) {
    const openStub = sinon.stub(window, "open");
    const createObjectURLStub = sinon.stub(window.URL, "createObjectURL").returns("fake object url");
        
    await visit('/signup');
    assert.equal(currentURL(), '/signup');

    assert.dom('[data-test-id="signup-button-disabled"]').exists();
    assert.dom('[data-test-id="signup-button"]').doesNotExist();

    for (let field in fields) {
      await fillIn(`[data-test-id="form-input-${field}"]`, fields[field]);
    }


    assert
      .dom('[data-test-id="form-input-first_name"]')
      .hasValue('test');
    assert
      .dom('[data-test-id="form-input-last_name"]')
      .hasValue('user');
    assert
      .dom('[data-test-id="form-input-username"]')
      .hasValue('test-user');
    assert
      .dom('[data-test-id="form-input-email"]')
      .hasValue('test@user.com');
    assert
      .dom('[data-test-id="form-input-yoe"]')
      .hasValue('0');
    assert
      .dom('[data-test-id="form-input-company"]')
      .hasValue('rds');
    assert
      .dom('[data-test-id="form-input-designation"]')
      .hasValue('demo');
    assert
      .dom('[data-test-id="form-input-linkedin_id"]')
      .hasValue('demo@linkedin');
    assert
      .dom('[data-test-id="form-input-instagram_id"]')
      .hasValue('demo@insta');
    assert
      .dom('[data-test-id="form-input-twitter_id"]')
      .hasValue('demo@twitter');
    assert
      .dom('[data-test-id="form-input-website"]')
      .hasValue('test.com');

    assert.dom('[data-test-id="signup-button-disabled"]').doesNotExist();
    assert.dom('[data-test-id="signup-button"]').exists();


    await click('[data-test-id="signup-button"]')
    assert.ok(createObjectURLStub.calledOnce)
    assert.ok(openStub.calledWith("fake object url"))


    await this.pauseTest();
 

  });
});
