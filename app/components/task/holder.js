import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { TASK_PERCENTAGE } from '../../constants/tasks';

export default class TasksHolderComponent extends Component {
  @tracked percentCompleted = this.args.task.percentCompleted;
  TASK_KEYS = TASK_KEYS;
  availabletaskStatusList = TASK_STATUS_LIST;
  @tracked taskFields = {};

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
    this.onTaskChange('status', value);
  }

  @action onTaskChange(key, value) {
    this.taskFields[key] = value;
  }

  constructReqBody(object) {
    const requestBody = { ...object };
    const taskCompletionPercentage = object.percentCompleted;
    if (taskCompletionPercentage) {
      requestBody.percentCompleted = parseInt(taskCompletionPercentage);
    }
    return requestBody;
  }

  @action async handleUpdateTask(taskId) {
    this.args.updateLoader(true);
    const taskData = this.taskFields;
    const cleanBody = this.constructReqBody(taskData);
    if (taskData.status || taskData.percentCompleted) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/self/${taskId}`, {
          method: 'PATCH',
          body: JSON.stringify(cleanBody),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          alert('Task updated successfully!');
          const indexOfSelectedTask = this.args.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.args.allTasks[indexOfSelectedTask];
          const updatedTask = { ...selectedTask, ...cleanBody };
          this.args.allTasks[indexOfSelectedTask] = updatedTask;
          this.args.filterTasksByStatus();
        } else {
          alert('Failed to update the task');
        }
      } catch (err) {
        alert('Failed to update the task');
        console.error('Error : ', err);
      } finally {
        this.args.updateLoader(false);
      }
    }
  }
}
