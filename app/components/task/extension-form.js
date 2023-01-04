import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { resource, use } from 'ember-resources';
import { TrackedObject } from 'tracked-built-ins';
import ENV from 'website-my/config/environment';
import { action } from '@ember/object';
import { WARNING_INVALID_NEW_ETA } from '../../constants/user-status';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';
import { inject as service } from '@ember/service';

export default class ExtensionFormComponent extends Component {
  @tracked createExtensionRequest = false;
  @service toast;

  @service userState;

  oldETA = new Date(this.args.task.endsOn * 1000).toLocaleString();

  @use load = resource(({ on }) => {
    const state = new TrackedObject({});
    const controller = new AbortController();

    on.cleanup(() => controller.abort());
    (async () => {
      if (this.args.task) {
        state.isLoading = true;
        try {
          const response = await fetch(
            `${ENV.BASE_API_URL}/extensionRequests/self/?taskId=${this.args.task.id}`,
            {
              credentials: 'include',
              signal: controller.signal,
            }
          );
          if (response.status !== 200) {
            this.toast.error(
              'Something went wrong!',
              '',
              toastNotificationTimeoutOptions
            );
            setTimeout(() => window.location.reload(), 1500);
          }
          const data = await response.json();
          if (!data.allExtensionRequests.length) {
            throw Error(
              'No extension request found for this task, want to create one?'
            );
          }
          state.value = data.allExtensionRequests;
          state.isLoading = false;
        } catch (error) {
          state.error = error.message;
          state.isLoading = false;
          console.error(error);
        }
      }
    })();

    return state;
  });

  @action
  createExtensionRequestToggle(e) {
    e.stopPropagation();
    this.createExtensionRequest = !this.createExtensionRequest;
  }

  @action
  async submitExtensionRequest(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const extensionTime = new Date(formData.get('newEndsOn')).getTime() / 1000;
    const json = {};
    formData.forEach(function (value, key) {
      json[key] = value;
    });
    json['newEndsOn'] = extensionTime;

    if (extensionTime < this.args.task.endsOn) {
      this.toast.error(
        WARNING_INVALID_NEW_ETA,
        '',
        toastNotificationTimeoutOptions
      );
      return;
    }
    //setting default values
    json['taskId'] = this.args.task.id;
    json['assignee'] = this.userState.get('id');
    json['oldEndsOn'] = this.args.task.endsOn;
    json['status'] = 'PENDING';

    try {
      const response = await fetch(`${ENV.BASE_API_URL}/extensionRequests`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        this.toast.error(
          'Something went wrong!',
          '',
          toastNotificationTimeoutOptions
        );
        setTimeout(() => window.location.reload(), 1500);
      }
      const data = await response.json();
      this.toast.success(data.message, '', toastNotificationTimeoutOptions);
      setTimeout(this.args.closeForm, 1500);
    } catch (error) {
      this.toast.error(error.message, '', toastNotificationTimeoutOptions);
    }
  }
}
