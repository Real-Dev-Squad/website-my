import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | self-clear-cache', function (hooks) {
  setupRenderingTest(hooks);

  test('should render the component with relevant details', async function (assert) {
    this.setProperties({
      purgeCache: () => {},
      cacheTriggeredPending: 3,
      isCacheEnabled: true,
      isPurgingCache: false,
      lastUpdatedCacheRequest: '24 November, 1:23 PM IST',
    });

    await render(hbs`
        <SelfClearCache
          @totalTimes={{this.cacheTriggeredPending}}
          @onClearCache={{this.purgeCache}}
          @isPurgingCache={{this.isPurgingCache}}
          @cache={{this.isCacheEnabled}}
          @time={{this.lastUpdatedCacheRequest}}
        />
    `);

    assert
      .dom('[data-test-pending-requests]')
      .hasText(`3 / 3 requests remaining for today`);
    assert.dom('[data-test-btn-clear-cache]').hasText('Clear Cache');
    assert
      .dom('[data-test-last-time]')
      .hasText('Last Request: 24 November, 1:23 PM IST');
  });
});
