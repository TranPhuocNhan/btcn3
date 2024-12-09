const db = require("../utils/db");
const schema = "s21515";
const tableName = "names";
const Movie = require("./movie.model");

module.exports = class Name {
  constructor() {}

  static async getDetailActor(id) {
    return await db.one(
      `SELECT * FROM ${schema}.${tableName} WHERE id = $1`,
      id
    );
  }

  static async getActors(actorList) {
    const actors = [];
    for (let i = 0; i < actorList.length; i++) {
      const actor = await this.getDetailActor(actorList[i]);
      actors.push(actor);
    }
    return actors;
  }

  static async getRelatedMovies(id) {
    const movies = await Movie.getAllMovies();
    const moviesRelated = [];

    for (const movie of movies) {
      for (const actor of movie.actorList) {
        if (actor === id) {
          moviesRelated.push(movie);
        }
      }
    }
    return moviesRelated;
  }
  static async search(q) {
    return await db.any(
      `SELECT * FROM ${schema}.${tableName} WHERE name ILIKE '%$1#%'`,
      q
    );
  }
};
