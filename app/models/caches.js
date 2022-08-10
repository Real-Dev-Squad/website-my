import Model, { attr } from '@ember-data/model';

export default class CachesModel extends Model {
  @attr('epochToDate') timestamp;
  @attr count;
}
