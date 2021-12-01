import {createElement} from '../render.js';

const createStats = () => (
  '<a href="#stats" class="main-navigation__additional">Stats</a>'
);

export default class Stats {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createStats();
  }

  removeElement() {
    this.#element = null;
  }
}
