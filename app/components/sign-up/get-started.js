import Component from '@glimmer/component';

export default class GetStartedComponent extends Component {
  get mainHeading() {
    const { what } = this.args;

    return what === 'get-started'
      ? 'Thank you for connecting your GitHub!'
      : 'Congratulations!';
  }

  get subHeading() {
    const { what } = this.args;

    return what === 'get-started'
      ? 'Please complete the signup in order to:'
      : 'Lets get you started on your journey';
  }
}
