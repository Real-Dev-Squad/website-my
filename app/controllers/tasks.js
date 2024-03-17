import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import {
  TASK_KEYS,
  TASK_STATUS_LIST,
  TABS_TASK_STATUS_LIST,
} from 'website-my/constants/tasks';
import { TASK_MESSAGES, TASK_PERCENTAGE } from '../constants/tasks';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksController extends Controller {
  queryParams = ['dev'];
  @service toast;
  @service featureFlag;
  TASK_KEYS = TASK_KEYS;
  taskStatusList = TASK_STATUS_LIST;
  tabsTaskStatusList = TABS_TASK_STATUS_LIST;
  allTasksObject = this.taskStatusList.find(
    (obj) => obj.key === this.TASK_KEYS.ALL
  );
  DEFAULT_TASK_TYPE = this.allTasksObject;

  @tracked dev = false;
  @tracked isUpdating = false;
  @tracked assignTask = false;
  @tracked closeDisabled = false;
  @tracked showDropDown = true;
  @tracked taskFields = {};
  @tracked allTasks = this.model;
  @tracked userSelectedTask = this.DEFAULT_TASK_TYPE;
  @tracked showModal = false;
  @tracked tempTaskId = ''; // this Id will be used to update task which are completed 100%
  @tracked message = ''; // required in the modal
  @tracked buttonRequired = false;
  @tracked disabled = false;
  @tracked findingTask = false;
  @tracked showTasks = false;
  @tracked showFetchButton = this.isShowFetchButton() && !this.alreadyFetched;
  alreadyFetched = localStorage.getItem('already-fetched');
  resetCurrentTask = null;
  get isDevMode() {
    return this.featureFlag.isDevMode;
  }

  @action toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  isShowFetchButton() {
    const inProgressTasks = this.model.filter(
      (task) => task.status === 'IN_PROGRESS'
    );
    const assignedTask = this.model.filter(
      (task) => task.status === 'ASSIGNED'
    );
    return inProgressTasks.length === 0 && assignedTask.length === 0;
  }

  setShowFetchButton() {
    this.showFetchButton = this.isShowFetchButton();
  }

  async setTasksToShow() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/self`, {
        credentials: 'include',
      });
      const data = await response.json();
      this.tasksToShow = data;
    } catch {
      this.toast.error(
        'Failed to fetch your tasks',
        '',
        toastNotificationTimeoutOptions
      );
    }
  }

  @tracked tasksByStatus = {};

  filterTasksByStatus() {
    if (this.userSelectedTask.key === this.allTasksObject.key) {
      this.tasksToShow = this.allTasks;
    } else {
      this.tasksToShow = this.allTasks.filter(
        (task) => task.status === this.userSelectedTask.key
      );
    }
  }

  constructReqBody(object) {
    const requestBody = { ...object };
    const taskCompletionPercentage = object.percentCompleted;
    if (taskCompletionPercentage) {
      if (
        taskCompletionPercentage === TASK_PERCENTAGE.completedPercentage &&
        !this.dev
      ) {
        requestBody.status = 'COMPLETED';
      }
      requestBody.percentCompleted = parseInt(taskCompletionPercentage);
    }
    return requestBody;
  }
  getTaskById(taskId) {
    const indexOfSelectedTask = this.allTasks.findIndex(
      (task) => task.id === taskId
    );
    const selectedTask = this.allTasks[indexOfSelectedTask];
    return selectedTask;
  }
  @action goBack() {
    this.showModal = false;
    this.onTaskChange('percentCompleted', '75');
  }

  @action markComplete() {
    this.updateTask(this.tempTaskId);
    this.message = TASK_MESSAGES.UPDATE_TASK;
    this.isUpdating = true;
    this.closeDisabled = true;
  }

  @action markCompleteAndAssignTask() {
    this.assignTask = true;
    this.message = TASK_MESSAGES.UPDATE_TASK;
    this.isUpdating = true;
    this.updateTask(this.tempTaskId);
    this.closeDisabled = true;
  }

  @action changeUserSelectedTask(statusObject) {
    this.userSelectedTask = statusObject;
    this.filterTasksByStatus();
    if (this.showTasks) this.showTasks = false;
  }

  @action toggleTasks() {
    this.showTasks = !this.showTasks;
  }
  @tracked tasksToShow = this.allTasks;

  @action onTaskChange(key, value) {
    for (let prop in this.taskFields) {
      delete this.taskFields[prop];
    }
    this.taskFields[key] = value;
    if (this.resetCurrentTask) {
      this.resetCurrentTask();
    }
  }

  @action async updateTask(taskId) {
    this.disabled = true;
    this.buttonRequired = false;
    const taskData = this.taskFields;
    const cleanBody = this.constructReqBody(taskData);

    if (taskData.status || taskData.percentCompleted) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/tasks/self/${taskId}?userStatusFlag=true`,
          {
            method: 'PATCH',
            body: JSON.stringify(cleanBody),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (response.ok) {
          this.toast.success('Successfully updated the task', '', {
            timeOut: '3000',
            extendedTimeOut: '0',
            preventDuplicates: false,
          });
          const res = await response.json();
          const { message } = res;
          this.message = message;
          const indexOfSelectedTask = this.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasks[indexOfSelectedTask];
          const updatedTask = { ...selectedTask, ...cleanBody };
          this.allTasks[indexOfSelectedTask] = updatedTask;
          this.filterTasksByStatus();
          if (this.assignTask === true) {
            this.handleAssingnmentAfterUpdate();
          } else {
            this.isUpdating = false;
            this.closeDisabled = false;
            this.setShowFetchButton();
          }
        } else {
          this.toast.error(
            'Failed to update the task',
            '',
            toastNotificationTimeoutOptions
          );
          this.disabled = false;
          if (this.resetCurrentTask) {
            this.resetCurrentTask();
          }
        }
      } catch (err) {
        this.toast.error(
          'Failed to update the task',
          '',
          toastNotificationTimeoutOptions
        );
        console.error('Error : ', err);
        if (this.resetCurrentTask) {
          this.resetCurrentTask();
        }
      } finally {
        this.disabled = false;
      }
    }
  }

  // function for fetching task after clicking on fetch task button
  @action async handleAssignment() {
    this.findingTask = true;
    this.disabled = true;
    const message = await this.assingnTaskFunction();
    if (message === 'Task assigned') {
      await this.setTasksToShow();
    }
    this.message = message;
    this.showModal = true;
    this.disabled = false;
    this.findingTask = false;
    this.showFetchButton = false;
    localStorage.setItem('already-fetched', true);
  }

  async handleAssingnmentAfterUpdate() {
    this.assignTask = false;
    later(async () => {
      this.message = TASK_MESSAGES.FIND_TASK;
      const message = await this.assingnTaskFunction();
      if (message === 'Task assigned') {
        await this.setTasksToShow();
        this.showFetchButton = false;
      }
      this.message = message;
      this.isUpdating = false;
      this.closeDisabled = false;
    }, 2000);
  }

  async assingnTaskFunction() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/assign/self`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const res = await response.json();
      const { message } = res;
      return message;
    } catch {
      this.toast.error(
        'Something went wrong',
        '',
        toastNotificationTimeoutOptions
      );
    }
  }
  showTaskChangeInfoModal(msg) {
    this.message = msg;
    this.showModal = true;
    this.buttonRequired = true;
  }
  @action async handleUpdateTask(taskId, resetCurrentTask) {
    this.resetCurrentTask = resetCurrentTask;
    const taskData = this.taskFields;
    const currentTask = this.getTaskById(taskId);
    const isCurrentTaskStatusBlock =
      currentTask.status === this.TASK_KEYS.BLOCKED;
    const isNewTaskStatusInProgress =
      taskData.status === this.TASK_KEYS.IN_PROGRESS;
    const isNewTaskStatusBlock = taskData.status === this.TASK_KEYS.BLOCKED;
    const isCurrProgress100 =
      parseInt(currentTask.percentCompleted || 0) === 100;
    const isCurrProgress0 = parseInt(currentTask.percentCompleted || 0) === 0;
    this.tempTaskId = taskId;

    if (this.dev && taskData.status) {
      if (!isCurrProgress100) {
        switch (currentTask.status) {
          case this.TASK_KEYS.IN_PROGRESS:
            if (!isNewTaskStatusBlock) {
              this.showTaskChangeInfoModal(
                TASK_MESSAGES.CHANGE_TO_100_PROGRESS
              );
              this.taskFields.percentCompleted = 100;
              return;
            }
            break;
          case this.TASK_KEYS.BLOCKED:
            if (!isNewTaskStatusInProgress) {
              this.showTaskChangeInfoModal(
                `The progress of current task is ${currentTask.percentCompleted}%. ${TASK_MESSAGES.CHANGE_TO_100_PROGRESS}`
              );
              this.taskFields.percentCompleted = 100;
              return;
            }
            break;
          default:
            break;
        }
      }

      if (
        isNewTaskStatusInProgress &&
        !isCurrentTaskStatusBlock &&
        !isCurrProgress0
      ) {
        this.showTaskChangeInfoModal(TASK_MESSAGES.CHANGE_TO_0_PROGRESS);
        this.taskFields.percentCompleted = 0;

        return;
      }
    }

    if (
      taskData.percentCompleted === TASK_PERCENTAGE.completedPercentage &&
      !this.dev
    ) {
      this.showTaskChangeInfoModal(TASK_MESSAGES.MARK_DONE);
    } else {
      return this.updateTask(taskId);
    }
  }
}
