import {createFilmCardTemplate} from './film-card-tpl.js';
import AbstractView from '../abstract-view.js';

export default class FilmCard extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template(){
    return createFilmCardTemplate(this.#film);
  }

  setFilmClickHandler = (callback) => {
    this._callback.filmClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmClickHandler);
  }

  #filmClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmClick();
  }
}
