/**
 * config global var
 */
const mongoose = require("mongoose");
const express = require("express");
const subscribersRouter = require("./routes/subscribers");

require("dotenv").config();

const port = 3000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("err", (err) => console.error(err));
db.on("open", () => console.log("Connecting to Mongoose..."));

const app = express();
app.use(express.json());

app.use("/subscribers", subscribersRouter);

app.listen(port, () => console.log(`App is listening on ${port}...`));
