import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from 'lodash';
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
    setTimeout(() => {
      if (this.isEditable && Date.now() - this.lastEditTime >= 5000) {
        this.isEditable = false;
      } else {
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
      this.debouncedChange(e);
    }
  }

  debouncedChange = debounce(async (e) => {
    await this.args.onChange(e);
    this.isEditable = false;
  }, 750);
}
