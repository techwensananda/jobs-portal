const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const db = require("./db/db");
const port = process.env.PORT || 6000;
const auth = require("./routes/auth.route");
const job = require("./routes/job.route");

app.use(cors());

app.use(express.json());
app.use("/api/v1/auth", auth);
app.use("/api/v1/", job);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  db();
  console.log(`Example app listening on port ${port}`);
});
