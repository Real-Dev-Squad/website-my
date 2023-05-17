import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | image uploader', function (hooks) {
  setupRenderingTest(hooks);

  const file = new File(['dummy image data'], '/public/RDSLogo.png', {
    type: 'image/jpeg',
  });

  test('it renders upload UI when no image is selected', async function (assert) {
    // Set upload url
    await render(hbs`
    <UploadImage @uploadUrl={{this.uploadUrl}}  @formKeyName = {{this.formDataKeyName}}/>
    `);

    assert
      .dom('[data-test-drop-area]')
      .exists()
      .hasNoClass('.drop-area__highlight');

    // Test handling of file input change event
    await triggerEvent('input[type="file"]', 'change', { files: [file] });

    assert.dom('[data-test-drop-area]').doesNotExist();
  });

  test('it renders crop UI when an image is selected', async function (assert) {
    this.set('uploadUrl', `https://api.realdevsquad.com/users/picture`);
    this.set('formDataKeyName', 'profile');
    await render(hbs`
      <UploadImage @uploadUrl={{this.uploadUrl}}  @formKeyName = {{this.formDataKeyName}}/>
      `);
    // ensure the component doesn't render the crop UI by default
    assert.dom('[data-test-image-cropper]').doesNotExist();

    await triggerEvent('input[type="file"]', 'change', { files: [file] });

    assert.dom('[data-test-image-cropper]').exists();
    assert.dom('[data-test-btn="back"]').exists();
    assert.dom('[data-test-btn="upload-image"]').exists();

    await click('[data-test-btn="upload-image"]');

    assert.ok(
      find('.fa-spinner'),
      'Spinner is displayed while uploading image '
    );
  });
});
