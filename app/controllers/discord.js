import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DiscordController extends Controller {
  @service toast;
  @tracked discordId =
    this.model.externalAccountData.attributes.discordId || '';
  @tracked linkStatus = 'not-linked';
  @tracked isLinking = false;
  @tracked consent = false;

  @action setConsent() {
    this.consent = !this.consent;
  }

  @action async linkDiscordAccount() {
    try {
      this.isLinking = true;

      if (this.consent) {
        const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
          method: 'PATCH',
          body: JSON.stringify({ discordId: this.discordId }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.status === 204) {
          this.linkStatus = 'linked';
        } else {
          this.linkStatus = 'failure';
        }
      } else {
        this.toast.error(
          'Please provide the consent by clicking the checkbox!',
          'ERROR',
          toastNotificationTimeoutOptions
        );
      }
    } catch (error) {
      this.linkStatus = 'failure';
      console.error(error.message);
    } finally {
      this.isLinking = false;
    }
  }
}
