import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import {AMOUNT_OF_TIME} from '../consts.js';

dayjs.extend(isBetween);

const currentDate = new Date();
const weekDate = dayjs().subtract(AMOUNT_OF_TIME.DAY, 'day').toDate();
const monthDate = dayjs().subtract(AMOUNT_OF_TIME.MONTH, 'month').toDate();
const yearDate = dayjs().subtract(AMOUNT_OF_TIME.YEAR, 'year').toDate();

const filmsToFilterMap = {
  'all-time': (films) => films.filter((film) => film['user_details']['already_watched']),
  today: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isSame(currentDate, 'day')),
  week: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isBetween(weekDate, currentDate)),
  month: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isBetween(monthDate, currentDate)),
  year: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isBetween(yearDate, currentDate)),
};

const getTotalDuration = (films) => {
  if (films.length === 0) {
    return '';
  }

  return films
    .map(({ film_info: { runtime } }) => runtime)
    .reduce((a, b) => a + b, 0);
};

const getGenres = (films) => {
  const genresForStatistics = {};

  films
    .reduce((acc, film) => acc.concat(film['film_info']['genre']), [])
    .forEach((genre) => {
      if (genresForStatistics[genre]) {
        genresForStatistics[genre]++;
        return;
      }
      genresForStatistics[genre] = 1;
    });

  return genresForStatistics;
};

const getTopGenre = (films) => {
  if (films.length === 0) {
    return '';
  }

  const genresForStatistics = getGenres(films);
  const topGenreStatistics = Object.entries(genresForStatistics).sort((a, b) => b[1] - a[1])[0];

  const topGenreName = topGenreStatistics[0];
  return topGenreName;
};

export {filmsToFilterMap, getTotalDuration, getGenres, getTopGenre};
