import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | discord', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /discord', async function (assert) {
    await visit('/discord');

    assert.equal(currentURL(), '/discord');

    assert.dom('[data-test-header]').exists();
    assert
      .dom('[data-test-header] [data-test-rds-logo]')
      .exists()
      .hasAttribute('src', 'RDSLogo.png')
      .hasAttribute('alt', 'real_dev_squad')
      .hasClass('logo');
    assert
      .dom('[data-test-header] [data-test-platform-link-line]')
      .exists()
      .hasClass('line')
      .hasTagName('div');
    assert
      .dom('[data-test-header] [data-test-discord-logo]')
      .exists()
      .hasAttribute('src', 'DiscordLogo.png')
      .hasAttribute('alt', 'discord')
      .hasClass('logo');

    assert
      .dom('[data-test-heading]')
      .exists()
      .hasText('Authorize Bot')
      .hasClass('heading')
      .hasTagName('h2');

    assert
      .dom('[data-test-main-content]')
      .exists()
      .hasTagName('main')
      .hasClass('discord-card');

    assert
      .dom('[data-test-main-content] [data-test-card-header]')
      .exists()
      .hasClass('my-same')
      .hasTagName('p')
      .includesText('Real Dev Squad wants to access your Discord');

    assert
      .dom('[data-test-main-content] [data-test-discord-profile-card]')
      .exists()
      .hasClass('profile-card')
      .hasTagName('div');
    assert
      .dom(
        '[data-test-main-content] [data-test-discord-profile-card] [data-test-discord-profile-image]'
      )
      .exists()
      .hasAttribute('alt', 'Discord Avatar');
    assert
      .dom(
        '[data-test-main-content] [data-test-discord-profile-card] [data-test-discord-username]'
      )
      .exists()
      .hasTagName('p')
      .hasClass('username');
    assert
      .dom(
        '[data-test-main-content] [data-test-discord-profile-card] [data-test-discord-account]'
      )
      .exists()
      .hasTagName('p')
      .hasText('Discord')
      .hasClass('account');

    assert
      .dom('[data-test-main-content] [data-test-profile-connector]')
      .exists()
      .hasTagName('img')
      .hasAttribute('src', 'DiscordConnector.svg');

    assert
      .dom('[data-test-main-content] [data-test-rds-profile-card]')
      .exists()
      .hasClass('profile-card')
      .hasTagName('div');
    assert
      .dom(
        '[data-test-main-content] [data-test-rds-profile-card] [data-test-rds-profile-image]'
      )
      .exists()
      .hasAttribute('alt', 'Real Dev Squad Avatar');
    assert
      .dom(
        '[data-test-main-content] [data-test-rds-profile-card] [data-test-rds-username]'
      )
      .exists()
      .hasTagName('p')
      .hasClass('username');
    assert
      .dom(
        '[data-test-main-content] [data-test-rds-profile-card] [data-test-rds-account]'
      )
      .exists()
      .hasTagName('p')
      .hasText('Real Dev Squad')
      .hasClass('account');

    assert
      .dom('[data-test-main-content] [data-test-tnc]')
      .exists()
      .includesText('By authorizing us you allow us to:')
      .hasTagName('div');
    assert
      .dom('[data-test-main-content] [data-test-tnc] [data-test-tnc-points]')
      .exists()
      .includesText(
        'Change your name within our server. Read/process your messages.'
      )
      .hasTagName('ul');

    assert
      .dom('[data-test-main-content] [data-test-consent]')
      .exists()
      .hasTagName('div');
    assert
      .dom(
        '[data-test-main-content] [data-test-consent] [data-test-consent-checkbox]'
      )
      .exists()
      .hasTagName('input')
      .hasAttribute('type', 'checkbox');
    assert
      .dom(
        '[data-test-main-content] [data-test-consent] [data-test-consent-label]'
      )
      .exists()
      .hasTagName('label')
      .hasText('I Accept the above mentioned clauses');

    assert
      .dom('[data-test-main-content] [data-test-authorize-button]')
      .exists()
      .hasTagName('button')
      .hasText('Authorize');

    assert
      .dom('[data-test-authorize-button]')
      .exists()
      .hasTagName('button')
      .hasClass('btn-disabled');
    assert
      .dom('[data-test-authorize-button]')
      .exists()
      .hasTagName('button')
      .doesNotHaveClass('btn-enabled');
    await click('[data-test-consent-checkbox]');
    assert
      .dom('[data-test-authorize-button]')
      .exists()
      .hasTagName('button')
      .hasClass('btn-enabled');
    assert
      .dom('[data-test-authorize-button]')
      .exists()
      .hasTagName('button')
      .doesNotHaveClass('btn-disabled');
  });
});
