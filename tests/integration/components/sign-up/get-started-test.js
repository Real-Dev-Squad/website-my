import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';

module('Integration | Component | sign-up/get-started', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders in get-started state', async function (assert) {
    assert.expect(5);

    this.set('changeRouteParams', function (paramValue) {
      this.isButtonDisabled = true;
      if (paramValue)
        this.transitionToRoute({ queryParams: { state: paramValue } });
    });
    this.set('state', 'get-started');

    await render(
      hbs`<SignUp::GetStarted @state={{this.state}} @changeRouteParams={{this.changeRouteParams}} />`
    );

    assert.equal(
      this.element.querySelector('.landing h2').textContent.trim(),
      'Thank you for connecting your GitHub!',
      'Correct Heading'
    );
    assert.equal(
      this.element.querySelector('.landing h3').textContent.trim(),
      'Please complete the signup in order to:',
      'Correct Subheading'
    );
    assert.equal(
      this.element.querySelectorAll('.landing ul li')[0].textContent.trim(),
      'Use Features',
      'Correct list item'
    );
    assert.equal(
      this.element.querySelectorAll('.landing ul li')[1].textContent.trim(),
      'Display yourself on the (members) page',
      'Correct list item'
    );
    assert.equal(
      this.element.querySelector('.get-started__btn button').textContent.trim(),
      'Get Started',
      'Correct button title'
    );
  });

  test('it renders in thankyou state', async function (assert) {
    assert.expect(3);

    this.set('changeRouteParams', function (paramValue) {
      this.isButtonDisabled = true;
      if (paramValue)
        this.transitionToRoute({ queryParams: { state: paramValue } });
    });
    this.set('state', 'thank-you');

    await render(
      hbs`<SignUp::GetStarted @state={{this.state}} @changeRouteParams={{this.changeRouteParams}} />`
    );

    assert.equal(
      this.element.querySelector('.landing h2').textContent.trim(),
      'Congratulations!',
      'Correct Heading'
    );
    assert.equal(
      this.element.querySelector('.landing h3').textContent.trim(),
      'Lets get you started on your journey',
      'Correct Subheading'
    );

    assert.equal(
      this.element.querySelector('.get-started__btn button').textContent.trim(),
      "Let's Go",
      'Correct button title'
    );
  });
});
