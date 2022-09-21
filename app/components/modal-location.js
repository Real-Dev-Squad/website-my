/* eslint-disable prettier/prettier */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import ENV from 'website-my/config/environment';

const BASE_URL = ENV.GEOCODING_API_URL;

export default class ModalLocationComponent extends Component {
  @tracked isOpen = false;

  @tracked location = '';

  @tracked updateLocation = null;

  @tracked sendNotification = null;

  @tracked isCheckAll = false;

  @tracked isLoading = false;

  @tracked placesArray = [];

  @action setSelection(event) {
    this.updateLocation = event.target.value;

    console.log(this.updateLocation, 'update location option');
  }

  @action setSelectedNotification(event) {
    this.sendNotification = event.target.value;

    console.log(this.sendNotification, 'notification sent to');
  }

  @action async updateValue(event) {
    this.location = event.target.value;

    this.isLoading = true;

    try {
      const response = await fetch(
        `${BASE_URL}/${this.location}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoidmluYXlhay0wOSIsImEiOiJjbDdoM24waG0wYW9tM3dwYjN3aWJpNGh4In0.pcwljIKYp_NL-GmtDztvPg`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        this.isLoading = false;
        console.log(response, 'result url');

        const result = await response.json();

        this.placesArray = result?.features;

        console.log(this.placesArray, '____result');
      }
    } catch (error) {
      this.isLoading = false;
      console.log(error.message, '__error');
    } finally {
      this.isLoading = false;
    }
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
