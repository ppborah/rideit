const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const multer = require("multer");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(multer().any());

mongoose
  .connect(
    "mongodb+srv://Geekybytes:fxRyU5A33DSX4SVv@cluster0.oqivm.mongodb.net/Geekybytes?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((result) => console.log("MongoDb is connected / Geekybytes Database"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 4000, function () {
  console.log("Express app running on port " + (process.env.PORT || 4000));
});
