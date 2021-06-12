import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sign-up/get-started', function (hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SignUp::GetStarted />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <SignUp::GetStarted>
        template block text
      </SignUp::GetStarted>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
