import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LABEL_TEXT } from '../../constants/new-signup';

export default class SignupComponent extends Component {
  checkboxData = [
    {
      label: 'Developer',
      name: 'developer',
    },
    {
      label: 'Designer',
      name: 'designer',
    },
    {
      label: 'Mavens',
      name: 'mavens',
    },
    {
      label: 'Product Manager',
      name: 'productmanager',
    },
  ];

  get label() {
    const { currentStep } = this.args;

    return LABEL_TEXT[currentStep];
  }

  @action checkboxFieldChanged(event) {
    const { onChange } = this.args;
    const roleKey = event.target.name;
    const value = event.target.checked;
    onChange(roleKey, value);
  }
}
