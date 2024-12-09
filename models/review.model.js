const db = require("../utils/db");
const schema = "s21515";
const tableName = "reviews";

module.exports = class Review {
  constructor() {}

  static async getReviewById(movieId) {
    const data = await db.one(
      `SELECT * FROM ${schema}.${tableName} WHERE movieId = $1`,
      movieId
    );

    return data.items;
  }
};
