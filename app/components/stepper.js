import Component from '@glimmer/component';

export default class StepperComponent extends Component {
  get arePropsValid() {
    const { totalSteps, completedSteps } = this.args;
    return (
      Number.isInteger(totalSteps) &&
      Number.isInteger(completedSteps) &&
      totalSteps > 0
    );
  }

  get numberOfSteps() {
    const times = Number.parseInt(this.args.totalSteps, 10);
    return new Array(times);
  }
}
