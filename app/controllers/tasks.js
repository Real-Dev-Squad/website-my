import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import ENV from 'website-my/config/environment';
import TASK_STATUS from 'website-my/constants/tasks';

const API_BASE_URL = ENV.BASE_API_URL;
const { ACTIVE, BLOCKED, COMPLETED, PENDING } = TASK_STATUS;

export default class TasksController extends Controller {
  @tracked showDropDown = false;
  @tracked taskFields = {};
  @tracked allTasks = [
    {
      id: 'EORRbv7S0PDdJIygpSyF',
      purpose: 'testing of dark-mode',
      startedOn: 1640736000,
      assignee: 'akshay',
      title: 'Identity service /health data',
      endsOn: 1641254400,
      createdBy: 'ankush',
      status: 'active',
      isNoteworthy: true,
      type: 'feature',
      percentCompleted: 70,
    },
  ];
  // @tracked allTasks = this.model;

  @action toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  @tracked tasksByStatus = {};
  taskStatusList = [ACTIVE, BLOCKED, PENDING];

  filterTasksByStatus(allTasks, status) {
    return allTasks.filter((task) => task.status === status);
  }

  seperateTasksByStatus() {
    this.taskStatusList.forEach((status) => {
      this.tasksByStatus[status] = this.filterTasksByStatus(
        this.allTasks,
        status
      );
    });
  }

  cleanReqBody(object) {
    const cleanReqObj = {
      ...object,
      percentCompleted: parseInt(object.percentCompleted),
    };
    return cleanReqObj;
  }

  defaultTaskType = ACTIVE;
  @tracked tasksToShow = this.allTasks.filter(
    (task) => task.status === this.defaultTaskType
  );

  @action toggleTasks(taskType) {
    this.seperateTasksByStatus();
    this.tasksToShow = this.tasksByStatus[taskType];
  }

  @action onTaskChange(key, value) {
    this.taskFields[key] = value;
  }

  @action async handleUpdateTask(taskId) {
    const taskData = this.taskFields;
    if (taskData.status === COMPLETED) {
      taskData.percentCompleted = 100;
    }
    const cleanBody = this.cleanReqBody(taskData);
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

        const { status } = response;

        if (status === 204) {
          const indexOfSelectedTask = this.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasks[indexOfSelectedTask];
          const statusOfSelectedTask = selectedTask.status;

          if (taskData.status && taskData.status != selectedTask.status)
            set(selectedTask, 'status', taskData.status);
          if (
            taskData.percentCompleted &&
            taskData.percentCompleted != selectedTask.percentCompleted
          )
            set(selectedTask, 'percentCompleted', taskData.percentCompleted);

          this.toggleTasks(statusOfSelectedTask);
        }
      } catch (err) {
        console.error('Error : ', err);
      }
    }
  }
}
