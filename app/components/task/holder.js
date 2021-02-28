import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TasksHolderComponent extends Component {
  @action
  onPercentageChange(e) {
    const { value } = e.target;
    this.args.onChange('percentCompleted', value);
  }

  @action
  onStatusChange(e) {
    const { value } = e.target;
    this.args.onChange('status', value);
  }

  availablePercentOptions = [20, 40, 60, 80];

  availableStatusOptions = ['active', 'pending', 'blocked', 'completed']
}