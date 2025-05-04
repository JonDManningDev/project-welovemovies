const service = require("./movies.service");
const asyncHandler = require("../errors/asyncHandler");

// Validation Functions:

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    return next({
      status: 404,
      message: "Movie cannot be found.",
    });
  }
}

// Route Functions:

async function list(req, res, next) {
  const query = req.query;
  res.json({ data: await service.list(query) });
}

async function listMovieReviews(req, res, next) {
  res.json({ data: await service.listMovieReviews(req.params.movieId) });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function listMovieInTheaters(req, res, next) {
  res.json({ data: await service.listMovieInTheaters(req.params.movieId) });
}

module.exports = {
  list: asyncHandler(list),
  listMovieReviews: [asyncHandler(movieExists), asyncHandler(listMovieReviews)],
  read: [asyncHandler(movieExists), asyncHandler(read)],
  listMovieInTheaters: [
    asyncHandler(movieExists),
    asyncHandler(listMovieInTheaters),
  ],
  
};
