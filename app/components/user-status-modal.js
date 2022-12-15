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
  @tracked fromDate = '';
  @tracked untilDate = '';
  @tracked reason = '';
  @tracked disableSubmitButton = true;
  @tracked disableDatesPrior = new Date().toJSON().slice(0, 10);

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
    this.checkSubmitBttnState();
  }

  @action
  async getCurrentStatusObj() {
    let from;
    let until;
    if (this.args.newStatus === USER_STATES.OOO) {
      if (!this.fromDate) {
        this.toast.error(
          WARNING_MESSAGE_FOR_FROM_FIELD,
          '',
          toastNotificationTimeoutOptions
        );
        return;
      }
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
      from = new Date(this.fromDate.replaceAll('-', ',')).getTime();
      until = new Date(this.untilDate.replaceAll('-', ',')).getTime();
      const isReasonReq = !this.checkIfFromToDatesAreClose();

      if (isReasonReq && !this.reason.length) {
        this.toast.error(
          WARNING_MESSAGE_FOR_OOO,
          '',
          toastNotificationTimeoutOptions
        );
        return;
      }
    } else if (this.args.newStatus === USER_STATES.IDLE) {
      from = Date.now();
      if (!this.reason.length) {
        this.toast.error(
          WARNING_MESSAGE_FOR_IDLE,
          '',
          toastNotificationTimeoutOptions
        );
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
  handleInput(event) {
    const { value } = event.target;
    this.reason = value;
    this.checkSubmitBttnState();
  }

  @action
  checkSubmitBttnState() {
    this.disableSubmitButton = true;
    if (this.args.newStatus === USER_STATES.OOO) {
      if (this.checkIfFromToDatesAreClose()) {
        this.disableSubmitButton = false;
      } else if (
        this.fromDate !== '' &&
        this.untilDate !== '' &&
        this.reason !== ''
      ) {
        this.disableSubmitButton = false;
      }
    } else if (this.args.newStatus === USER_STATES.IDLE) {
      if (this.reason !== '') {
        this.disableSubmitButton = false;
      }
    }
  }

  @action
  checkIfFromToDatesAreClose() {
    if (this.fromDate && this.untilDate) {
      let from = new Date(this.fromDate.replaceAll('-', ',')).getTime();
      let until = new Date(this.untilDate.replaceAll('-', ',')).getTime();
      const timeGap = until - from;
      // 172800000 is the no of milli seconds in 3 days. as reason field is not mandatory if its less than 3 days
      return timeGap <= 172800000;
    }
    return false;
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
