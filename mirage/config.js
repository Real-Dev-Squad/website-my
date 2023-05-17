import {
  getExtensionReuests,
  createExtensionRequest,
} from './controllers/extension-requests';
import { Server, Model } from 'ember-cli-mirage';
import ENV from 'website-my/config/environment';

export default function () {
  let server = new Server({
    models: {
      extensionRequest: Model,
    },

    routes() {
      this.namespace = ENV.BASE_API_URL;

      this.get('extension-requests/self', getExtensionReuests.bind(this));
      this.post('extension-requests', createExtensionRequest.bind(this));
    },
  });

  return server;
}
