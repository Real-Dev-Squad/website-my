import Component from '@glimmer/component';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { STRONG_TEXT_REGEX } from '../constants/misc';

export default class CardComponent extends Component {
  @action
  handleButtonClick() {
    if (!this.args.onButtonClickEventHandler) return;
    this.args.onButtonClickEventHandler();
  }

  get formattedDescription() {
    if (!this.args?.description) return '';
    return htmlSafe(
      this.args.description.replaceAll(STRONG_TEXT_REGEX, `<strong>$1</strong>`)
    );
  }

  get hasButton() {
    return !!this.args.buttonText;
  }
}
