import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default class IdentityController extends Controller {
  @tracked isEditClicked = false;
  @tracked isGenerateChaincodeClicked = false;
  @tracked identityURL = ' ';
  @tracked isChecked = false;
  @tracked isChaincodeClicked = false;
  @tracked Chaincode = 'Generate Chaincode';

  @action handleVerify() {
    if (this.isChecked === false) {
      alert('Please verify!');
    } else {
      alert('Approved!');
    }
  }

  @action handleChaincode() {
    this.isChaincodeClicked = true;
    this.Chaincode = 'abcd1234';
  }

  @action async handleEdit(e) {
    e.preventDefault();
    this.isEditClicked = true;

    try {
      const response = await fetch(`${BASE_URL}/users/identityURL`, {
        method: 'PATCH',
        body: JSON.stringify({ identityURL: this.identityURL }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const { status } = response;
      if (status === 204) {
        alert('Identity URL successfully edited');
      } else {
        alert('Something went wrong. Please check console errors.');
      }
    } catch (error) {
      console.error('Error : ', error);
    } finally {
      this.isEditClicked = false;
    }
  }

  @action async handleGenerateChaincode(e) {
    e.preventDefault();
    this.isGenerateChaincodeClicked = true;

    try {
      const response = await fetch(`${BASE_URL}/users/chainCode`, {
        method: 'PATCH',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const { status } = response;
      if (status === 204) {
        alert(' ');
      } else {
        alert('Something went wrong. Please check console errors.');
      }
    } catch (error) {
      console.error('Error : ', error);
    } finally {
      this.isGenerateChaincodeClicked = false;
    }
  }
}
