import Component from '@glimmer/component';
import { action } from '@ember/object';
import { STRONG_TEXT_REGEX } from '../constants/misc';

export default class CardComponent extends Component {
  @action
  handleButtonClick() {
    if (!this.args.onButtonClickEventHandler) return;
    this.args.onButtonClickEventHandler();
  }

  get formattedDescription() {
    if (this.args?.description?.length < 1) return '';
    return this.args.description.replaceAll(
      STRONG_TEXT_REGEX,
      `<strong>$1</strong>`
    );
  }

  get hasButton() {
    return !!this.args.buttonText;
  }
}
