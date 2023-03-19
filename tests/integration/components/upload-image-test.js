import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | image uploader', function (hooks) {
  setupRenderingTest(hooks);

  const file = new File(['dummy image data'], 'test-image.jpg', {
    type: 'image/jpeg',
  });

  test('it renders upload UI when no image is selected', async function (assert) {
    // Set upload url
    await render(hbs`
    <UploadImage @uploadUrl={{this.uploadUrl}}  @formKeyName = {{this.formDataKeyName}}/>
    `);
    const button = this.element.querySelector('.image-form__button');

    assert.dom('.drop-area').exists().hasNoClass('.drop-area__highlight');

    // Test handling of file input change event
    await triggerEvent('input[type="file"]', 'change', { files: [file] });

    assert.dom('.drop-area').doesNotExist();

    assert.notOk(
      button.classList.contains('image-form__button--disabled'),
      'Button has the "disabled" class'
    );
  });

  test('it renders crop UI when an image is selected', async function (assert) {
    await render(hbs`
      <UploadImage @uploadUrl={{this.uploadUrl}}  @formKeyName = {{this.formDataKeyName}}/>
      `);
    // ensure the component doesn't render the crop UI by default
    assert.dom('.image-cropper').doesNotExist();

    await triggerEvent('input[type="file"]', 'change', { files: [file] });

    assert.dom('.image-cropper').exists();
    assert.dom('[data-test-btn="back"]').exists();
    assert.dom('[data-test-btn="upload-image"]').exists();

    await click('[data-test-btn="upload-image"]');
    assert.ok(
      find('.fa-spinner'),
      'Spinner is displayed while uploading image '
    );
  });
});

// this.set('uploadUrl', 'http://localhost:3000/test');
// this.set('formDataKeyName', 'profile');
