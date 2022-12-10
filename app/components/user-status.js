import Component from '@glimmer/component';
import { USER_STATES } from '../constants/user-status';
export default class UserStatusComponent extends Component {
  currentUserStatus = [
    {
      status: USER_STATES.ACTIVE,
      message: 'You are Active',
      firstAvailableStatus: USER_STATES.IDLE,
      firstStatusMessage: 'Change your status to Idle',
      firstStatusClass: 'buttons__idle',
      secondAvailableStatus: USER_STATES.OOO,
      secondStatusMessage: 'Change your status to OOO',
      secondStatusClass: 'buttons__ooo',
    },
    {
      status: USER_STATES.IDLE,
      message: 'You are Idle',
      firstAvailableStatus: USER_STATES.ACTIVE,
      firstStatusMessage: 'Change your status status to Active',
      firstStatusClass: 'buttons__active',
      secondAvailableStatus: USER_STATES.OOO,
      secondStatusMessage: 'Change your status status to OOO',
      secondStatusClass: 'buttons__ooo',
    },
    {
      status: USER_STATES.OOO,
      message: 'You are OOO',
      firstAvailableStatus: USER_STATES.IDLE,
      firstStatusMessage: 'Change your status status to Idle',
      firstStatusClass: 'buttons__idle',
      secondAvailableStatus: USER_STATES.ACTIVE,
      secondStatusMessage: 'Change your status status to Active',
      secondStatusClass: 'buttons__active',
    },
  ];
}
