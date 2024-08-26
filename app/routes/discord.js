import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';
import { inject as service } from '@ember/service';
import redirectAuth from '../utils/redirect-auth';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

export default class DiscordRoute extends Route {
  @service router;
  @service toast;

  queryParams = {
    token: { refreshModel: true },
  };

  async model() {
    try {
      const token = this.paramsFor('discord').token;
      const externalAccountResponse = await fetch(
        `${ENV.BASE_API_URL}/external-accounts/${token}`,
        {
          credentials: 'include',
        }
      );

      const userResponse = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });

      const externalAccountData = await externalAccountResponse.json();
      const userData = await userResponse.json();

      if (
        userResponse.status === 200 &&
        externalAccountResponse.status === 200
      ) {
        return { externalAccountData, userData, isTokenEpired: false };
      } else if (userResponse.status === 401) {
        this.toast.error(userData.message, '', toastNotificationTimeoutOptions);
        setTimeout(redirectAuth, 2000);
      } else if (externalAccountResponse.status === 401) {
        this.toast.error(
          externalAccountData.message,
          '',
          toastNotificationTimeoutOptions
        );

        return { isTokenExpired: true };
      }
    } catch (error) {
      this.toast.error(error.message, '', toastNotificationTimeoutOptions);
      console.error(error.message);
    }
  }
}
