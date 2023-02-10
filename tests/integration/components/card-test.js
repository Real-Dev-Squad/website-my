import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the card component', async function (assert) {
    await render(hbs`<Card />`);

    assert.dom('.card').exists();
    assert.dom('.card').hasNoText();
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

    assert.dom('.card').exists();
    assert.dom('.card .card__header').exists();
    assert.dom('.card .card__header').hasText(this.title);
    assert.dom('.card .card__description').exists();
    assert.dom('.card .card__description').includesText(this.description);
    assert.dom('.card .card__actions').exists();
    assert.dom('.card .card__actions .card__button').exists();
    assert.dom('.card .card__actions').includesText(this.buttonText);

    await click('button.card__button');
    assert.equal(
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

    assert.dom('.card__header h2').hasText(this.title);
    assert.dom('.card__description p').hasText(this.description);
    assert.dom('.card .card__actions .card__button').doesNotExist();
    assert.dom('.card .card__actions').hasText(this.content);
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
    assert.dom('.card__description').hasText(this.description);
    assert
      .dom('.card__description p strong')
      .exists(
        { count: 2 },
        'Two strong elements are present in the description'
      );
  });
});
