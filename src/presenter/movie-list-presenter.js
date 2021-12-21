import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../view/consts.js';
import {sortDate, sortRating, sortComments} from '../utils/common.js';
import {FILM_BLOCKS} from '../view/consts.js';
import {COMMENTS_ARRAY} from '../mock/structures.js';
import SortView from '../view/sort-view.js';
import Film from '../view/film.js';
import FilmListContainer from '../view/films-list-container.js';
import FilmCard from '../view/film-card/film-card.js';
import Popup from '../view/popup/popup.js';
import ButtonShowMore from '../view/show-more-button-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

export default class MovieListPresenter {
  #container = null;
  #popupContainer = null;
  #popupComponent = null;
  #sortComponent = null;

  #filmsComponent = new Film();
  #filmMainComponent = new FilmListContainer(FILM_BLOCKS.main);
  #filmTopRatedComponent = new FilmListContainer(FILM_BLOCKS.topRated);
  #filmMostCommentedComponent = new FilmListContainer(FILM_BLOCKS.mostCommented);
  #noFilmsComponent = new FilmListContainer(FILM_BLOCKS.empty);
  #buttonShowMoreComponent = new ButtonShowMore();
  #filmCards = new Map();

  #filmCount = FILM_COUNT_PER_STEP;
  #comments = COMMENTS_ARRAY;
  #currentSortType = SortType.DEFAULT;
  #mode = Mode.DEFAULT

  #films = [];
  #sourcedFilms = [];

  constructor(container, popupContainer) {
    this.#container = container;
    this.#popupContainer = popupContainer;
  }

  init = (films) => {
    this.#films = [...films];
    this.#sourcedFilms = [...films];

    this.#renderFilmList();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#container, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilm = (data, filmListElement) => {
    const prevFilmCardComponent = this.#filmCards.get(data.id);

    if (prevFilmCardComponent && filmListElement && filmListElement !== prevFilmCardComponent.element.parentNode) {
      render(filmListElement, prevFilmCardComponent.createCopy(), RenderPosition.BEFOREEND);
      return;
    }

    const filmCardComponent = new FilmCard(data);
    this.#filmCards.set(data.id, filmCardComponent);

    filmCardComponent.setFilmClickHandler(() => {
      this.#createPopup(data);
      this.#mode = Mode.EDITING;
    });

    filmCardComponent.setWatchlistClickHandler(() => {
      this.#filmUpdate({...data, 'user_details': {...data.user_details, watchlist: !data.user_details.watchlist}});
    });

    filmCardComponent.setHistoryClickHandler(() => {
      this.#filmUpdate({...data,
        'user_details': {...data.user_details,
          'already_watched': !data.user_details.already_watched,
          'watching_date': !data.user_details.already_watched ? new Date() : null}});
    });

    filmCardComponent.setFavoriteClickHandler(() => {
      this.#filmUpdate({...data, 'user_details': {...data.user_details, favorite: !data.user_details.favorite}});
    });

    if (!prevFilmCardComponent) {
      render(filmListElement, filmCardComponent.createCopy(), RenderPosition.BEFOREEND);
      return;
    }

    if (!filmListElement) {
      prevFilmCardComponent.renderedFilms.forEach((film) => {
        replace(filmCardComponent.createCopy(), film);
      });
    }

    remove(prevFilmCardComponent);
  }

  #onEscKeyDown = (evt, data) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup(data);
      document.removeEventListener('keydown', () => {this.#onEscKeyDown(evt, data);});
      this.#mode = Mode.DEFAULT;
    }
  };

  #createPopup = (data) => {
    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new Popup(data, this.#comments);
    render(this.#popupContainer, this.#popupComponent, RenderPosition.BEFOREEND);

    this.#popupContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', (evt) => {this.#onEscKeyDown(evt, data);});

    this.#popupComponent.setPopupClickHandler(() => {
      this.#closePopup(data);
      this.#mode = Mode.DEFAULT;
    });

    this.#popupComponent.setPopupWatchlistClickHandler(() => {
      this.#filmUpdate({...data, 'user_details': {...data.user_details, watchlist: !data.user_details.watchlist}});
    });

    this.#popupComponent.setPopupHistoryClickHandler(() => {
      this.#filmUpdate({...data,
        'user_details': {...data.user_details,
          'already_watched': !data.user_details.already_watched,
          'watching_date': !data.user_details.already_watched ? new Date() : null}});
    });

    this.#popupComponent.setPopupFavoriteClickHandler(() => {
      this.#filmUpdate({...data, 'user_details': {...data.user_details, favorite: !data.user_details.favorite}});

    });

    if (this.#mode === Mode.EDITING) {
      const scrollPoint = prevPopupComponent.element.scrollTop;
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = scrollPoint;
    }

    remove(prevPopupComponent);
  }

  #closePopup = (data) => {
    this.#popupComponent.reset(data);
    remove(this.#popupComponent);
    this.#popupContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', (evt) => {this.#onEscKeyDown(evt, data);});
  };

  #filmUpdate = (updatedData) => {
    this.#films = updateItem(this.#films, updatedData);
    this.#renderFilm(updatedData);

    if (this.#mode === Mode.EDITING) {
      this.#createPopup(updatedData);
    }
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  }

  #renderFilms = (from, to, container, sort) => {
    this.#films
      .sort(sort)
      .slice(from, to)
      .forEach((film) => {
        this.#renderFilm(film, container);
      });
  }

  #handlerShowMoreButtonClick = () => {
    this.#renderFilms(this.#filmCount, this.#filmCount + FILM_COUNT_PER_STEP, this.#filmMainComponent.container, SortType.default);
    this.#filmCount += FILM_COUNT_PER_STEP;

    if (this.#filmCount >= this.#films.length) {
      remove(this.#buttonShowMoreComponent);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmMainComponent, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this.#buttonShowMoreComponent.setClickHandler(this.#handlerShowMoreButtonClick);
  }

  #clearFilmList = () => {
    this.#filmCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
    remove(this.#sortComponent);
    remove(this.#filmMainComponent);
    remove(this.#filmTopRatedComponent);
    remove(this.#filmMostCommentedComponent);
  }

  #renderNoFilms = () => {
    render(this.#container, this.#noFilmsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsLogic = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP), this.#filmMainComponent.container, SortType.default);
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }

    render(this.#filmsComponent, this.#filmTopRatedComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmMostCommentedComponent, RenderPosition.BEFOREEND);

    this.#renderFilms(0, EXTRA_FILM_COUNT, this.#filmTopRatedComponent.container, sortRating);
    this.#renderFilms(0, EXTRA_FILM_COUNT, this.#filmMostCommentedComponent.container, sortComments);
  };

  #renderFilmList = () => {
    this.#renderSort();
    render(this.#container, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmMainComponent, RenderPosition.BEFOREEND);

    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilmsLogic();
  }
}
