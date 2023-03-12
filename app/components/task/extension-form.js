import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { resource, use } from 'ember-resources';
import { TrackedMap } from 'tracked-maps-and-sets';
import ENV from 'website-my/config/environment';
import { action } from '@ember/object';
import { WARNING_INVALID_NEW_ETA } from '../../constants/user-status';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';
import { inject as service } from '@ember/service';

export default class ExtensionFormComponent extends Component {
  @tracked createExtensionRequest = false;
  @tracked createExtensionRequestError = null;
  @tracked disableExtensionRequestClose = false;
  @service toast;
  @service userState;

  oldETA = new Date(this.args.task.endsOn * 1000).toLocaleString();

  @use load = resource(({ on }) => {
    const state = new TrackedMap();
    const controller = new AbortController();

    on.cleanup(() => controller.abort());
    (async () => {
      if (this.args.task) {
        state.set('isLoading', true);
        try {
          const response = await fetch(
            `${ENV.BASE_API_URL}/extension-requests/self/?taskId=${this.args.task.id}`,
            {
              credentials: 'include',
              signal: controller.signal,
            }
          );
          if (response.status === 200) {
            const data = await response.json();
            if (!data.allExtensionRequests.length) {
              throw Error(
                'No extension request found for this task, want to create one?'
              );
            }
            state.set('value', data.allExtensionRequests);
            state.set('isLoading', false);
            return;
          }
          this.toast.error('Something went wrong!', '', {
            ...toastNotificationTimeoutOptions,
            timeOut: '3000',
          });
        } catch (error) {
          state.set('error', error.message);
          state.set('isLoading', false);
          console.error(error);
          this.toast.error(error.message, '', {
            ...toastNotificationTimeoutOptions,
            timeOut: '3000',
          });
        }
      }
    })();

    return state;
  });

  get extensionData() {
    const result = {};
    result['isLoading'] = this.load.get('isLoading');
    result['value'] = this.load.get('value');
    result['error'] = this.load.get('error');
    return result;
  }

  @action
  createExtensionRequestToggle(e) {
    e.stopPropagation();
    this.createExtensionRequest = !this.createExtensionRequest;
  }

  @action
  async submitExtensionRequest(e) {
    e.preventDefault();
    this.disableExtensionRequestClose = true;
    this.createExtensionRequestError = null;
    //submit button
    e.submitter.disabled = true;
    const formData = new FormData(e.target);
    const extensionTime = new Date(formData.get('newEndsOn')).getTime() / 1000;
    const json = {};
    formData.forEach(function (value, key) {
      json[key] = value;
    });

    if (extensionTime < this.args.task.endsOn) {
      this.toast.error(WARNING_INVALID_NEW_ETA, '', {
        ...toastNotificationTimeoutOptions,
        timeOut: '3000',
      });
      e.submitter.disabled = false;
      this.disableExtensionRequestClose = false;
      this.createExtensionRequestError =
        'The newEndsOn value cannot be smaller than the oldEndsOn value';
      return;
    }
    json['newEndsOn'] = extensionTime;
    //setting default values
    json['taskId'] = this.args.task.id;
    json['assignee'] = this.userState.get('id');
    json['oldEndsOn'] = this.args.task.endsOn;
    json['status'] = 'PENDING';

    try {
      const response = await fetch(`${ENV.BASE_API_URL}/extension-requests`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.message === 'Extension Request created successfully!') {
        this.disableExtensionRequestClose = false;
        this.toast.success(data.message, '', {
          ...toastNotificationTimeoutOptions,
          timeOut: '3000',
        });
        setTimeout(this.args.closeModel, 2000);
        return;
      }
      this.toast.error('Something went wrong!', '', {
        ...toastNotificationTimeoutOptions,
        timeOut: '3000',
      });
      e.submitter.disabled = false;
    } catch (error) {
      this.toast.error(error.message, '', {
        ...toastNotificationTimeoutOptions,
        timeOut: '3000',
      });
      setTimeout(this.args.closeModel, 2000);
    }
  }

  @action
  changeExtensionRequestETA(e) {
    const extensionTime = new Date(e.target.value).getTime() / 1000;

    if (extensionTime < this.args.task.endsOn) {
      this.toast.error(WARNING_INVALID_NEW_ETA, '', {
        ...toastNotificationTimeoutOptions,
        timeOut: '3000',
      });
      e.target.value = '';
      this.createExtensionRequestError =
        'The newEndsOn value cannot be smaller than the oldEndsOn value';
      return;
    } else this.createExtensionRequestError = null;
  }
}
