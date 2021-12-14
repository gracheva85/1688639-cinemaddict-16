import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {COMMENTS_ARRAY} from '../mock/structures.js';
import {adjustElement} from '../utils/film.js';
import {onEscKeyDown} from '../utils/film.js';
import FilmCard from '../view/film-card/film-card.js';
import Popup from '../view/popup/popup.js';

export default class MoviePresenter {
  #film = null;
  #component = null;
  #filmCardComponent = null
  #popupComponent = null;
  #popupContainer = null;
  #comments = COMMENTS_ARRAY;
  #renderFilmComponent = null;
  #changeData = null;

  constructor(popupContainer, changeData) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
  }

  init = (film, component) => {
    this.#film = film;
    this.#component = component;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

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

    this.#renderFilmComponent = adjustElement(this.#component);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this.#renderFilmComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);
    }

    if (this.#renderFilmComponent.contains(prevFilmCardComponent)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#renderFilmComponent.contains(prevPopupComponent)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

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
    document.addEventListener('keydown', (evt) => {
      onEscKeyDown(evt, this.#popupComponent,  this.#popupContainer);
    });
  };

  #replacePopupToFilmList = () => {
    remove(this.#popupComponent);
    this.#popupContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', (evt) => {
      onEscKeyDown(evt, this.#popupComponent,  this.#popupContainer);
    });
  };

  #handleFilmClick = () => {
    this.#replaceFilmToPopup();
  }

  #handlePopupClick = (film) => {
    this.#replacePopupToFilmList();
    this.#changeData(film);
  }

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film.user_details, 'watchlist': !this.#film.user_details.watchlist});
  }

  #handleHistoryClick = () => {
    this.#changeData({...this.#film.user_details, 'already_watched': !this.#film.user_details.already_watched});
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film.user_details, 'favorite': !this.#film.user_details.favorite});
  }
}

