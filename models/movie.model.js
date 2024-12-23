const { Network } = require("inspector/promises");
const db = require("../utils/db");
const schema = "s21515";
const tableMovieName = "movies";
const tableFavMovieName = "favmovies";

module.exports = class Movie {
  constructor() {}

  static async getMoviesRating() {
    return await db.any(
      `SELECT * FROM ${schema}.${tableMovieName} WHERE ratings IS NOT NULL ORDER BY ratings DESC LIMIT 5`
    );
  }
  static async getTopBoxOfficeMovies() {
    const topBoxOfficeMovies = [];
    const tmp = await db.any(
      `SELECT * FROM ${schema}.${tableMovieName} WHERE boxOffice IS NOT NULL ORDER BY boxOffice DESC LIMIT 15`
    );
    for (let i = 0; i < 5; i++) {
      topBoxOfficeMovies.push(tmp.slice(3 * i, 3 * i + 3));
    }
    return topBoxOfficeMovies;
  }
  static async getAllMovies() {
    return await db.any(`SELECT * FROM ${schema}.${tableMovieName}`);
  }
  static async getMovieById(id) {
    return await db.one(
      `SELECT * FROM ${schema}.${tableMovieName} WHERE id = $1`,
      id
    );
  }

  static async getTopFavMovies() {
    const temp = await db.any(
      `SELECT * FROM ${schema}.${tableFavMovieName} ORDER BY rank DESC LIMIT 15`
    );
    const topFavMovies = [];
    for (let i = 0; i < 5; i++) {
      topFavMovies.push(temp.slice(i * 3, 3 * i + 3));
    }
    return topFavMovies;
  }

  static async getAllFavMovies() {
    return await db.any(
      `SELECT * FROM ${schema}.${tableFavMovieName} ORDER BY rank DESC`
    );
  }

  static async search(q) {
    const searchByTitle = await db.any(
      `SELECT * FROM ${schema}.${tableMovieName} WHERE title ILIKE $1`,
      [`%${q}%`]
    );

    const searchByGenre = await db.any(
      `
    SELECT *
    FROM ${schema}.${tableMovieName}
    WHERE EXISTS (
        SELECT 1
        FROM jsonb_array_elements(genrelist) AS genre
        WHERE LOWER(genre->>'key') = LOWER($1)
    );
    `,
      [q] // Thay q bằng giá trị bạn muốn tìm kiếm
    );

    return [...searchByTitle, ...searchByGenre];
  }
};
