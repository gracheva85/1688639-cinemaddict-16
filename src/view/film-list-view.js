import {getDate, changeWord, addClassBySubmit} from '../utils.js';

export const createFilmCardTemplate = (film) => {
  const {title, runtime, genre, description, poster} = film['film_info'];
  const rating = film['film_info']['total_rating'];
  const date = film['film_info']['release']['date'];
  const {watchlist} = film['user_details'];
  const watchFilm = film['user_details']['already_watched'];
  const favorite = film['user_details']['favorite'];

  const year = getDate(date, 'YYYY');

  const getTime = () => {
    const hours = Math.trunc(runtime/60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}м`;
  };

  const getDescription = () => {
    const text = description.join(' ');
    const correctText = text.length > 139 ? `${text.slice(0, 139)}...` : text;
    return correctText;
  };


  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${getTime()}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getDescription()}</p>
    <span class="film-card__comments">${film.comments.length} ${changeWord(film.comments, 'comment')}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addClassBySubmit(watchlist, 'film-card__controls-item--active')} type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addClassBySubmit(watchFilm, 'film-card__controls-item--active')}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${addClassBySubmit(favorite, 'film-card__controls-item--active')}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export const createFilmListTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
    </section>
  </section>`
);
