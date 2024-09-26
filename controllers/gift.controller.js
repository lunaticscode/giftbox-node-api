const { createGift, getGiftByCode } = require("../services/gift.service");
const multerUpload = require("../utils/multerUpload");
const { successResponse, failResponse } = require("../utils/response");
const giftController = require("express").Router();

giftController.get("/:code", async (req, res) => {
  const { code = "" } = req.params;

  if (!code) {
    return res.status(400).json(failResponse(`(!) Invalid code "${code}"`));
  }
  const gift = await getGiftByCode(code);
  if (!gift) {
    return res.status(404).json(failResponse(`(!) Cannot find code "${code}"`));
  }
  return res.status(200).json(successResponse("", gift));
});

giftController.post(
  "/",
  multerUpload.single("gift-image"),
  async (req, res) => {
    if (!req.file || !req.file.buffer || !req.file.mimetype) {
      return res
        .status(400)
        .json(failResponse(`(!) Invalid request "File Object".`));
    }
    if (!req.body || !req.body.code) {
      return res.status(400).json(failResponse(`(!) Invalid request "code".`));
    }

    const { buffer: data, mimetype: contentType } = req.file;
    const { code, message = "" } = req.body;

    const createResult = await createGift({
      code,
      image: { data, contentType },
      message,
    });
    if (!createResult) {
      return res.status(500).json(failResponse("(!) Internal Server Error."));
    }
    return res.status(201).json(successResponse("Success to create Gift.", {}));
  }
);

module.exports = giftController;
