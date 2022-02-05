import Component from '@glimmer/component';
import { action } from '@ember/object';
import mixpanel from 'mixpanel-browser';

mixpanel.init('5fcfb02eabfc77f5a6a0e4cb65bbf5e0', { debug: true });

export default class FormInputComponent extends Component {
  @action
  inputFieldChanged(event) {
    mixpanel.track('Input Field Changed');

    const { id, onChange, validator } = this.args;
    const value = event.target.value;

    if (validator) {
      validator(value);
    }
    onChange(id, value, validator);
  }
}
