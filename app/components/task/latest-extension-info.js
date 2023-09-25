import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LatestExtensionInfoComponent extends Component {
  extension = this.args.extension;
  newEndsOn = this.localTime(this.extension.newEndsOn);
  oldEndsOn = this.localTime(this.extension.oldEndsOn);

  localTime(time) {
    return new Date(time * 1000).toLocaleString();
  }

  @action
  closeForm() {
    // Call the closeForm action passed from the parent component
    this.args.closeForm();
  }
}
