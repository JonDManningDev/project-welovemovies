// This utility function utilizes Lodash to reformat the GET /theaters output into the desired shape, as per theaters_list.md.
// It is an alternative to using reduce-properties.js that I believe is more straightforward and easily comprehensible.
// The function sorts the data from the query into groups based on "theater_id" via _.groupBy().
// Once sorted, the groups are re-formatted into objects with the desired shape via _.map().
// (This also converts the object resulting from _.groupBy() back into an array when returned)
// Within each group, movie data is extracted and reassembled into an array of objects via the standard JS .map() method.
// This movie data array is then inserted into the restructured group data under the "movies" key.

const _ = require("lodash");

function formatTheatersWithMovies(rows) {
  const grouped = _.groupBy(rows, "theater_id");

  return _.map(grouped, (group) => {
    const first = group[0];

    const movies = group
      .map((row) => ({
        movie_id: row.movie_id,
        title: row.title,
        runtime_in_minutes: row.runtime_in_minutes,
        rating: row.rating,
        description: row.description,
        image_url: row.image_url,
        created_at: row.movie_created_at,
        updated_at: row.movie_updated_at,
      }))
      .sort((a, b) => a.movie_id - b.movie_id);

    return {
      theater_id: first.theater_id,
      name: first.name,
      address_line_1: first.address_line_1,
      address_line_2: first.address_line_2,
      city: first.city,
      state: first.state,
      zip: first.zip,
      created_at: first.theater_created_at,
      updated_at: first.theater_updated_at,
      movies,
    };
  });
}

module.exports = formatTheatersWithMovies;
