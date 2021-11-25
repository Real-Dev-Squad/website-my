import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// Will be deprecated soon
export default class FormInputValidatorComponent extends Component {
  @tracked inputValue = '';

  @action
  inputFieldChanged(event) {
    const { type, id, onChange, validator } = this.args;
    const value = event.target.value;

    if (type === 'number') {
      this.inputValue = Number(value);
    } else {
      this.inputValue = value;
    }

    if (validator) {
      validator(value);
    }
    onChange(id, value, validator);
  }
}
