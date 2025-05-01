const service = require("./movies.service");
const asyncHandler = require("../errors/asyncHandler");

async function list(req, res, next) {
  const query = req.query;
  res.json({ data: await service.list(query) });
}

module.exports = {
  list: asyncHandler(list),
};
