const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.end("Home page");
});
app.get("/contact-us", function (req, res) {
  res.end("you can contact me ");
});
app.get("/tweets", function (req, res) {
  res.end("here are your tweets");
});
app.post("/tweets", function (req, res) {
  res.status(201).end("tweets created successfully");
});

app.listen(8000, () => console.log("your server is running on port 8000"));
