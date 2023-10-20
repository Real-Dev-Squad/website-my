import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { checkDeviceType, openRDSApp } from '../utils/checkDeviceType';

export default class MobileDialogComponent extends Component {
  @service rdsdialogState;
  @tracked toShow = checkDeviceType();
  constructor(...args) {
    super(...args);
  }

  @action
  closeDialog() {
    this.rdsdialogState.updateData(true);
    this.toShow = false;
  }

  @action
  openRDSApp() {
    openRDSApp();
  }
}
