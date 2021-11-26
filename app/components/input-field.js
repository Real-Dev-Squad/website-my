import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InputFieldComponent extends Component {
  @tracked inputValue = null;

  @action handleInputFieldChange(event) {
    const { type, onChange, validator } = this.args;
    const { value } = event.target;

    switch (type) {
      case 'string':
        this.inputValue = value;
        break;
      case 'number':
        this.inputValue = Number(value);
        break;
      case 'boolean':
        this.inputValue = Boolean(value);
        break;
      default:
        this.inputValue = value;
        console.warn('Unknown type detected! Keeping the value as string');
    }

    if (typeof validator === 'function') {
      validator(this.inputValue);
    }

    onChange(this.inputValue);
  }
}
