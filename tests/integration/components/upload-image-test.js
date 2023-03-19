import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | image uploader', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders upload UI when no image is selected', async function (assert) {
    // Set upload url
    await render(hbs`
    <UploadImage @uploadUrl={{this.uploadUrl}}  @formKeyName = {{this.formDataKeyName}}/>
    `);
    const button = this.element.querySelector('.image-form__button');

    // Test handling of file input change event
    const file = new File(['dummy image data'], 'test-image.jpg', {
      type: 'image/jpeg',
    });

    assert.dom('.drop-area').exists().hasNoClass('.drop-area__highlight');

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

    const file = new File(['dummy image data'], 'test-image.jpg', {
      type: 'image/jpeg',
    });

    await triggerEvent('input[type="file"]', 'change', { files: [file] });

    assert.dom('.image-cropper').exists();
    assert.dom('[data-test-btn="back"]').exists();
    assert.dom('[data-test-btn="upload-image"]').exists();

    await click('[data-test-btn="upload-image"]');
    assert.dom('.fa-spinner').exists();
  });
});

// this.set('uploadUrl', 'http://localhost:3000/test');
// this.set('formDataKeyName', 'profile');
