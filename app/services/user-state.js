import Service from '@ember/service';

export default class UserStateService extends Service {
  state = new Map();

  get(key) {
    return this.state.get(key);
  }

  add(key, value) {
    this.state.set(key, value);
  }

  remove(key) {
    this.state.delete(key);
  }

  empty() {
    this.state.clear();
  }
}
