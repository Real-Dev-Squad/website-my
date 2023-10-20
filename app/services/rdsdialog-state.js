import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
// import { inject as service } from '@ember/service';

export default class RDSDialogStateService extends Service {
  @tracked dialogstate = false; // Initial data stored in the service

  updateData(newData) {
    this.dialogstate = newData;
  }
}
