import Component from '@glimmer/component';

export default class UserStatusComponent extends Component {
  currentUserStatus = [
    {
      status: 'active',
      message: 'I am doing a task',
      update: 'idle',
      class: 'buttons__idle',
      buttonText: 'Change status to ‘Idle’',
      update2: 'ooo',
      buttonText2: 'Mark yourself as OOO',
    },
    {
      status: 'idle',
      message: 'I am Idle',
      update: 'active',
      class: 'buttons__active',
      buttonText: 'Change status to ‘Active’',
      update2: 'ooo',
      buttonText2: 'Mark yourself as OOO',
    },
    {
      status: 'ooo',
      message: 'I am OOO',
      update: '',
      class: '',
      buttonText: '',
      update2: 'active',
      buttonText2: 'Mark yourself as Active again',
    },
  ];
}
