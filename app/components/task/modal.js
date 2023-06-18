import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import {
  USER_STATES,
  WARNING_MESSAGE_FOR_IDLE,
} from '../../constants/user-status';
import { getUTCMidnightTimestampFromDate } from '../../utils/date-conversion';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';

export default class TasksModalComponent extends Component {
  @service toast;
  @service userStatus;

  @tracked reason = '';

  @action handleInput(event) {
    const { value } = event.target;
    this.reason = value;
  }

  @action async markStatusChange() {
    let from;
    let until;
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10);
    from = getUTCMidnightTimestampFromDate(currentDateString);

    if (!this.reason.length) {
      this.toast.error(
        WARNING_MESSAGE_FOR_IDLE,
        '',
        toastNotificationTimeoutOptions
      );
      return;
    }

    const updatedAt = Date.now();
    const newStateObj = {
      updatedAt,
      from,
      until,
      message: this.reason,
      state: USER_STATES.IDLE,
    };

    this.args.updateModalPropertiesOnStatusChange();
    await this.args.updateStatus({ currentStatus: newStateObj });
    this.args.updateModalProperties();
  }
}
