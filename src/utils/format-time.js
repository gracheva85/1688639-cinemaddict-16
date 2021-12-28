import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {TIME_PERIOD} from '../consts.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default class FormatTime {
  static getDate = (someDate, format) => dayjs(someDate).format(format);

  static getFullDateWithTime = (date) => dayjs(date).format('YYYY/MM/DD HH:mm')

  static getHumanizeDate = (date) => {
    const dateNow = dayjs();
    const dateComment = dayjs(date);

    const seconds = dateNow.diff(dateComment, 'second');
    const minutes = dateNow.diff(dateComment, 'minute');
    const hours = dateNow.diff(dateComment, 'hour');
    const days = dateNow.diff(dateComment, 'day');
    const months = dateNow.diff(dateComment, 'month');
    const years = dateNow.diff(dateComment, 'year');

    if (seconds < TIME_PERIOD.SECONDS.MAX) {
      return dayjs.duration(-seconds, 'second').humanize(true);
    }

    if (minutes >= TIME_PERIOD.MINUTES.MIN && minutes < TIME_PERIOD.MINUTES.MAX) {
      return dayjs.duration(-minutes, 'minute').humanize(true);
    }

    if (hours >= TIME_PERIOD.HOURS.MIN && hours < TIME_PERIOD.HOURS.MAX) {
      return dayjs.duration(-hours, 'hour').humanize(true);
    }

    if (days >= TIME_PERIOD.DAYS.MIN && days <= TIME_PERIOD.DAYS.MAX) {
      return dayjs.duration(-days, 'day').humanize(true);
    }

    if (months >= TIME_PERIOD.MONTHS.MIN && months <= TIME_PERIOD.MONTHS.MAX) {
      return dayjs.duration(-months, 'month').humanize(true);
    }

    return dayjs.duration(-years, 'year').humanize(true);
  }
}

