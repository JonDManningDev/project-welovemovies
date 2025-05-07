const service = require("./theaters.service");
const asyncHandler = require("../errors/asyncHandler");

async function list(req, res, next) {
    return res.json({ data: await service.list() });
}

module.exports = {
    list: asyncHandler(list),
};