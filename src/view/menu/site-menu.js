import {createSiteMenuTemplate} from './site-menu-tpl.js';
import AbstractView from '../abstract-view.js';

export default class MenuView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createSiteMenuTemplate(this.#filters);
  }
}
