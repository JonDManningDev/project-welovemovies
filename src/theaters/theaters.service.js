const knex = require("../db/connection");
const formatTheatersWithMovies = require("../utils/format-theaters");

const tableName = "theaters";

async function list() {
  const unformattedArr = await knex(`${tableName} as t`)
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "t.*",
      "m.*",
      "t.created_at as theater_created_at",
      "t.updated_at as theater_updated_at",
      "m.created_at as movie_created_at",
      "m.updated_at as movie_updated_at"
    )
    .where({ "mt.is_showing": true })
    .orderBy(["t.theater_id", { column: "m.movie_id", order: "asc" }]);

  return formatTheatersWithMovies(unformattedArr);
}

module.exports = {
  list,
};
