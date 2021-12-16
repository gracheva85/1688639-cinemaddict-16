import AbstractView from './abstract-view.js';

const createFilmListTemplate = () => '<section class="films-list"></section>';

export default class FilmList extends AbstractView {
  get template(){
    return createFilmListTemplate();
  }

}

// Значение отображаемого текста зависит от выбранного фильтра:
//           * All movies – 'There are no movies in our database'
//           * Watchlist — 'There are no movies to watch now';
//           * History — 'There are no watched movies now';
//           * Favorites — 'There are no favorite movies now'.
