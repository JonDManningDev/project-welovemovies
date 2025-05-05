const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const tableName = "movies";

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  critic_created_at: "critic.created_at",
  critic_updated_at: "critic.updated_at",
});

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

function read(movieId) {
  return knex(tableName).select("*").where({ movie_id: movieId }).first();
}

function listMovieInTheaters(movieId) {
  return knex(`${tableName} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId, "mt.is_showing": true });
}

async function listMovieReviews(movieId) {
  const unformattedArr = await knex(`${tableName} as m`)
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.*",
      "c.critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "m.movie_id": movieId });

  return unformattedArr.map((row) => {
    return addCritic({
      ...row,
    });
  });
}

module.exports = {
  list,
  listMovieInTheaters,
  listMovieReviews,
  read,
};
