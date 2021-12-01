import {createElement} from '../render.js';

export const createFilmTop = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmTop {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmTop();
  }

  removeElement() {
    this.#element = null;
  }
}
