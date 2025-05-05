const knex = require("../db/connection");

const tableName = "reviews";

function destroy(reviewId) {
  return knex(tableName).where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex(tableName).select("*").where({ review_id: reviewId }).first();
}

module.exports = {
  delete: destroy,
  read,
};
