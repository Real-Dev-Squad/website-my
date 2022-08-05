import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | signup flow', function(hooks) {

  setupApplicationTest(hooks);

  test('http://localhost:4200/signup', async function(assert) {
    const fields = {
      first_name:"test",
      last_name:'user',
      username:'test-user',
      email:'test@user.com',
      yoe:'0',
      company:'rds',
      designation:'demo',
      linkedin_id:'demo@linkedin',
      instagram_id:'demo@insta',
      twitter_id:'demo@twitter',
      website:'test.com'
    }
    
    const originalWindowAlert = window.alert;
    window.alert = function() { return true;}
    await visit('/signup');  
    assert.equal(currentURL(), '/signup');
    assert.dom('[data-test-id="signup-button-disabled"]').exists()
    assert.dom('[data-test-id="signup-button"]').doesNotExist()

    for(let field in fields){

      await fillIn(`[data-test-id="form-input-${field}"]`,fields[field])
    }
    
    assert.dom('[data-test-id="form-input-first_name"]').hasProperty('value','test')
    assert.dom('[data-test-id="form-input-last_name"]').hasProperty('value','user')

    assert.dom('[data-test-id="signup-button-disabled"]').doesNotExist()
    assert.dom('[data-test-id="signup-button"]').exists()

    await this.pauseTest()
    window.alert = originalWindowAlert;
  
  });
});




