import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later, debounce } from '@ember/runloop';

export default class ProgressBarComponent extends Component {
  @tracked isEditable = false;
  @tracked value = this.args.value;
  lastEditTime = null;

  @action turnEditModeOn() {
    this.isEditable = true;
    this.lastEditTime = Date.now();
    this.setEditableToFalse();
  }

  setEditableToFalse() {
    later(() => {
      const timeDelta = Date.now() - this.lastEditTime;
      if (this.isEditable && timeDelta >= 5000) {
        this.isEditable = false;
      } else if (this.isEditable) {
        this.setEditableToFalse();
      }
    }, 5000);
  }

  @action onInput(e) {
    this.lastEditTime = Date.now();
    this.value = e.target.value;
    if (this.args.onInput) {
      this.args.onInput(this.value);
    }
  }

  @action onChange(e) {
    this.lastEditTime = Date.now();
    if (this.args.onChange) {
      debounce(this, this.debouncedChange, e, 600);
    }
  }

  async debouncedChange(e) {
    await this.args.onChange(e);
    this.isEditable = false;
  }
}
