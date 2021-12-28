import {RenderPosition, render, remove} from './utils/render.js';
import {generateFilm} from './mock/structures.js';
import {COMMENTS_ARRAY} from './mock/structures.js';
import {FilterType} from './consts.js';
import Profile from './view/profile-view.js';
import NumberOfFilms from './view/number-of-films.js';
import MovieListPresenter from './presenters/movie-list-presenter.js';
import MoviesModel from './models/movies-model.js';
import CommentsModel from './models/comments-model.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenters/filter-presenter.js';
import Statistics from './view/statistics/statistics.js';
import Menu from './view/menu-view.js';

const FILM_COUNT = 22;

const films = Array.from({length: FILM_COUNT}, generateFilm);

const moviesModel = new MoviesModel();
moviesModel.films = films;

const commentsModel = new CommentsModel();
commentsModel.comments = COMMENTS_ARRAY;

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('footer');
const siteBodyElement = document.querySelector('body');

//Профиль:
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

//Меню:
const siteMenu = new Menu();
render(siteMainElement, siteMenu, RenderPosition.BEFOREEND);

//Фильмы, список:
const movieListPresenter = new MovieListPresenter(siteMainElement, siteBodyElement, moviesModel, commentsModel, filterModel);
new FilterPresenter(siteMenu, filterModel, moviesModel);

//Количество фильмов
render(siteFooterElement, new NumberOfFilms(films), RenderPosition.BEFOREEND);

//Cтатистика
let statisticsComponent = null;

const handleSiteMenuClick = (target) => {
  const menuCurrentType = target.dataset.filter;
  const menuActive = document.querySelector('.main-navigation__item--active');
  const menuStats = document.querySelector('.main-navigation__additional');

  switch (menuCurrentType) {
    case FilterType.ALL:
    case FilterType.WATCHLIST:
    case FilterType.HISTORY:
    case FilterType.FAVORITES:
      remove(statisticsComponent);
      movieListPresenter.destroy();
      movieListPresenter.init();
      menuStats.classList.remove('main-navigation__item--active');
      target.classList.add('main-navigation__item--active');
      break;

    case FilterType.STATS:
      movieListPresenter.destroy();
      statisticsComponent = new Statistics(moviesModel.films);
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      statisticsComponent.getCharts(moviesModel.films);
      menuActive.classList.remove('main-navigation__item--active');
      menuStats.classList.add('main-navigation__item--active');
      break;
  }
};

siteMenu.setMenuClickHandler(handleSiteMenuClick);
