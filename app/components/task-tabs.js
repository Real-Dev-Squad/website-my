import Component from '@glimmer/component';
import { TASK_KEYS } from 'website-my/constants/tasks';

export default class TaskTabsComponent extends Component {
  TASK_KEYS = TASK_KEYS;
  availabletaskTabsList = this.args.taskStatusList;

  get taskCardStatusList() {
    const statusToDisplay = this.availabletaskTabsList.filter((taskStatus) => {
      if (this.args.dev === true) {
        if (
          taskStatus.key !== TASK_KEYS.VERIFIED &&
          taskStatus.key !== TASK_KEYS.RELEASED &&
          taskStatus.key !== TASK_KEYS.APPROVED &&
          taskStatus.key !== TASK_KEYS.COMPLETED &&
          taskStatus.key !== TASK_KEYS.NEEDS_REVIEW
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return taskStatus;
      }
    });
    return statusToDisplay;
  }
}
