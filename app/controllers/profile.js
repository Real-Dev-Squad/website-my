import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
const BASE_URL = ENV.BASE_API_URL;

export default class ProfileController extends Controller {
  @service toast;
  formDataKeyName = 'profile';

  get imageUploadUrl() {
    return `${BASE_URL}/users/picture`;
  }

  @tracked isSubmitDisabled = true;
  @tracked isSubmitClicked = false;
  @tracked showEditProfilePictureModal = false;

  @tracked title = 'Profile Details';
  @tracked formData = {
    first_name: '',
    last_name: '',
    username: '',
    yoe: 0,
    githubId: '',
    githubUsername: '',
  };

  formErrors = {
    first_name: false,
    last_name: false,
    username: false,
    yoe: false,
    githubId: false,
    githubUsername: false,
  };

  @tracked fields = [
    {
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'Darth',
      showError: false,
      disabled: false,
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Vader',
      showError: false,
      disabled: false,
    },
    {
      id: 'username',
      label: 'Username ',
      type: 'text',
      placeholder: 'e.g anakin, or some other unique username',
      showError: false,
      disabled: false,
    },
    {
      id: 'yoe',
      label: 'Years of Experience',
      type: 'number',
      placeholder: 'How many years have you worked?',
      showError: false,
      disabled: false,
    },
    {
      id: 'github',
      label: 'Github ID',
      placeholder: 'Your github id e.g mysonisajedi.com',
      type: 'text',
      showError: false,
      disabled: false,
    },
  ];

  timerId = undefined;

  @action handleShowEditProfilePictureModal() {
    this.showEditProfilePictureModal = true;
  }
  @action closeModal() {
    this.showEditProfilePictureModal = false;
  }
  @action stopPropogation(event) {
    console.log(event);
    event.stopPropagation();
  }

  @action handleFieldChange(name, value) {
    const index = this.fields.findIndex((field) => field.id === name);
    set(this.formData, name, value);

    if (!value) {
      this.isSubmitDisabled = true;
      set(this.fields[index], 'showError', true);
    } else if (!this.fields[index].validator) {
      set(this.fields[index], 'showError', false);
    }

    const anyErrors = this.fields.map((field) => {
      return !!(this.formData[field.id] === '');
    });

    this.isSubmitDisabled = !anyErrors.filter(Boolean).length;
  }

  @action emailValidator(email) {
    if (typeof email !== 'string') return false;

    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const index = this.fields.findIndex((field) => field.type === 'email');

    if (pattern.test(email)) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
    return;
  }

  removeEmptyFields(reqObject) {
    const objectRequested = reqObject;
    for (const field in objectRequested) {
      if (!objectRequested[field]) {
        delete objectRequested[field];
      } else if (field === 'yoe') {
        objectRequested[field] = parseInt(objectRequested[field]);
      }
    }
    return objectRequested;
  }

  @action async handleSubmit(e) {
    // submit
    // https://github.com/Real-Dev-Squad/website-api-contracts/tree/main/users#patch-usersself
    e.preventDefault();
    const cleanReqObject = this.removeEmptyFields(this.formData);
    this.isSubmitClicked = true;
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify(cleanReqObject),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const { status } = response;
      if (status !== 204) {
        this.toast.error(
          'Something went wrong. Please check console errors.',
          '',
          toastNotificationTimeoutOptions
        );
      }
    } catch (error) {
      console.error('Error : ', error);
    } finally {
      this.isSubmitClicked = false;
    }
  }
}
