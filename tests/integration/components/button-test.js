import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | button', function(hooks) {
  setupRenderingTest(hooks);

  test('It renders with arguments', async function(assert) {
    assert.expect(2);

    this.set('buttonText', 'Click me');

    this.set('onClick', () => {
      assert.ok(true, 'Closure action after click on item was executed.');
    });

    await render(hbs`<Button @text={{buttonText}} @onClick={{onClick}} />`);

    assert.equal('[data-test-button]', 'Click me', 'Button has correct text.');

    await click('[data-test-button]');
  });
});
