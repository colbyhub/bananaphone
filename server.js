const fs = require("fs");
const express = require("express");
const mustacheExpress = require("mustache-express");
const Gun = require("gun");
const app = express();

const config = {
  user: JSON.parse(fs.readFileSync("./config.json")),
  default: JSON.parse(fs.readFileSync("./config.default.json"))
};
const port = config.user.port || config.default.port;
const domain = config.user.domain || config.default.domain;

app.engine("mustache", mustacheExpress());

app.use(Gun.serve, express.static("static"));
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/", (_req, res) => {
  res.render("index", {
    title: config.user.title || config.default.title,
    description: config.user.description || config.default.description,
    domain: domain,
    port: port
  });
});

app.get("/display", (_req, res) => {
  res.render("display", { domain: domain, port: port });
});

const server = app.listen(port, () =>
  console.log(`🍌 running on port ${port}!`)
);
Gun({ web: server });
