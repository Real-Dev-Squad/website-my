import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import {
  warningMessageForIdle,
  warningMessageForOOO,
  warningMessageForFromField,
  warningMessageForUntilField,
  userStates,
} from '../constants/user-status';

export default class FormStatusModal extends Component {
  @service toast;
  @tracked currentStatus;
  @tracked newStatus;
  @tracked fromDate;
  @tracked untilDate;
  @tracked reason = '';

  @action
  updateValue(event) {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      this.fromDate = value;
    } else if (name === 'untilDate') {
      this.untilDate = value;
    } else if (name === 'reason') {
      this.reason = value;
    }
  }

  @action
  getCurrentStatusObj() {
    let from;
    let until;
    if (!this.fromDate) {
      this.toast.error(
        warningMessageForFromField,
        '',
        toastNotificationTimeoutOptions
      );
      return;
    }
    if (this.fromDate) {
      from = new Date(this.fromDate.replaceAll('-', ',')).getTime();
    }
    if (this.args.newStatus === userStates.ooo) {
      if (!this.untilDate) {
        this.toast.error(
          warningMessageForUntilField,
          '',
          toastNotificationTimeoutOptions
        );
        return;
      }
      if (this.untilDate) {
        until = new Date(this.untilDate.replaceAll('-', ',')).getTime();
      }
    }
    if (this.args.newStatus !== userStates.active) {
      const warningMessage =
        this.args.newStatus === userStates.idle
          ? warningMessageForIdle
          : warningMessageForOOO;
      if (!this.reason.length) {
        this.toast.error(warningMessage, '', toastNotificationTimeoutOptions);
        return;
      }
    }
    const updatedAt = Date.now();
    const newStateObj = {
      updatedAt,
      from,
      until,
      message: this.reason,
      state: this.args.newStatus,
    };
    this.args.updateStatus({ currentStatus: newStateObj });
  }
}
