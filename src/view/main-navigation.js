import {createElement} from '../render.js';

const createMainNavigation = () => (
  '<nav class="main-navigation"></nav>'
);

export default class Navigation {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createMainNavigation();
  }

  removeElement() {
    this.#element = null;
  }
}
