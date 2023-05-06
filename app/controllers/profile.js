import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
const BASE_URL = ENV.BASE_API_URL;

export default class ProfileController extends Controller {
  @service toast;
  @service router;
  get imageUploadUrl() {
    return `${BASE_URL}/users/picture`;
  }
  @tracked formDataKeyName = 'profile';
  @tracked showEditProfilePictureModal = false;
  @tracked title = 'Profile Details';

  @tracked formData = {
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    designation: '',
    linkedin_id: '',
    instagram_id: '',
    twitter_id: '',
    website: '',
  };

  @tracked fields = [
    {
      id: 'first_name',
      label: 'First Name*',
      type: 'text',
      required: true,
      placeholder: 'First Name',
      icon_url: 'icons/user.svg',
      showError: false,
      errorMessage: 'First name is required',
    },
    {
      id: 'last_name',
      label: 'Last Name*',
      type: 'text',
      required: true,
      placeholder: 'Last Name',
      icon_url: 'icons/user.svg',
      showError: false,
      errorMessage: 'Last name is required',
    },
    {
      id: 'email',
      label: 'Email*',
      type: 'email',
      required: true,
      placeholder: 'e.g johndoe@gmail.com',
      icon_url: 'icons/mail.svg',
      showError: false,
      errorMessage: 'Valid email is required',
      validator: this.emailValidator,
    },
    {
      id: 'company',
      label: 'Company or College name*',
      type: 'text',
      required: true,
      placeholder: 'e.g Google or Dr. Kalam University',
      icon_url: 'icons/company.svg',
      showError: false,
      errorMessage: 'Company name is required',
    },
    {
      id: 'designation',
      label: 'Designation*',
      type: 'text',
      required: true,
      placeholder: 'e.g SDE - 2 or 3rd Year CSE Student',
      icon_url: 'icons/user.svg',
      showError: false,
      errorMessage: 'Designation is required',
    },
    {
      id: 'linkedin_id',
      label: 'LinkedIn ID*',
      type: 'text',
      required: true,
      placeholder: 'e.g johndoe',
      icon_url: 'icons/linkedin.svg',
      showError: false,
      errorMessage: 'Linkedin handle is required',
    },
    {
      id: 'twitter_id',
      label: 'Twitter Username*',
      type: 'text',
      required: true,
      placeholder: 'e.g johndoe',
      icon_url: 'icons/twitter.svg',
      showError: false,
      errorMessage: 'Twitter handle is required',
    },
    {
      id: 'website',
      label: 'Personal Website',
      type: 'text',
      required: true,
      placeholder: 'e.g mysite.com',
      icon_url: 'icons/website.svg',
      showError: false,
      errorMessage: '',
    },
  ];

  @action handleFieldChange(name, value) {
    set(this.formData, name, value);
  }

  @action handleFieldValidation(id, isValid) {
    const index = this.fields.findIndex((field) => field.id === id);
    if (isValid) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
  }

  @action emailValidator(email) {
    if (typeof email !== 'string') return false;
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return pattern.test(email) ? true : false;
  }

  @action handleShowEditProfilePictureModal() {
    this.showEditProfilePictureModal = true;
  }
  @action closeModal() {
    this.showEditProfilePictureModal = false;
  }
  @action refreshRoute() {
    this.send('refreshModel');
  }
}
