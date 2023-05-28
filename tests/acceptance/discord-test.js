import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | discord', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /discord', async function (assert) {
    await visit('/discord');

    assert.equal(currentURL(), '/discord');

    assert.dom('header img').exists();
    assert.dom('header div.line').exists();
    assert.dom('header img').hasClass('logo');

    assert.dom('h2.heading').exists().hasText('Authorize Bot');

    assert.dom('main.discord-card').exists();
    assert
      .dom('main.discord-card p')
      .exists()
      .includesText('Real Dev Squad wants to access your Discord');
    assert
      .dom('main.discord-card div.profile-card img')
      .exists()
      .hasClass('logo');

    assert
      .dom('main div.TnC p')
      .exists()
      .includesText('By authorizing us you allow us to:');
    assert
      .dom('main div.TnC ul')
      .exists()
      .includesText(
        'Change your name within our server. Read/process your messages.'
      );

    assert.dom('main div.consent input').exists();
    assert
      .dom('main div.consent label')
      .exists()
      .hasText('I Accept the above mentioned clauses');
    assert.dom('main button.button').exists().hasClass('btn-disabled');

    await click('main div.consent input');
    assert.dom('main button.button').exists().hasClass('btn-enabled');
  });
});
