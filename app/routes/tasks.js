import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksRoute extends Route {
  model = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks/self`, {
      credentials: 'include',
    });
    const allTasks = await response.json();
    allTasks.map((eachtask) => {
      var task_ending_date = eachtask.endsOn;
      var task_started_on = eachtask.startedOn;
      var date_now = Math.floor(Date.now() / 1000);

      var time_remaining;
      if (task_ending_date - date_now < 0) {
        time_remaining = ' (Overdue! 👀)';
      } else {
        var delta = Math.abs(task_ending_date - date_now);

        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        console.log(days);

        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        time_remaining =
          ' (Time Left : ' +
          days +
          ' days ' +
          hours +
          ' hours ' +
          minutes +
          ' mins) 🐱‍👤';
        console.log(time_remaining);
      }

      var start_day = new Date(task_started_on * 1000);
      var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      var start_year = start_day.getFullYear();
      var start_month = months[start_day.getMonth()];
      var start_date = start_day.getDate();
      var start_hour = start_day.getHours();
      var start_min = start_day.getMinutes();
      var ampm = start_hour >= 12 ? 'pm' : 'am';
      start_hour = start_hour % 12;
      start_hour = start_hour ? start_hour : 12; // the hour '0' should be '12'
      start_min = start_min < 10 ? '0' + start_min : start_min;
      task_started_on =
        start_date +
        ' ' +
        start_month +
        ' ' +
        start_year +
        ' ' +
        start_hour +
        ':' +
        start_min +
        ' ' +
        ampm;
      eachtask.startedOn = task_started_on;

      var end_day = new Date(task_ending_date * 1000);
      var end_year = end_day.getFullYear();
      var end_month = months[end_day.getMonth()];
      var end_date = end_day.getDate();
      var end_hour = end_day.getHours();
      var end_min = end_day.getMinutes();
      ampm = end_hour >= 12 ? 'pm' : 'am';
      end_hour = end_hour % 12;
      end_hour = end_hour ? end_hour : 12;
      end_min = end_min < 10 ? '0' + end_min : end_min;
      task_ending_date =
        end_date +
        ' ' +
        end_month +
        ' ' +
        end_year +
        ' ' +
        end_hour +
        ':' +
        end_min +
        ' ' +
        ampm;
      eachtask.endsOn = task_ending_date + time_remaining;
    });

    return allTasks;
  };
}
