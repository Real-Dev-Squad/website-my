import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserStatusService extends Service {
  @tracked currentUserStatus = '';

  @action updateCurrentUserStatus(status) {
    this.currentUserStatus = status;
  }

  @action getCurrentUserStatus() {
    return this.currentUserStatus;
  }
}
