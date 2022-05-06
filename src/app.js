const express = require("express");
const app = express();
const productsRouter = require("./products/products.router");
const usersRouter = require("./users/users.router");
const surveysRouter = require("./surveys/surveys.router");
const avatarsRouter = require("./avatars/avatars.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/surveys", surveysRouter);
app.use("/avatars", avatarsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;