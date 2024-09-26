require("dotenv").config();
const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const apiController = require("./controllers");

const app = express();
const PORT = process.env.APP_PORT;

const limiter = rateLimit({
  windowMs: 1000,
  limit: 3,
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(express.json());

app.use("/api", apiController);

app.listen(PORT, () => {
  console.log(`Express Running on ${PORT}.`);
});
