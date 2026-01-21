import { helper } from '@ember/component/helper';

function getStepperStepDataTestSelector([index], { completedSteps }) {
  if (index < completedSteps) {
    return 'completed';
  } else if (index === completedSteps) {
    return 'active';
  } else {
    return 'idle';
  }
}

export default helper(getStepperStepDataTestSelector);
