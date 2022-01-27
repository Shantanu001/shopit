const express = require("express");
const app = express();

const products = require("./routes/products");
const users = require("./routes/users");

const ErrorHandler = require("../backend/middlewares/error");

app.use(express.json());
app.use("/api/v1",products);
app.use("/api/v1",users);
app.use(ErrorHandler);
module.exports = app;