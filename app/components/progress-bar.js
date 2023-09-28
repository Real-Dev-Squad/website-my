import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProgressBarComponent extends Component {
  @tracked value = this.args.value;

  @action onMouseLeave() {
    this.value = this.args.value;
  }
  @action onInput(e) {
    this.value = e.target.value;
    if (this.args.onInput) {
      this.args.onInput(this.value);
    }
  }
  constructor(...args) {
    super(...args);

    // Additional constructor logic can be added here if needed
    console.log('ProgressBarComponent constructor called');

    // You can also access arguments passed to the component constructor here
    console.log('Component args:', this.args);
  }

  @action async onClick(event) {
    console.log(event);
    const rangeWidth = event.target.offsetWidth;
    const offsetX = event.offsetX;
    console.log(offsetX / rangeWidth);
    let newValue = Math.round((offsetX / rangeWidth) * 100);
    newValue = newValue - (newValue % 10) + 10;
    event.target.value = newValue;
    this.onInput(event);
    await this.onChange(event);
  }

  @action
  async handleHover(event) {
    const rangeWidth = event.target.offsetWidth;
    const offsetX = event.offsetX;
    console.log(offsetX / rangeWidth);
    let newValue = Math.round((offsetX / rangeWidth) * 100);
    newValue = newValue - (newValue % 10) + 10;
    if (newValue === this.value) return;

    await new Promise((r) => setTimeout(r, 100));

    this.value = newValue;
  }

  @action async onChange(e) {
    if (this.args.onChange) {
      await this.args.onChange(e);
    }
  }

  async debouncedChange(e) {
    await this.args.onChange(e);
  }
}
