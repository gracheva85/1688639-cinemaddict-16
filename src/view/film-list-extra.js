import {createElement} from '../render.js';

export const createFilmListExtra = (heading) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
  </section>`
);

export default class FilmListExtra {
  #element = null;
  #heading = null;

  constructor(heading) {
    this.#heading = heading;
  }


  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmListExtra(this.#heading);
  }

  removeElement() {
    this.#element = null;
  }
}
