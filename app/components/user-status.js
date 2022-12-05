import Component from '@glimmer/component';
import { userStates } from '../constants/user-status';
export default class UserStatusComponent extends Component {
  currentUserStatus = [
    {
      status: userStates.active,
      message: 'You are Active',
      class: 'buttons__idle',
      firstAvailableStatus: userStates.idle,
      firstStatusMessage: 'Change your status to Idle',
      firstStatusClass: 'buttons__idle',
      secondAvailableStatus: userStates.ooo,
      secondStatusMessage: 'Change your status to OOO',
      secondStatusClass: 'buttons__ooo',
    },
    {
      status: userStates.idle,
      message: 'You are Idle',
      class: 'buttons__active',
      firstAvailableStatus: userStates.active,
      firstStatusMessage: 'Change your status status to Active',
      firstStatusClass: 'buttons__active',
      secondAvailableStatus: userStates.ooo,
      secondStatusMessage: 'Change your status status to OOO',
      secondStatusClass: 'buttons__ooo',
    },
    {
      status: userStates.ooo,
      message: 'You are OOO',
      firstAvailableStatus: userStates.idle,
      firstStatusMessage: 'Change your status status to Idle',
      firstStatusClass: 'buttons__idle',
      secondAvailableStatus: userStates.active,
      secondStatusMessage: 'Change your status status to Active',
      secondStatusClass: 'buttons__active',
    },
  ];
}
