const fs = require("fs");
const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
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
const getDateTime = () => {
  return {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };
};

app.engine("mustache", mustacheExpress());
app.use(express.static(__dirname + "/static"));
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
      description: getConfig("description")
    });
  }
);

app.get("/display", (_req, res) => {
  res.render("display");
});

io.on("connection", socket => {
  socket.on("code", msg => {
    console.log(
      `${getDateTime().date} ${
        getDateTime().time
      } [submission] code submitted: ${msg}`
    );
    io.emit("code", msg);
  });
  socket.on("displayed", msg => {
    console.log(
      `${getDateTime().date} ${
        getDateTime().time
      } [receipt] code displayed: ${msg}`
    );
    io.emit("displayed", msg);
  });
});

server.listen(port, () => console.log(`🍌 running on port ${port}!`));
