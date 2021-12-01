import {createElement} from '../render.js';

const createFilmListTemplate = (films) => `<section class="films-list">
    <h2 class="films-list__title ${films.length !== 0 && 'visually-hidden'}">${films.length !== 0 ? 'All movies. Upcoming' : 'There are no movies in our database'}</h2>
  </section>`;


export default class FilmList {
  #element = null;
  #films = null;

  constructor(films) {
    this.#films = films;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmListTemplate(this.#films);
  }

  removeElement() {
    this.#element = null;
  }
}
