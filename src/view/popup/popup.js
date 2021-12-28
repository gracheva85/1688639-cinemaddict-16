import {createFilmPopupTemplate} from './popup-tpl.js';
import SmartView from '../smart-view.js';
import {createElement, render, RenderPosition} from '../../utils/render.js';

const createIdGenerator = () => {
  let lastGeneratedId = 4;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCmmentId = createIdGenerator();

export default class Popup extends SmartView {
  #film = null;
  #array = null;
  #container = null;
  #element = null;
  userEmoji = null;
  userComment = '';

  constructor(film, comments) {
    super();
    this._data = Popup.parseFilmToData(film);
    this._comments = comments;
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmPopupTemplate(this._data, this._comments,);
  }

  saveUserData() {
    if (this.userEmoji !== null) {
      this.#container = document.querySelector('.film-details__add-emoji-label');
      this.#element = createElement(`<img src="images/emoji/${this.userEmoji}.png" width="55" height="55" alt="emoji-${this.userEmoji}">`);
      render(this.#container, this.#element, RenderPosition.BEFOREEND);
      document.getElementById(`emoji-${this.userEmoji}`).setAttribute('checked', 'true');
    }

    if (this.userComment) {
      document.querySelector('.film-details__comment-input').textContent = this.userComment;
    }
  }

  reset = (film) => {
    this.updateData(
      Popup.parseFilmToData(film),
    );
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPopupClickHandler(this._callback.popupClick);
    this.setPopupWatchlistClickHandler(this._callback.popupWatchlistClick);
    this.setPopupHistoryClickHandler(this._callback.popupHistoryClick);
    this.setPopupFavoriteClickHandler( this._callback.popupFavoriteClick);
    this.setDeleteCommentClickHandler(this._callback.clickDelete);
    this.setAddCommentKeydownHandler(this._callback.formKeydown);
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

  setDeleteCommentClickHandler(callback) {
    this._callback.clickDelete = callback;
    this.element.addEventListener('click', this.#deleteCommentClickHandler);
  }

  setAddCommentKeydownHandler(callback) {
    this._callback.formKeydown = callback;
    this.element.querySelector('form').addEventListener('keydown', this.#formKeydownHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emojiItemsClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionInputHandler);
  };

  #emojiItemsClickHandler = (evt) => {
    this.userEmoji = evt.target.value;
    this.updateData({
      emojiIcon: evt.target.value,
      checkedEmojiItem: evt.target.id,
      comment: this.userComment
    });

  }

  #descriptionInputHandler = (evt) => {
    this.userComment = evt.target.value;
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

  #deleteCommentClickHandler = (evt) => {
    if (evt.target.dataset.commentId) {
      evt.preventDefault();
      const commentId = evt.target.dataset.commentId;
      this._callback.clickDelete(commentId);
    }
  }

  #formKeydownHandler = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      if (this._data.comment === '' || this._data.emojiIcon === '') {
        return;
      }
      const newComment = {
        id: String(generateCmmentId()),
        author: 'Ilya O\'Reilly',
        comment: this._data.comment,
        date: new Date(),
        emotion: this._data.emojiIcon,
      };
      this._callback.formKeydown(newComment, newComment.id);
    }
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
