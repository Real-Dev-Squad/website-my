import Transform from '@ember-data/serializer/transform';

export default class EpochToDateTransform extends Transform {
  deserialize(serialized) {
    return new Date(serialized * 1000).toString();
  }

  serialize(deserialized) {
    return deserialized;
  }
}
