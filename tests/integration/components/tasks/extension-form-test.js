import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { tasks } from 'website-my/tests/fixtures/tasks';
import { extensionRequests } from 'website-my/tests/fixtures/extension-requests';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { waitForNode } from 'website-my/tests/helpers';

module('Integration | Component | Tasks Holder', function (hooks) {
  setupRenderingTest(hooks);
  let tasksData, extensionFormOpened;

  hooks.before(function () {
    tasksData = tasks;
    extensionFormOpened = true;
  });

  const toggleExtensionForm = (setter, name) => {
    extensionFormOpened = !extensionFormOpened;
    if (setter) {
      setter(name, extensionFormOpened);
    }
  };

  const closeExtensionForm = (setter, name) => () => {
    extensionFormOpened = false;
    if (setter) {
      setter(name, false);
    }
  };

  const closeExtensionModel = (setter, name) => (e) => {
    if (!e) {
      toggleExtensionForm(setter, name);
      return;
    }
    e.stopPropagation();
    if (e.target.classList.contains('extension-form__container-back')) {
      toggleExtensionForm(setter, name);
    }
  };

  test('When Clicked /"Close Form/" button or background task extension form should unmount', async function (assert) {
    this.set('task', tasksData[0]);
    this.set(
      'closeExtensionModel',
      closeExtensionModel(this.set, 'extensionFormOpened')
    );
    this.set(
      'closeExtensionForm',
      closeExtensionForm(this.set, 'extensionFormOpened')
    );
    this.set('extensionFormOpened', extensionFormOpened);

    await render(
      hbs`
      {{#if this.extensionFormOpened}}
      <Task::ExtensionForm
      @task={{this.task}}
      @closeForm={{this.closeExtensionForm}}
      @title='Form for extension Request'
      @closeModel={{this.closeExtensionModel}}
      />
      {{/if}}`
    );
    assert
      .dom(this.element.querySelector('[data-test-title]'))
      .hasText('Form for extension Request');
    await click(this.element.querySelector('.extension-form__container-close'));
    assert.dom(this.element.querySelector('[data-test-title]')).doesNotExist();

    extensionFormOpened = true;
    this.set('extensionFormOpened', extensionFormOpened);
    assert
      .dom(this.element.querySelector('[data-test-title]'))
      .hasText('Form for extension Request');
    await click(this.element.querySelector('.extension-form__container-back'));
    assert.dom(this.element.querySelector('[data-test-title]')).doesNotExist();
  });

  test('When no extension requests found, the option to create extension request should show and then later open form', async function (assert) {
    this.set('task', tasksData[3]);
    this.set(
      'closeExtensionModel',
      closeExtensionModel(this.set, 'extensionFormOpened')
    );
    this.set(
      'closeExtensionForm',
      closeExtensionForm(this.set, 'extensionFormOpened')
    );

    await render(
      hbs`<Task::ExtensionForm @task={{this.task}} @closeForm={{this.closeExtensionForm}} @title='Form for extension Request' @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitForNode('.extension-form__open-button');
    assert
      .dom(this.element.querySelector('.extension-form__open-button'))
      .hasText('Create an extension request');

    await click(this.element.querySelector('.extension-form__open-button'));
    assert
      .dom(
        this.element
          .querySelector('.extension-form__content')
          .querySelector('button[type=submit]')
      )
      .exists();
  });

  test('When no extension requests found, we should be able to create one', async function (assert) {
    this.set('task', tasksData[3]);
    this.set(
      'closeExtensionModel',
      closeExtensionModel(this.set, 'extensionFormOpened')
    );
    this.set(
      'closeExtensionForm',
      closeExtensionForm(this.set, 'extensionFormOpened')
    );

    await render(
      hbs`<Task::ExtensionForm @task={{this.task}} @closeForm={{this.closeExtensionForm}} @title='Form for extension Request' @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitForNode('.extension-form__open-button');
    assert
      .dom(this.element.querySelector('.extension-form__open-button'))
      .hasText('Create an extension request');

    await click(this.element.querySelector('.extension-form__open-button'));
    assert
      .dom(
        this.element
          .querySelector('.extension-form__content')
          .querySelector('button[type=submit]')
      )
      .exists();

    //create extension request
    await fillIn('input#reason', 'Testing');
    await fillIn('input#newEndsOn', '2030-12-31T02:43');
    await fillIn('input#title', 'TestingAgain');
    await click(this.element.querySelector('button[type=submit]'));

    //rendering the component again to check the new data
    await render(
      hbs`<Task::ExtensionForm @task={{this.task}} @closeForm={{this.closeExtensionForm}} @title='Form for extension Request' @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitForNode('.extension-info__content');
    assert
      .dom(this.element.querySelector('.extension-info__content'))
      .containsText('Testing')
      .containsText('TestingAgain')
      .containsText('PENDING');
  });

  test('When extension requests found, it should display the data', async function (assert) {
    let extensionRequestData = extensionRequests[0];
    this.set('task', tasksData[0]);
    this.set(
      'closeExtensionModel',
      closeExtensionModel(this.set, 'extensionFormOpened')
    );
    this.set(
      'closeExtensionForm',
      closeExtensionForm(this.set, 'extensionFormOpened')
    );

    await render(
      hbs`<Task::ExtensionForm @task={{this.task}} @closeForm={{this.closeExtensionForm}} @title='Form for extension Request' @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitForNode('.extension-info__content');
    assert
      .dom(this.element.querySelector('.extension-info__content'))
      .containsText(extensionRequestData['title'])
      .containsText(extensionRequestData['reason'])
      .containsText(extensionRequestData['status']);
  });
});
