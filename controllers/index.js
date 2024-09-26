const apiController = require("express").Router();
const apiMiddleware = require("../middlewares/api.middleware");
const giftController = require("./gift.controller");

apiController.use("/gift", apiMiddleware, giftController);
module.exports = apiController;
