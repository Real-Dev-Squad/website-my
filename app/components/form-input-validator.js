import Component from '@glimmer/component';
import { action } from '@ember/object';

// Will be deprecated soon
export default class FormInputValidatorComponent extends Component {
  @action
  inputFieldChanged(event) {
    const { id, onChange, validator } = this.args;
    const value = event.target.value;

    if (validator) {
      validator(value);
    }
    onChange(id, value, validator);
  }
}
