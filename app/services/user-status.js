import Service from '@ember/service';

export default class UserStatusService extends Service {
  currentUserStatus = '';

  updateCurrentUserStatus(status) {
    this.currentUserStatus = status;
  }

  getCurrentUserStatus() {
    return this.currentUserStatus;
  }
}
