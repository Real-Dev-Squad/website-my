import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { tracked } from '@glimmer/tracking';
import { TASK_PERCENTAGE } from '../../constants/tasks';

export default class TasksHolderComponent extends Component {
  @tracked percentCompleted = this.args.task.percentCompleted;
  @tracked extensionFormOpened = false;

  TASK_KEYS = TASK_KEYS;
  availabletaskStatusList = TASK_STATUS_LIST;

  get taskStyleClass() {
    if (
      this.args.task.endsOn * 1000 < Date.now() &&
      this.args.task.status !== TASK_KEYS.VERIFIED
    ) {
      return 'task-late';
    } else return '';
  }

  get progressBarClass() {
    if (this.args.task.endsOn * 1000 < Date.now()) {
      return 'progress-bar-late';
    }
    if (this.percentCompleted === 100) {
      return 'progress-bar-completed';
    }

    return 'progress-bar-on-time';
  }

  @action
  onPercentageChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('percentCompleted', value);
    if (value === TASK_PERCENTAGE.completedPercentage) {
      this.percentCompleted = this.args.task.percentCompleted;
    }
  }

  @action
  onStatusChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('status', value);
  }

  @action
  toggleExtensionForm() {
    this.extensionFormOpened = !this.extensionFormOpened;
  }

  @action
  closeExtensionForm() {
    this.extensionFormOpened = false;
  }

  @action
  closeExtensionModel(e) {
    if (!e) {
      this.toggleExtensionForm(e);
      return;
    }
    e.stopPropagation();
    if (e.target.classList.contains('extension-form__container-back')) {
      this.toggleExtensionForm(e);
    }
  }
}
