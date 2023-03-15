import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { tasks } from 'website-my/tests/fixtures/tasks';
import { extensionRequests } from 'website-my/tests/fixtures/extension-requests';
import { render, click, fillIn, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import makeServer from 'website-my/mirage/config';

module('Integration | Component | Extension Request Form', function (hooks) {
  setupRenderingTest(hooks);
  let tasksData, extensionFormOpened, server;

  hooks.after(function () {
    server.shutdown();
  });

  hooks.before(function () {
    tasksData = tasks;
    extensionFormOpened = true;
    server = makeServer({ environment: 'test' });
    extensionRequests.forEach((obj) => {
      server.create('extensionRequest', obj);
    });
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
    await click(
      this.element.querySelector('[data-test-extension-form-container-close]')
    );
    assert.dom(this.element.querySelector('[data-test-title]')).doesNotExist();

    extensionFormOpened = true;
    this.set('extensionFormOpened', extensionFormOpened);
    assert
      .dom(this.element.querySelector('[data-test-title]'))
      .hasText('Form for extension Request');
    await click(
      this.element.querySelector('[data-test-extension-form-container-back]')
    );
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
      hbs`<Task::ExtensionForm 
      @task={{this.task}} 
      @closeForm={{this.closeExtensionForm}} 
      @title='Form for extension Request' 
      @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitFor('[data-test-create-extension-button]');
    assert
      .dom(this.element.querySelector('[data-test-create-extension-button]'))
      .hasText('Create an extension request');

    await click(
      this.element.querySelector('[data-test-create-extension-button]')
    );
    assert
      .dom(
        this.element
          .querySelector('[data-test-extension-from-content]')
          .querySelector('button[type=submit]')
      )
      .exists();
  });

  test('When creating extension request, if the newEndsOn is smaller than the oldEndsOn then should throw error', async function (assert) {
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
      hbs`<Task::ExtensionForm 
      @task={{this.task}} 
      @closeForm={{this.closeExtensionForm}} 
      @title='Form for extension Request' 
      @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitFor('[data-test-create-extension-button]');
    assert
      .dom(this.element.querySelector('[data-test-create-extension-button]'))
      .hasText('Create an extension request');

    await click(
      this.element.querySelector('[data-test-create-extension-button]')
    );
    assert
      .dom(
        this.element
          .querySelector('[data-test-extension-from-content]')
          .querySelector('button[type=submit]')
      )
      .exists();

    await fillIn(
      '[data-test-extension-form-newEndsOn-input]',
      '2022-09-09T09:45'
    );
    assert
      .dom(this.element.querySelector('[data-test-extension-from-error]'))
      .hasText(
        'Error: The newEndsOn value cannot be smaller than the oldEndsOn value'
      );

    // if filled valid time then remove the error
    await fillIn(
      '[data-test-extension-form-newEndsOn-input]',
      '2023-09-09T09:45'
    );
    assert
      .dom(this.element.querySelector('[data-test-extension-from-error]'))
      .doesNotExist();
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
      hbs`<Task::ExtensionForm 
      @task={{this.task}} 
      @closeForm={{this.closeExtensionForm}} 
      @title='Form for extension Request' 
      @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitFor('[data-test-create-extension-button]');
    assert
      .dom(this.element.querySelector('[data-test-create-extension-button]'))
      .hasText('Create an extension request');

    await click(
      this.element.querySelector('[data-test-create-extension-button]')
    );
    assert
      .dom(
        this.element
          .querySelector('[data-test-extension-from-content]')
          .querySelector('button[type=submit]')
      )
      .exists();

    //create extension request
    await fillIn('[data-test-extension-form-reason-input]', 'Testing');
    await fillIn(
      '[data-test-extension-form-newEndsOn-input]',
      '2030-12-31T02:43'
    );
    await fillIn('[data-test-extension-form-title-input]', 'TestingAgain');
    await click(this.element.querySelector('button[type=submit]'));

    // rendering the component again to check the new data
    await render(
      hbs`<Task::ExtensionForm 
      @task={{this.task}} 
      @closeForm={{this.closeExtensionForm}} 
      @title='Form for extension Request' 
      @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitFor('[data-test-extension-info-content]');
    assert
      .dom(this.element.querySelector('[data-test-extension-info-content]'))
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
      hbs`<Task::ExtensionForm 
      @task={{this.task}} 
      @closeForm={{this.closeExtensionForm}} 
      @title='Form for extension Request' 
      @closeModel={{this.closeExtensionModel}}/>`
    );
    await waitFor('[data-test-extension-info-content]');
    assert
      .dom(this.element.querySelector('[data-test-extension-info-content]'))
      .containsText(extensionRequestData['title'])
      .containsText(extensionRequestData['reason'])
      .containsText(extensionRequestData['status']);
  });
});
