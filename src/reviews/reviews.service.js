const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

function destroy(reviewId) {
  return knex(tableName).where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex(tableName).select("*").where({ review_id: reviewId }).first();
}

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

async function update(updatedReview) {
  await knex(tableName)
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);

  const unformattedObj = await knex(`${tableName} as r`)
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ "r.review_id": updatedReview.review_id })
    .first();

  return addCritic(unformattedObj);
}

module.exports = {
  delete: destroy,
  read,
  update,
};
