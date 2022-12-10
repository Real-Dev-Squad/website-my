import Component from '@glimmer/component';
import { USER_STATES } from '../constants/user-status';
export default class UserStatusComponent extends Component {
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
      otherAvailableStatus: [
        this.ALL_FEASIBLE_STATUS.IDLE,
        this.ALL_FEASIBLE_STATUS.OOO,
      ],
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
      otherAvailableStatus: [
        this.ALL_FEASIBLE_STATUS.ACTIVE,
        this.ALL_FEASIBLE_STATUS.IDLE,
      ],
    },
    {
      status: USER_STATES.DNE,
      message: `Your Status doesn't exist`,
      otherAvailableStatus: [
        this.ALL_FEASIBLE_STATUS.ACTIVE,
        this.ALL_FEASIBLE_STATUS.IDLE,
        this.ALL_FEASIBLE_STATUS.OOO,
      ],
    },
  ];
}
