import Component from '@glimmer/component';

export default class FormInputComponent extends Component {
  get disabledValue() {
    const { firstName, lastName, userName, what } = this.args;

    if (what === 'first-name' && firstName === '') return true;
    if (what === 'last-name' && lastName === '') return true;
    if (what === 'user-name' && userName === '') return true;

    return false;
  }

  get label() {
    const { what } = this.args;

    switch (what) {
      case 'first-name':
        return 'What is your Fist Name?';
      case 'last-name':
        return "And what's is your Last Name?";
      case 'user-name':
        return 'Now choose your awesome username!';
      default:
        return '';
    }
  }
}
