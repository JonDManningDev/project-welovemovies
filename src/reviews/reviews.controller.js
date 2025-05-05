const service = require("./reviews.service");
const asyncHandler = require("../errors/asyncHandler");

// Validation Functiions:

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  } else {
    return next({
      status: 404,
      message: `Review cannot be found.`,
    });
  }
}

// Route Functions:

async function destroy(req, res, next) {
  await service.delete(req.params.reviewId);
  return res.sendStatus(204);
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  res.json({ data: await service.update(updatedReview) });
}

module.exports = {
  delete: [asyncHandler(reviewExists), asyncHandler(destroy)],
  update: [asyncHandler(reviewExists), asyncHandler(update)],
};
