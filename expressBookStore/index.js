// const { error } = require("console");
require("dotenv/config");
const express = require("express");
const app = express();

const bookRoute = require("./routes/books.routes");
const authorRoute = require("./routes/author.routes");

const { loggerMiddleware } = require("./middlewares/loggers");

// middlewares plugins
app.use(express.json());

// second middleware
app.use(loggerMiddleware);

// routes
app.use("/books", bookRoute);
app.use("/authors", authorRoute);

app.listen(8000, () => console.log("your server is running on port 8000"));
