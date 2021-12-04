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

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupClick();
  }
}
