import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import {
  WARNING_MESSAGE_FOR_IDLE,
  WARNING_MESSAGE_FOR_OOO,
  WARNING_MESSAGE_FOR_FROM_FIELD,
  WARNING_MESSAGE_FOR_UNTIL_FIELD,
  USER_STATES,
  WARNING_FROM_DATE_EXCEEDS_UNTIL_DATE,
} from '../constants/user-status';

export default class FormStatusModal extends Component {
  @service toast;
  @tracked currentStatus;
  @tracked newStatus;
  @tracked fromDate = '';
  @tracked untilDate = '';
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
  async getCurrentStatusObj() {
    let from;
    let until;
    if (!this.fromDate) {
      this.toast.error(
        WARNING_MESSAGE_FOR_FROM_FIELD,
        '',
        toastNotificationTimeoutOptions
      );
      return;
    }
    if (this.fromDate) {
      from = new Date(this.fromDate.replaceAll('-', ',')).getTime();
    }
    if (this.args.newStatus === USER_STATES.OOO) {
      if (!this.untilDate) {
        this.toast.error(
          WARNING_MESSAGE_FOR_UNTIL_FIELD,
          '',
          toastNotificationTimeoutOptions
        );
        return;
      }
      if (this.untilDate < this.fromDate) {
        this.toast.error(
          WARNING_FROM_DATE_EXCEEDS_UNTIL_DATE,
          '',
          toastNotificationTimeoutOptions
        );
        return;
      }
      if (this.untilDate) {
        until = new Date(this.untilDate.replaceAll('-', ',')).getTime();
      }
    }
    if (this.args.newStatus !== USER_STATES.ACTIVE) {
      const warningMessage =
        this.args.newStatus === USER_STATES.IDLE
          ? WARNING_MESSAGE_FOR_IDLE
          : WARNING_MESSAGE_FOR_OOO;
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
    await this.args.updateStatus({ currentStatus: newStateObj });
    this.resetInputFields();
  }

  @action
  resetInputFields() {
    this.fromDate = '';
    this.untilDate = '';
    this.reason = '';
  }

  @action
  onCancelModal() {
    this.resetInputFields();
    this.args.toggleUserStateModal();
  }
}
