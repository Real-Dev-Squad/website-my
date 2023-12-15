import Component from '@glimmer/component';
import { TASK_KEYS } from 'website-my/constants/tasks';

export default class TaskTabsComponent extends Component {
  TASK_KEYS = TASK_KEYS;
  availabletaskTabsList = this.args.taskStatusList;

  get taskCardStatusList() {
    if (!this.args.dev) return this.availabletaskTabsList;
    const statusToRemove = [TASK_KEYS.VERIFIED,
      TASK_KEYS.RELEASED,
      TASK_KEYS.APPROVED,
      TASK_KEYS.COMPLETED,
      TASK_KEYS.NEEDS_REVIEW]
    const statusToDisplay = this.availabletaskTabsList.filter((taskStatus) => {
      !statusToRemove.includes(taskStatus.key)
    });
    return statusToDisplay;
  }
}
