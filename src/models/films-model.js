import {FilterType, FilmAttribute, Flag} from '../consts';
import {filterRules} from '../utils/components';


/**
 * Создание класса модели данных фильмов
 */
class FilmsModel {
  constructor() {
    this._filmsData = [];
    this._activeFilter = FilterType.ALL;
  }


  /**
   * Метод, обеспечивающий присвоение данным модели текущего значения данных фильмов
   * @param {Array} filmsData
   */
  setFilmsData(filmsData) {
    this._filmsData = filmsData;
  }


  /**
   * Метод, обспечивающий присвоение фильтру текущего значения
   * @param {string} filterType
   */
  setFilter(filterType) {
    this._activeFilter = filterType;
  }


  getFilter() {
    return this._activeFilter;
  }


  /**
   * Метод, обеспечивающий получение полных данных фильмов
   * @return {Array}
   */
  getFilmsData() {
    return this._filmsData;
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в запланированном к просмотру
   * @return {Number}
   */
  getWatchlistFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_WATCH] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в просмотренном
   * @return {Number}
   */
  getWatchedFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_WATCHED] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в избранном
   * @return {Number}
   */
  getFavoriteFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_FAVORITE] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивающий получение отфильтрованных данных фильмов
   * @param {string} filterType название фильтр
   * @return {Array} отфильтрованный массив данных
   */
  getFilteringFilmsData(filterType = this._activeFilter) {
    return filterRules[filterType](this._filmsData);
  }


  /**
   * Метод, обеспечивающий обновление данных фильма в исходных данных
   * @param {Number} id идентификатор элемента в массиве данных фильмов
   * @param {Object} newFilmData обновленные данные фильма
   * @return {Object}
   */
  updateFilmData(id, newFilmData) {
    const index = this._filmsData.findIndex((filmData) => filmData.id === id);

    if (index === -1) {
      return Flag.NO;
    }

    this._updateFilmsData(index, newFilmData);

    return newFilmData;
  }


  /**
   * Метод, обеспечивающий запись новых данных в массив данных
   * @param {Number} index индекс элемента в массиве данных фильмов
   * @param {Object} newFilmData обновленные данные фильма
   */
  _updateFilmsData(index, newFilmData) {
    const newFilmsData = this._filmsData.slice();
    newFilmsData[index] = newFilmData;
    this._filmsData = newFilmsData;
  }
}


export {FilmsModel};
