import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from 'lodash';
export default class ProgressBarComponent extends Component {
  @tracked isEditable = false;

  @tracked value = this.args.value;

  @action turnEditModeOn() {
    this.isEditable = true;
    // document.getElementById('progress-bar-input').focus();
  }

  @action onInput(e) {
    this.value = e.target.value;
    // this.args.onInput(e);
  }
  @action something() {
    console.log('helo');
  }

  @action onHover(e) {
    this.debouncedHover(e);
  }
  @action onChange(e) {
    this.debouncedChange(e);
  }

  debouncedHover = debounce(async (e) => {
    const rangeWidth = e.target.offsetWidth;
    const offsetX = e.offsetX;
    let newValue = Math.round((offsetX / rangeWidth) * 100);
    newValue = newValue + (10 - (newValue % 10));
    this.value = newValue;
  }, 0);

  debouncedChange = debounce(async (e) => {
    await this.args.onUpdate(e);
    this.isEditable = false;
  }, 1000);
}
