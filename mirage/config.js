import {
  getExtensionReuests,
  createExtensionRequest,
} from './controllers/extension-requests';
import { extensionRequests } from 'website-my/tests/fixtures/extension-requests';
import { Server, Model } from 'ember-cli-mirage';

export default function () {
  new Server({
    models: {
      extensionRequest: Model,
    },

    seeds(server) {
      extensionRequests.forEach((obj) => {
        server.create('extensionRequest', obj);
      });
    },

    routes() {
      this.namespace = 'mock-api';
      this.get(`extensionRequests/self`, getExtensionReuests.bind(this));
      this.post(`extensionRequests`, createExtensionRequest.bind(this));
    },
  });
}
