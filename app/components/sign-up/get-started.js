import Component from '@glimmer/component';

export default class GetStartedComponent extends Component {
  get mainHeading() {
    const { state } = this.args;

    return state === 'get-started'
      ? 'Thank you for connecting your GitHub!'
      : 'Congratulations!';
  }

  get subHeading() {
    const { state } = this.args;

    return state === 'get-started'
      ? 'Please complete the signup in order to:'
      : 'Lets get you started on your journey';
  }
}
