const GiftModel = require("../models/gift.model");
function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const getGiftByCode = async (code) => {
  if (!code) return null;
  try {
    const gift = await GiftModel.findOne({ code });
    if ("_doc" in gift) {
      const { __v, _id, ...resultGiftData } = gift._doc;
      const base64 = arrayBufferToBase64(resultGiftData.image.data);
      return {
        base64,
        message: resultGiftData.message,
        contentType: resultGiftData.image.contentType,
      };
    } else {
      const base64 = arrayBufferToBase64(gift.image.data);
      return {
        base64,
        message: gift.message,
        contentType: gift.image.contentType,
      };
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createGift = async (data) => {
  try {
    // const file = new File({
    //   filename: image.originalname,
    //   contentType: image.contentType,
    //   length: image.buffer.length,
    // });
    // console.log(file);
    await GiftModel.create(data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getGiftByCode,
  createGift,
};
