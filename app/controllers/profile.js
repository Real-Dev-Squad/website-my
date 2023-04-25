import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
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

  @tracked fields = [
    {
      id: 'first_name',
      label: 'First Name*',
      type: 'text',
      placeholder: 'First Name',
      icon_url: 'icons/user.svg',
    },
    {
      id: 'last_name',
      label: 'Last Name*',
      type: 'text',
      placeholder: 'Last Name',
      icon_url: 'icons/user.svg',
    },
    {
      id: 'email',
      label: 'Email*',
      type: 'text',
      placeholder: 'e.g johndoe@gmail.com',
      icon_url: 'icons/mail.svg',
    },
    {
      id: 'company',
      label: 'Company or College name*',
      type: 'text',
      placeholder: 'e.g Google or Dr. Kalam University',
      icon_url: 'icons/company.svg',
    },
    {
      id: 'designation',
      label: 'Designation*',
      type: 'text',
      placeholder: 'e.g SDE - 2 or 3rd Year CSE Student',
      icon_url: 'icons/user.svg',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn ID*',
      type: 'text',
      placeholder: 'e.g johndoe',
      icon_url: 'icons/linkedin.svg',
    },
    {
      id: 'twitter',
      label: 'Twitter Username*',
      type: 'text',
      placeholder: 'e.g johndoe',
      icon_url: 'icons/twitter.svg',
    },
    {
      id: 'personal_website',
      label: 'Personal Website',
      type: 'text',
      placeholder: 'e.g mysite.com',
      icon_url: 'icons/website.svg',
    },
  ];

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
