const db = require("../db_init");

const { String, Buffer } = db.Schema.Types;
const giftSchema = new db.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const GiftModel = db.model("Gift", giftSchema);
module.exports = GiftModel;
