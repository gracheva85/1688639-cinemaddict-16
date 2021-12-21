import {createFilmCardTemplate} from './film-card-tpl.js';
import AbstractView from '../abstract-view.js';
import {createElement} from '../../utils/render.js';

export default class FilmCard extends AbstractView {
  #film = null;
  #renderedFilms = [];

  constructor(film) {
    super();
    this.#film = film;
  }

  get template(){
    return createFilmCardTemplate(this.#film);
  }

  createCopy() {
    const copy = createElement(this.template);
    copy.querySelector('.film-card__link').addEventListener('click', this.#filmClickHandler);
    copy.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
    copy.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#historyClickHandler);
    copy.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);

    this.#renderedFilms.push(copy);
    return copy;
  }

  get renderedFilms() {
    return this.#renderedFilms;
  }

  setFilmClickHandler = (callback) => {
    this._callback.filmClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setHistoryClickHandler = (callback) => {
    this._callback.historyClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#historyClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #filmClickHandler = (evt) => {
    evt.preventDefault();
    if (document.querySelector('.film-details')) {document.querySelector('.film-details').remove();}
    this._callback.filmClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

    #historyClickHandler = (evt) => {
      evt.preventDefault();
      this._callback.historyClick();
    }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
