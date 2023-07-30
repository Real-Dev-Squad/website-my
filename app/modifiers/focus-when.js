import { modifier } from 'ember-modifier';

export default modifier(function focusWhen(element, [isFocused]) {
  if (isFocused) {
    element.focus();
  }
});
