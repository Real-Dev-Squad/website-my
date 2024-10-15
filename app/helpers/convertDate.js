import { helper } from '@ember/component/helper';

const calc = (interval, cycle) => Math.floor(cycle / interval);

const timeDifference = (timestamp, timeNow) => {
  const timeInSec = Math.abs(Math.floor(timeNow - timestamp * 1000) / 1000);
  const mins = calc(60, timeInSec);
  const hours = calc(60, mins);
  const days = calc(24, hours);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (timeInSec < 1) {
    return { result: '', cycle: 'just now' };
  }

  if (years > 0) {
    return { result: years, cycle: 'year' };
  } else if (months > 0) {
    return { result: months, cycle: 'month' };
  } else if (days > 0) {
    return { result: days, cycle: 'day' };
  } else if (hours > 0) {
    return { result: hours, cycle: 'hour' };
  } else if (mins > 0) {
    return { result: mins, cycle: 'minute' };
  } else {
    return { result: '', cycle: 'few seconds' };
  }
};

function convertDate([timestamp], { end_date, timeNow = Date.now() }) {
  if (!timestamp) return 'TBD';
  const time_value = timeDifference(timestamp, timeNow);

  let timeString = `${time_value.result} ${time_value.cycle}${
    time_value.result > 1 ? 's' : ''
  }`;

  if (end_date == 1 && timestamp * 1000 < timeNow) {
    return `${timeString} ago`;
  }

  if (timestamp * 1000 < timeNow) {
    return `${timeString} ago`;
  }

  return `in ${timeString}`;
}

export default helper(convertDate);
