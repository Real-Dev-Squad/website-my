import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class ProgressBarComponent extends Component {
  @tracked value = this.args.value;

  @action onInput(e) {
    this.value = e.target.value;
    if (this.args.onInput) {
      this.args.onInput(this.value);
    }
  }

  @action onChange(e) {
    if (this.args.onChange) {
      debounce(this, this.debouncedChange, e, 600);
    }
  }

  async debouncedChange(e) {
    await this.args.onChange(e);
    this.isEditable = false;
  }
}
