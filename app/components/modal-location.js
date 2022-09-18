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

  @action setSelectedNotification(selected) {
    this.sendNotification = selected;

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

    // const cleanReqObject = this.removeEmptyFields(this.formData);
    this.isSubmitClicked = true;

    console.log(cleanReqObject, 'feilds value');
  }
}
