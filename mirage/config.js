import {
  getExtensionReuests,
  createExtensionRequest,
} from './controllers/extension-requests';
import { extensionRequests } from 'website-my/tests/fixtures/extension-requests';
import { Server, Model } from 'ember-cli-mirage';
import ENV from 'website-my/config/environment';

export default function () {
  let server = new Server({
    models: {
      extensionRequest: Model,
    },

    seeds(server) {
      extensionRequests.forEach((obj) => {
        server.create('extensionRequest', obj);
      });
    },

    routes() {
      this.namespace = ENV.BASE_API_URL;

      this.get('extension-requests/self', getExtensionReuests.bind(this));
      this.post('extension-requests', createExtensionRequest.bind(this));
    },
  });

  return server;
}
