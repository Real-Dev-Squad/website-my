import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { UnauthorizedError } from '@ember-data/adapter/error';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    const res = RSVP.hash({
      user: this.store.findRecord('users', 'self'),
      cache: this.store.findRecord('users', 'self'),
      // cache: this.store.findAll('caches'),
    });

    console.log(res);
    return res;
  }

  @action
  error(error) {
    if (error instanceof UnauthorizedError) {
      alert('You are not logged in. Please login to continue.');
      window.open(
        'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
        '_self'
      );
      return;
    }
  }
}

//   model = async () => {
//     const DEFAULT_TIME = 'Cache not cleared in last 24 hours';
//     try {
//       const response = await fetch(`${API_BASE_URL}/logs/cache`, {
//         credentials: 'include',
//       });

//       const logsData = await response.json();
//       const { count, logs } = logsData;

//       if (count != 0) {
//         const timestamp = logs[logs.length - 1].timestamp;

//         const time =
//           new Date(timestamp._seconds * 1000).toString().slice(0, 25) +
//           new Date(timestamp._seconds * 1000).toString().slice(34);
//         return { count, time };
//       }

//       return { count, DEFAULT_TIME };
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
