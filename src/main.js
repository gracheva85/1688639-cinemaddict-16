import {RenderPosition, render} from './utils/render.js';
import {generateFilm} from './mock/structures.js';
import {generateFilter} from './filter.js';
import Profile from './view/profile-view.js';
import Navigation from './view/main-navigation.js';
import MenuView from './view/menu/site-menu.js';
import Stats from './view/stats.js';
import NumberOfFilms from './view/number-of-films.js';
import MovieListPresenter from './presenter/movie-list-presenter.js';

const FILM_COUNT = 22;

const films = Array.from({length: FILM_COUNT}, generateFilm);

const filtres = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('footer');
const siteBodyElement = document.querySelector('body');

//Профиль:
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

// Меню:
const menuComponent = new Navigation();
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);
render(menuComponent, new MenuView(filtres), RenderPosition.BEFOREEND);
render(menuComponent, new Stats(), RenderPosition.BEFOREEND);

//Фильмы, список:
const movieListPresenter = new MovieListPresenter(siteMainElement, siteBodyElement);
movieListPresenter.init(films);

//Количество фильмов
render(siteFooterElement, new NumberOfFilms(films), RenderPosition.BEFOREEND);
