const fs = require("fs");
const express = require("express");
const mustacheExpress = require("mustache-express");
const Gun = require("gun");
const app = express();
const basicAuth = require("express-basic-auth");

const config = {
  user: JSON.parse(fs.readFileSync(__dirname + "/config.json")),
  default: JSON.parse(fs.readFileSync(__dirname + "/config.default.json"))
};
const getConfig = value => {
  return config.user[value] !== undefined
    ? config.user[value]
    : config.default[value];
};
const port = getConfig("port");
const domain = getConfig("domain");

app.engine("mustache", mustacheExpress());

app.use(Gun.serve, express.static(__dirname + "/static"));
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get(
  "/",
  basicAuth({
    challenge: true,
    users: {
      [getConfig("username")]: getConfig("password")
    }
  }),
  (_req, res) => {
    res.render("index", {
      title: getConfig("title"),
      description: getConfig("description"),
      domain: domain,
      port: port
    });
  }
);

app.get("/display", (_req, res) => {
  res.render("display", { domain: domain, port: port });
});

const server = app.listen(port, () =>
  console.log(`🍌 running on port ${port}!`)
);
Gun({ web: server });
