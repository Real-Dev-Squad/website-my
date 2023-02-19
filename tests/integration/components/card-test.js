import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the card component', async function (assert) {
    await render(hbs`<Card />`);

    assert.dom('[data-test-card]').exists();
    assert.dom('[data-test-card]').hasNoText();
  });

  test('it renders information about a profile service and validates is buttonOnClick function called', async function (assert) {
    let callCount = 0;
    this.setProperties({
      title: 'Qualification Criteria',
      description:
        'To update your profile details, link your profile service URL with RealDevSquad Service.',
      buttonText: 'Get Started',
      onButtonClickEventHandler: () => {
        ++callCount;
      },
    });

    await render(
      hbs`<Card 
      @title={{this.title}} 
      @description={{this.description}}
      @buttonText={{this.buttonText}}
      @onButtonClickEventHandler={{this.onButtonClickEventHandler}}
      />`
    );

    assert.dom('[data-test-card]').exists();
    assert.dom('[data-test-card-title]').exists();
    assert
      .dom('[data-test-card-title]')
      .hasText(this.title, 'The user sees the correct title');
    assert.dom('[data-test-card-description]').exists();
    assert
      .dom('[data-test-card-description]')
      .includesText(
        this.description,
        'The user sees the correct card description'
      );
    assert.dom('[data-test-card-actions]').exists();
    assert.dom('[data-test-card-button]').exists();
    assert
      .dom('[data-test-card-actions]')
      .includesText(this.buttonText, 'The user sees the correct card button');

    await click('[data-test-card-button]');
    assert.strictEqual(
      callCount,
      1,
      'The onButtonClickEventHandler function was called once'
    );
  });

  test('it renders child components', async function (assert) {
    this.setProperties({
      title: 'Test title',
      description: 'Test description',
      content: 'My content',
    });
    await render(
      hbs`<Card       
      @title={{this.title}} 
      @description={{this.description}}
    >
    {{this.content}}
    </Card>`
    );

    assert
      .dom('[data-test-card-title]')
      .hasText(this.title, 'The user sees the correct title');
    assert
      .dom('[data-test-card-description]')
      .hasText(this.description, 'The user sees the correct card description');
    assert.dom('[data-test-card-button]').doesNotExist();
    assert
      .dom('[data-test-card-actions]')
      .hasText(
        this.content,
        'The user sees the correct content passed onto card'
      );
  });

  test('it renders formatted description', async function (assert) {
    this.setProperties({
      description:
        'To <>update</> your profile <>details</>, link your profile service URL with RealDevSquad Service.',
    });
    await render(
      hbs`<Card       
      @description={{this.description}}
    />`
    );
    assert
      .dom('[data-test-card-description-highlighted-text]')
      .exists(
        { count: 2 },
        'Two strong elements are present in the description'
      );
  });
});
