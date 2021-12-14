import Film from '../view/film.js';
import FilmList from '../view/film-list.js';
import FilmListContainer from '../view/films-list-container.js';
import ButtonShowMore from '../view/show-more-button-view.js';
import FilmListExtra from '../view/film-list-extra.js';
import FilmTop from '../view/film-top.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {updateItem} from '../utils/film.js';
import HeadingFilmList from '../view/heading-film-list.js';
import MoviePresenter from './movie-presenter.js';
import SortView from '../view/sort-view.js';
import {SortType} from '../utils/const.js';
import {sortDate, sortRating, sortComments} from '../utils/film.js';

const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter {
  #container = null;
  #popupContainer = null;

  #filmsComponent = new Film();
  #filmListComponent = new FilmList(); /* ??? */
  #filmContainerComponent = new FilmListContainer();
  #listExtraTopComponent = new FilmListExtra('Top rated');
  #listExtraCommentedComponent = new FilmListExtra('Most commented');
  #filmTopComponent = new FilmTop();
  #filmMostCommented = new FilmTop();
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
    render(this.#filmsComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);

    this.#renderListExtra();
    this.#renderFilmList();
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#moviePresenter.get(updatedFilm.id).init(updatedFilm);
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
    this.#renderListExtra();
  }

  #renderFilm = (film, component) => {
    const moviePresenter = new MoviePresenter(this.#popupContainer, this.#handleFilmChange);
    moviePresenter.init(film, component);
    this.#moviePresenter.set(film.id, moviePresenter);
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, this.#filmContainerComponent));
  }

  #renderHeadingFilmList= () => {
    const headingFilmListComponent = new HeadingFilmList(this.#films);
    render(this.#filmListComponent, headingFilmListComponent, RenderPosition.BEFOREEND);
  }

  #handlerShowMoreButtonClick = () => {
    this.#renderFilms(this.#filmCount, this.#filmCount + FILM_COUNT_PER_STEP);
    this.#filmCount += FILM_COUNT_PER_STEP;

    if (this.#filmCount >= this.#films.length) {
      remove(this.#buttonShowMoreComponent);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmListComponent, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this.#buttonShowMoreComponent.setClickHandler(this.#handlerShowMoreButtonClick);
  }

  #renderListExtra = () => {
    if (this.#films.length > 0) {
      render(this.#filmsComponent, this.#listExtraTopComponent, RenderPosition.BEFOREEND);
      render(this.#listExtraTopComponent, this.#filmTopComponent, RenderPosition.BEFOREEND);
      const topLength = this.#listExtraTopComponent.element.querySelector('.films-list__container').children.length;

      if (topLength < 2) {
        for (const film of this.#films.sort(sortRating).slice(0, 2)) {
          this.#renderFilm(film, this.#filmTopComponent);
        }
      }

      render(this.#filmsComponent, this.#listExtraCommentedComponent, RenderPosition.BEFOREEND);
      render(this.#listExtraCommentedComponent, this.#filmMostCommented, RenderPosition.BEFOREEND);
      const commentsLength = this.#listExtraCommentedComponent.element.querySelector('.films-list__container').children.length;

      if (commentsLength < 2) {
        for (const film of this.#films.sort(sortComments).slice(0, 2)) {
          this.#renderFilm(film, this.#filmMostCommented);
        }
      }
    }
  }

  #clearFilmList = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#filmCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
    remove(this.#listExtraTopComponent);
  }

  #renderFilmsLogic = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilmList = () => {
    this.#clickSort();
    this.#renderHeadingFilmList();
    this.#renderFilmsLogic();
  }
}
