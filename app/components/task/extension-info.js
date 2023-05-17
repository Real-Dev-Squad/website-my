import Component from '@glimmer/component';

export default class ExtensionInfoComponent extends Component {
  extension = this.args.extension;
  newEndsOn = this.localTime(this.extension.newEndsOn);
  oldEndsOn = this.localTime(this.extension.oldEndsOn);

  localTime(time) {
    return new Date(time * 1000).toLocaleString();
  }
}
