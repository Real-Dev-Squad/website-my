import Component from '@glimmer/component';
import { action } from '@ember/object';
import TASK_STATUS from 'website-my/constants/tasks';
// import { hidden } from '../../../node_modules/ansi-colors/types/index';

const { ACTIVE, BLOCKED, COMPLETED, PENDING } = TASK_STATUS;

export default class TasksHolderComponent extends Component {
  @action
  onPercentageChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('percentCompleted', value);
  }

  @action
  onStatusChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('status', value);
  }

  availablePercentOptions = [25, 50, 75, 100];

  availableStatusOptions = [ACTIVE, BLOCKED, COMPLETED, PENDING];
}
