const express = require("express");

const PORT = process.env.PORT || 7000;
const HOST = process.env.HOST || "127.0.0.1";
const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/home-region", function(req, res) {
  res.sendFile(__dirname + "/dist/home-region.html");
});
app.get("/air-passenger-traffic", function(req, res) {
  res.sendFile(__dirname + "/dist/air-passenger-traffic.html");
});
app.get("/airport-visitors", function(req, res) {
  res.sendFile(__dirname + "/dist/airport-visitors.html");
});
app.get("/comparative-analysis", function(req, res) {
  res.sendFile(__dirname + "/dist/comparative-analysis.html");
});
app.get("/", function(req, res) {
  res.redirect("home-region")
});

app.listen(PORT, () => {
  console.log(`Server listens http://${HOST}:${PORT}`)
});