
// import {StatsTime} from '../consts.js';
import {getTotalDuration, getTopGenre} from '../../utils/statistics.js';
import {getHourFromMin} from '../../utils/common.js';

const createFilterItemTemplate = (filter, currentFilter) => {
  const {name, type} = filter;
  const checkedFilter = type === currentFilter ? 'checked' : '';

  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${checkedFilter}>
      <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`;
};

const createStatsScreenTemplate = (films, currentFilter, filters) => {
  const totalDuration = getHourFromMin(getTotalDuration(films));
  const topGenre = getTopGenre(films);

  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Movie buff</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
  ${filterItemsTemplate}
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${films.length}<span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${totalDuration.hours} <span class="statistic__item-description">h</span> ${totalDuration.mins} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000" height="250"></canvas>
  </div>

</section>`;
};

export {createStatsScreenTemplate};
