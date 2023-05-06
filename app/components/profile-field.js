import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ProfileFieldComponent extends Component {
  @action
  inputFieldChanged(event) {
    const { id, onChange } = this.args;
    const value = event.target.value;

    onChange(id, value);
  }

  @action
  checkInputValidation(event) {
    const { id, onBlur, validator } = this.args;
    const value = event.target.value;
    let isValid = event.target.validity.valid;

    if (validator) {
      if (!validator(value)) {
        isValid = false;
      }
    }

    onBlur(id, isValid);
  }

  get error() {
    const { showError, errorMessage } = this.args;
    return `${showError ? errorMessage : ''}`;
  }
}
