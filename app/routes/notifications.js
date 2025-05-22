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
      this.router.transitionTo('404');
      return;
    }
    // This route is deprecated and redirects to the new site
    // See ticket for context on the redirection strategy
    // https://github.com/Real-Dev-Squad/website-www/issues/1031
    this.router.transitionTo('goto', {
      queryParams: { from: this.routeName },
    });
  }

  async model() {
    let response = await fetch('/api/notification.json');
    let parsed = await response.json();
    return parsed.data;
  }
}
