import {FilterType, FilmAttribute, Flag, SortType} from '../consts';
import {filterRules, sortRules} from '../utils/components';


/**
 * Создание класса модели данных фильмов
 */
class FilmsModel {
  constructor() {
    this._filmsData = [];
    this._filterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;
  }


  /**
   * Метод, обеспечивающий присвоение данным модели действительных значений данных фильмов
   * @param {Array} filmsData
   */
  setFilmsData(filmsData) {
    this._filmsData = filmsData;
  }


  /**
   * Метод, обспечивающий присвоение фильтру примененного значения
   * @param {string} filterType примененный фильтр
   */
  setFilterType(filterType) {
    this._filterType = filterType;
  }


  /**
   * Метод, обспечивающий присвоение сортировке примененного значения
   * @param {string} sortType примененный тип сортировки
   */
  setSortType(sortType) {
    this._sortType = sortType;
  }


  /**
   * Метод, обеспечивающий получение полных данных фильмов
   * @return {Array} отсортированные данные
   */
  getFilmsData() {
    return this._filmsData;
  }


  /**
   * Метод, обеспечивающий получение значения фильтра
   * @return {string} фильтр
   */
  getFilterType() {
    return this._filterType;
  }


  /**
   * Метод, обеспечивающий получение значения сортировки
   * @return {string} тип сортировки
   */
  getSortType() {
    return this._sortType;
  }


  /**
   * Метод, обеспечивающий получение отсортированных по рейтингу данных фильмов
   * @return {Array} отсортированные данные
   */
  getSortedFilmsDataByRating() {
    return sortRules[SortType.BY_RATING](this.getRatedFilmsData());
  }


  /**
   * Метод, обеспечивающий получение отсортированных по количеству комментариев данных фильмов
   * @return {Array}
   */
  getSortedFilmsDataByComments() {
    return sortRules[SortType.BY_COMMENTS](this.getCommentedFilmsData());
  }


  /**
   * Метод, обеспечивающий получение отсортированных по количеству комментариев данных фильмов
   * @param {string} sortType примененный тип сортировки
   * @return {Array}
   */
  getSortedFilmsData() {
    return sortRules[this._sortType](this._filmsData);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в запланированном к просмотру
   * @return {Number} количество фильмов
   */
  getWatchlistFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_WATCH] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в просмотренном
   * @return {Number} количество фильмов
   */
  getWatchedFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_WATCHED] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в избранном
   * @return {Number} количество фильмов
   */
  getFavoriteFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_FAVORITE] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивающий получение отфильтрованных данных фильмов
   * @param {string} sortType применная сортировка
   * @param {string} filterType примененный фильтр
   * @return {Array} отфильтрованный массив данных
   */
  getFilteringFilmsData() {
    return sortRules[this._sortType](filterRules[this._filterType](this._filmsData));
  }


  /**
   * Метод, выполняющий проверку наличия фильмов с рейтигом среди данных
   * @return {Boolean} результат проверки
   */
  getRatedFilmsData() {
    return filterRules[FilterType.RATED](this._filmsData);
  }


  /**
   * Метод, выполняющий проверку наличия фильмов с рейтигом среди данных
   * @return {Boolean} результат проверки
   */
  getCommentedFilmsData() {
    return filterRules[FilterType.COMMENTED](this._filmsData);
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
