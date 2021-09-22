const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const clientRouter = require("./client/routes/route");
require("./models/main");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use("/", clientRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;