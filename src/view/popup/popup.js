import {createFilmPopupTemplate} from './popup-tpl.js';
import SmartView from '../smart-view.js';
export default class Popup extends SmartView {
  #film = null;
  #array = null;

  constructor(film, array) {
    super();
    this._data = Popup.parseFilmToData(film);
    this.#array = array;
    this.#setInnerHandlers();
  }

  get template(){
    return createFilmPopupTemplate(this._data, this.#array,);
  }


  reset = (film) => {
    this.updateData(
      Popup.parseFilmToData(film),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPopupClickHandler(this._callback.popupClick);
    this.setPopupWatchlistClickHandler(this._callback.popupWatchlistClick);
    this.setPopupHistoryClickHandler(this._callback.popupHistoryClick);
    this.setPopupFavoriteClickHandler( this._callback.popupFavoriteClick);
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

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emojiItemsClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionInputHandler);
  };

  #emojiItemsClickHandler = (evt) => {
    this.updateData({
      emojiIcon: evt.target.value,
      checkedEmojiItem: evt.target.id,
    });
  }

  #descriptionInputHandler = (evt) => {
    this.element.querySelector('.film-details__comment-input').textContent = evt.target.value;
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupClick(Popup.parseDataToFilm(this._data));
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

  static parseFilmToData = (film) => ({...film,
    emojiIcon: '',
    checkedEmojiItem: '',
    comment: '',
    isDisabled: false,
  });

  static parseDataToFilm = (data) => {
    const film = {...data};
    delete film.emojiIcon;
    delete film.checkedEmojiItem;
    delete film.comment;
    delete film.isDisabled;

    return film;
  };

}
