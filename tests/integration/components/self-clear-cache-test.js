import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const EPOCH_TIMESTAMP = 1626242030;
const HUMAN_TIME = ' July 13, 2021 10:53:50 PM IST';
const CACHE_CLEAR_CLICKED = 'CACHE_CLEAR_CLICKED';

module('Integration | Component | self-clear-cache', (hooks) => {
  setupRenderingTest(hooks);

  skip('it shows last time user cleared the cache', async function (assert) {
    assert.expect(1);

    // Assemble
    this.set('lastTime', EPOCH_TIMESTAMP);

    await render(hbs`<SelfClearCache @lastClearedOn={{this.lastTime}} />`);

    // Assert
    assert.dom('[data-test-last-time]').hasText(HUMAN_TIME);
  });

  skip('it triggers cache clear on button click', async function (assert) {
    assert.expect(1);

    // Assemble
    this.set('lastTime', EPOCH_TIMESTAMP);

    this.set('onCacheClear', function () {
      assert.step(CACHE_CLEAR_CLICKED);
    });

    await render(hbs`
      <SelfClearCache
        @lastClearedOn={{this.lastTime}}
        @onCacheClear={{this.onCacheClear}}
      />
    `);

    // Act
    const btn = find('[data-test-btn-clear-cache]');
    await click(btn);

    // Assert
    assert.verifySteps([CACHE_CLEAR_CLICKED]);
  });

  skip('it disables button after a click', async function (assert) {
    assert.expect(1);

    // Assemble
    this.set('lastTime', EPOCH_TIMESTAMP);

    this.set('onCacheClear', function () {
      assert.step(CACHE_CLEAR_CLICKED);
    });

    await render(hbs`
      <SelfClearCache
        @lastClearedOn={{this.lastTime}}
        @onCacheClear={{this.onCacheClear}}
      />
    `);

    // Act
    const btn = find('[data-test-btn-clear-cache]');
    await click(btn);
    await click(btn); // Another click -- This should not fire

    // Assert
    assert.verifySteps([CACHE_CLEAR_CLICKED]);
  });

  skip('it shows the number of times cache has already been cleared', async function (assert) {
    assert.expect(1);

    // Assemble
    this.set('lastTime', EPOCH_TIMESTAMP);
    this.set('totalTimes', 2);
    this.set('allowedLimit', 3);

    await render(hbs`
      <SelfClearCache
        @time={{this.lastTime}} 
        @countCleared={{this.totalTimes}}
        @allowedLimit={{this.allowedLimit}}
      />
    `);

    // Assert
    assert.dom('[data-test-pending-requests]').hasText('2 / 3');
  });

  skip('it disables the button if already reached allowed limit', async function (assert) {
    assert.expect(2);

    // Assemble
    this.set('lastTime', EPOCH_TIMESTAMP);
    this.set('totalTimes', 3);
    this.set('allowedLimit', 3);

    this.set('onCacheClear', function () {
      assert.step(CACHE_CLEAR_CLICKED);
    });

    await render(hbs`
      <SelfClearCache
        @time={{this.lastTime}} 
        @countCleared={{this.totalTimes}}
        @allowedLimit={{this.allowedLimit}}
        @onCacheClear={{this.onCacheClear}}
      />
    `);

    // Act
    const btn = find('[data-test-btn-clear-cache]');
    await click(btn);

    // Assert
    assert.verifySteps([]);
  });
});
