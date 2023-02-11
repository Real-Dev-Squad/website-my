import { find } from '@ember/test-helpers';

async function waitForNode(classname) {
  return new Promise((resolve) => {
    let intervalId = setInterval(() => {
      if (find(classname)) {
        clearInterval(intervalId);
        resolve();
      }
    }, 50);
  });
}

export { waitForNode };
