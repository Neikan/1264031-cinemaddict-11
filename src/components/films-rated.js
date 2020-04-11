import {Count} from "../consts";
import {createFilmCards} from "./films/films-creation";

/**
 * Создание шаблона списка высокорейтинговых фильмов
 * @param {Array} films список фильмов
 * @return {string} список высокорейтинговых фильмов
 */
const createFilmsRated = (films) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${createFilmCards(films.slice(Count.ZERO, Count.FILMS_EXTRA))}
      </div>
    </section>
  `);
};

export {createFilmsRated};