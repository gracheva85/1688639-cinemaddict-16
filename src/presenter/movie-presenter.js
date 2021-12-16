import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {COMMENTS_ARRAY} from '../mock/structures.js';
import FilmCard from '../view/film-card/film-card.js';
import Popup from '../view/popup/popup.js';

export default class MoviePresenter {
  #film = null;
  #component = null;
  #filmCardComponent = null
  #popupComponent = null;
  #popupContainer = null;
  #comments = COMMENTS_ARRAY;
  #changeData = null;

  constructor(popupContainer, changeData) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
  }

  init = (film, component) => {
    this.#film = film;
    this.#component = component;

    let prevFilmCardComponent = this.#filmCardComponent;
    let prevPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCard(film);
    this.#popupComponent = new Popup(film, this.#comments);

    this.#filmCardComponent.setFilmClickHandler(this.#handleFilmClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setHistoryClickHandler(this.#handleHistoryClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#popupComponent.setPopupClickHandler(this.#handlePopupClick);
    this.#popupComponent.setPopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setPopupHistoryClickHandler(this.#handleHistoryClick);
    this.#popupComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this.#component, this.#filmCardComponent, RenderPosition.BEFOREEND);
    }

    if (prevFilmCardComponent !== null && this.#component.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      prevFilmCardComponent = null;
    }

    if (prevPopupComponent !== null && this.#component.element.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      prevPopupComponent = null;
    }
    // remove - метод академии, не работает, пока оставлю.
    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  }

  #replaceFilmToPopup = () => {
    render( this.#popupContainer, this.#popupComponent, RenderPosition.BEFOREEND);
    this.#popupContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replacePopupToFilmList = () => {
    remove(this.#popupComponent);
    this.#popupContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePopupToFilmList();
    }
  }

  #handleFilmClick = () => {
    this.#replaceFilmToPopup();
  }

  #handlePopupClick = (film) => {
    this.#replacePopupToFilmList();
    this.#changeData(film);
  }

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film, ...this.#film.user_details, 'watchlist': !this.#film.user_details.watchlist});

  }

  #handleHistoryClick = () => {
    this.#changeData({...this.#film, ...this.#film.user_details, 'already_watched': !this.#film.user_details.already_watched});
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, ...this.#film.user_details, 'favorite': !this.#film.user_details.favorite});
  }
}
