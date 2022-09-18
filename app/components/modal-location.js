/* eslint-disable prettier/prettier */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalLocationComponent extends Component {
  @tracked isOpen = false;

  @tracked location = '';

  @tracked updateLocation = null;

  @tracked sendNotification = null;

  @tracked isCheckAll = false;

  @action setSelection(event) {
    this.updateLocation = event.target.value;

    console.log(this.updateLocation, 'update location option');
  }

  @action setSelectedNotification(event) {
    this.sendNotification = event.target.value;

    console.log(this.sendNotification, 'notification sent to');
  }

  @action updateValue(event) {
    this.location = event.target.value;

    console.log(this.location);
  }

  @action toggleModal() {
    this.isOpen = !this.isOpen;
  }

  formDataKeyName = 'modal';

  @tracked isSubmitDisabled = false;

  @action async handleSubmit(e) {
    e.preventDefault();

    this.isOpen = false;

    const cleanReqObject = {
      location: this.location,

      updateLocation: this.updateLocation,

      sendNotification: this.sendNotification,
    };

   
    this.isSubmitClicked = true;

    this.location = '';

    console.log(cleanReqObject, 'feilds value');
  }
}
