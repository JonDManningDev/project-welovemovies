const knex = require("../db/connection");

const tableName = "movies";

function list(query) {
  if (query.is_showing === "true") {
    return knex(`${tableName} as m`)
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id")
      .orderBy("m.title");
  } else {
    return knex(tableName).select("*");
  }
}

module.exports = {
  list,
};
