import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') id;
  @attr('string') username;
  @attr('string') first_name;
  @attr('boolean') incompleteUserDetails;
}
