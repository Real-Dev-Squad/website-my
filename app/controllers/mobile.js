import MobileRoute from '../routes/mobile';

export default class MobileController extends MobileRoute {
    @service router;

    get isDev() {
        if (this.router.currentRoute) {
          return this.router.currentRoute.queryParams.dev;
        }
        return false;
      }
}
