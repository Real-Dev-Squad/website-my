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
      label: 'First Name',
    },
    {
      id: 'last_name',
      label: 'Last Name',
    },
    {
      id: 'username',
      label: 'Username ',
    },
    {
      id: 'yoe',
      label: 'Years of Experience',
    },
    {
      id: 'github_id',
      label: 'Github ID',
    },
    {
      id: 'github_display_name',
      label: 'Github Display Name',
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
