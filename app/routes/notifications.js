import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NotificationsRoute extends Route {
  @service router;
  queryParams = {
    dev: {
      refreshModel: false,
    },
  };
  beforeModel(transition) {
    if (transition?.to?.queryParams?.dev !== 'true') {
      this.router.transitionTo('');
    }
  }
  async model(params) {
    let response = await fetch('/api/notification.json');
    let parsed = await response.json();
    return parsed.data;
  }
}
