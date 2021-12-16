import Film from '../view/film.js';
import FilmListContainer from '../view/films-list-container.js';
import ButtonShowMore from '../view/show-more-button-view.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import MoviePresenter from './movie-presenter.js';
import SortView from '../view/sort-view.js';
import {SortType} from '../view/consts.js';
import {sortDate, sortRating, sortComments} from '../utils/common.js';
import {FILM_BLOCKS} from '../view/consts.js';

const FILM_COUNT_PER_STEP = 5;
const EXTRA_CARD_COUNT = 2;

export default class MovieListPresenter {
  #container = null;
  #popupContainer = null;

  #filmsComponent = new Film();
  #filmMainComponent = new FilmListContainer(FILM_BLOCKS.main);
  #filmTopRatedComponent = new FilmListContainer(FILM_BLOCKS.topRated);
  #filmMostCommentedComponent = new FilmListContainer(FILM_BLOCKS.mostCommented);
  #noFilmsComponent = new FilmListContainer(FILM_BLOCKS.empty);
  #buttonShowMoreComponent = new ButtonShowMore();
  #filmCount = FILM_COUNT_PER_STEP;
  #moviePresenter = new Map();
  #sortComponent = new SortView();
  #currentSortType = SortType.DEFAULT;

  #films = [];
  #sourcedFilms = [];

  constructor(container, popupContainer) {
    this.#container = container;
    this.#popupContainer = popupContainer;
  }

  init = (films) => {
    this.#films = [...films];
    this.#sourcedFilms = [...films];

    render(this.#container, this.#sortComponent, RenderPosition.BEFOREEND);
    render(this.#container, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmMainComponent, RenderPosition.BEFOREEND);

    //this.#clearFilmList();
    //this.#clickSort();
    this.#renderFilmsExtraTop();
    this.#renderFilmsExtraComment();
    this.#renderFilmList();
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#moviePresenter.get(updatedFilm.id).init(updatedFilm, this.#filmMainComponent.container);
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

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  }

  #clickSort = () => {
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderFilm = (film, component) => {
    const moviePresenter = new MoviePresenter(this.#popupContainer, this.#handleFilmChange);
    moviePresenter.init(film, component);
    this.#moviePresenter.set(film.id, moviePresenter);
  }

  #renderFilms = (from, to, container, sort) => {
    this.#films
      .sort(sort)
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, container));
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
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#filmCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  }

  #renderNoFilms = () => {
    render(this.#container, this.#noFilmsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsLogic = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP), this.#filmMainComponent.container, SortType.default);
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsExtraTop = () => {
    render(this.#filmsComponent, this.#filmTopRatedComponent, RenderPosition.BEFOREEND);
    this.#renderFilms(0, EXTRA_CARD_COUNT, this.#filmTopRatedComponent.container, sortRating);
  }

  #renderFilmsExtraComment = () => {
    render(this.#filmsComponent, this.#filmMostCommentedComponent, RenderPosition.BEFOREEND);
    this.#renderFilms(0, EXTRA_CARD_COUNT, this.#filmMostCommentedComponent.container, sortComments);
  }

  #renderFilmList = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#clickSort();
    this.#renderFilmsLogic();
  }
}
