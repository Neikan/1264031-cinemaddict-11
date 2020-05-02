import {createGenresBlock} from "./genres";


/**
 * Создание разметки блока детальной информации
 * @param {Object} details детальная информация
 * @return {string} разметка блока
 */
const createDetails = (details) => {
  return (
    `<table class="film-details__table">
      ${createRows(getRows(details))}
      ${createGenresBlock(details.genres)}
    </table>
    ${createDescription(details.description)}`
  );
};


/**
 * Получение массива элементов для таблицы с детальной информацией о фильме
 * @param {Object} {детальная информация о фильме}
 * @return {Array} массив элементов
 */
const getRows = ({director, screenwriters, actors, releaseDate, duration, country}) =>
  Object.values({director, screenwriters, actors, releaseDate, duration, country});


/**
 * Создание разметки строк таблицы
 * @param {Array} rows массив
 * @return {string} разметка блока
 */
const createRows = (rows) => rows.map(createRow).join(`\n`);


/**
 * Создание разметки строки таблицы
 * @param {Object} {данные строки}
 * @return {string} разметка строки
 */
const createRow = ({name, info}) => {
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${name}</td>
      <td class="film-details__cell">${info}</td>
    </tr>`
  );
};


/**
 * Создание разметки блока описания фильма
 * @param {string} description описание
 * @return {string} разметка блока описания
 */
const createDescription = (description) =>
  `<p class="film-details__film-description">${description}</p>`;


export {createDetails};