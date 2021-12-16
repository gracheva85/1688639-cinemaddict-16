//import {getDate, changeWord, addClassBySubmit} from '../../utils.js';
import {createFilmPopupTemplate} from './popup-tpl.js';
import AbstractView from '../abstract-view.js';

export default class Popup extends AbstractView {
  #film = null;
  #array = null;

  constructor(film, array) {
    super();
    this.#film = film;
    this.#array = array;
  }

  get template(){
    return createFilmPopupTemplate(this.#film, this.#array,);
  }

  setPopupClickHandler = (callback) => {
    this._callback.popupClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupClickHandler);
  }

  setPopupWatchlistClickHandler = (callback) => {
    this._callback.popupWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#popupWatchlistClickHandler);
  }

  setPopupHistoryClickHandler = (callback) => {
    this._callback.popupHistoryClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#popupHistoryClickHandler);
  }

  setPopupFavoriteClickHandler = (callback) => {
    this._callback.popupFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#popupFavoriteClickHandler);
  }

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupClick(this.#film);
  }

  #popupWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupWatchlistClick();
  }

  #popupHistoryClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupHistoryClick();
  }

  #popupFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupFavoriteClick();
  }
}
