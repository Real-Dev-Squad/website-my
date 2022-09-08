import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';

module('Integration | Component | sign-up/info', function (hooks) {
  setupRenderingTest(hooks);

  test('it render info component with state get started', async function (assert) {
    assert.expect(4);
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
      currentStep: 'get-started',
    });
    await render(hbs`
      <NewSignup::Info
        @onClick={{this.onClick}}
        @currentStep={{this.currentStep}}
      />
    `);
    assert.dom('.landing').exists();
    assert
      .dom('.landing__main-heading')
      .hasText('Thank you for connecting your GitHub!');
    assert
      .dom('.landing__sub-heading')
      .hasText('Please complete the signup in order to:');

    assert.dom('.get-started__btn').hasText('Get Started');
  });

  test('it renders info component with currentStep thank-you', async function (assert) {
    assert.expect(4);
    this.setProperties({
      onClick: function () {},
      currentStep: 'thank-you',
    });

    await render(hbs`
      <NewSignup::Info
        @onClick={{this.onClick}}
        @currentStep={{this.currentStep}}
      />
    `);

    assert.dom('.landing').exists();
    assert.dom('.landing__main-heading').hasText('Congratulations!');
    assert
      .dom('.landing__sub-heading')
      .hasText('Lets get you started on your journey');
    assert.dom('.get-started__btn').hasText("Let's Go");
  });

  test('two list items should be there if current state is get-started', async function (assert) {
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
      currentStep: 'get-started',
    });
    await render(hbs`
      <NewSignup::Info
        @onClick={{this.onClick}}
        @currentStep={{this.currentStep}}
      />
    `);

    assert.dom('[data-test-li1]').exists();
    assert.dom('[data-test-li2]').exists();
  });
});
