import Component from '@glimmer/component';
import ENV from 'website-my/config/environment';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { USER_STATES } from '../constants/user-status';
import { getUTCMidnightTimestampFromDate } from '../utils/date-conversion';
const API_BASE_URL = ENV.BASE_API_URL;

export default class UserStatusComponent extends Component {
  @service userStatus;

  @tracked isTaskFetching = false;

  ALL_FEASIBLE_STATUS = {
    [USER_STATES.ACTIVE]: {
      status: USER_STATES.ACTIVE,
      message: 'Change your status to Active',
      class: 'buttons__active',
    },
    [USER_STATES.IDLE]: {
      status: USER_STATES.IDLE,
      message: 'Change your status to Idle',
      class: 'buttons__idle',
    },
    [USER_STATES.OOO]: {
      status: USER_STATES.OOO,
      message: 'Change your status to OOO',
      class: 'buttons__ooo',
    },
  };
  currentUserStatus = [
    {
      status: USER_STATES.ACTIVE,
      message: 'You are Active',
      otherAvailableStatus: [this.ALL_FEASIBLE_STATUS.OOO],
    },
    {
      status: USER_STATES.IDLE,
      message: 'You are Idle',
      otherAvailableStatus: [
        this.ALL_FEASIBLE_STATUS.ACTIVE,
        this.ALL_FEASIBLE_STATUS.OOO,
      ],
    },
    {
      status: USER_STATES.OOO,
      message: 'You are OOO',
      otherAvailableStatus: [this.ALL_FEASIBLE_STATUS.ACTIVE],
    },
    {
      status: USER_STATES.ONBOARDING,
    },
    {
      status: USER_STATES.DNE,
      message: `Your Status doesn't exist`,
      otherAvailableStatus: [
        this.ALL_FEASIBLE_STATUS.ACTIVE,
        this.ALL_FEASIBLE_STATUS.OOO,
      ],
    },
  ];

  get getCurrentUserStatus() {
    return this.userStatus.getCurrentUserStatus();
  }

  async isUserIdle() {
    this.isTaskFetching = true;
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/self`, {
        credentials: 'include',
      });

      const taskData = await response.json();

      if (!response.ok) {
        if (response.status == 401) {
          throw new Error('Please log in to continue');
        }
        throw new Error('Oops, We ran into a problem!');
      }

      let userStatus = 'IDLE';

      taskData.forEach((task) => {
        if (task.status === 'IN_PROGRESS' || task.status === 'ASSIGNED') {
          userStatus = 'ACTIVE';
        }
      });

      return userStatus;
    } catch (err) {
      console.log('Error occured');
    } finally {
      this.isTaskFetching = false;
    }
  }

  get showLoader() {
    return this.args.isStatusUpdating || this.isTaskFetching;
  }

  @action async changeStatus(status) {
    if (status === USER_STATES.ACTIVE) {
      const data = await this.isUserIdle();

      if (data === USER_STATES.IDLE) {
        this.args.changeStatus(data);
        return;
      }

      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().slice(0, 10);
      const from = getUTCMidnightTimestampFromDate(currentDateString);
      const updatedAt = Date.now();
      const activeStateData = {
        updatedAt,
        from,
        until: undefined,
        message: undefined,
        state: USER_STATES.ACTIVE,
      };
      await this.args.updateStatus({ currentStatus: activeStateData });
    } else {
      this.args.changeStatus(status);
    }
  }
}
