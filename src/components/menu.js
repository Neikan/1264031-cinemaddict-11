import {Filter} from "../consts";
import {filterCountMenu} from "../mock/menu-filters";

/**
 * Создание разметки главного меню
 * @param {Array} films список фильмов
 * @return {string} разметка главного меню с количеством фильмов по фильтрам
 */
const createMenu = (films) => {
  return (`
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist
        <span class="main-navigation__item-count">${filterCountMenu(films, Filter.IS_WATCH)}</span>
      </a>
      <a href="#history" class="main-navigation__item">History
        <span class="main-navigation__item-count">${filterCountMenu(films, Filter.IS_WATCHED)}</span>
      </a>
      <a href="#favorites" class="main-navigation__item">Favorites
        <span class="main-navigation__item-count">${filterCountMenu(films, Filter.IS_FAVORITE)}</span>
      </a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
`);
};

export {createMenu};