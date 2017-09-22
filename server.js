const express = require("express");
const hbs = require("hbs");
var https = require("https");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

hbs.registerHelper("ifbool", value => {
  if (_.isBoolean(value)) {
    return true;
  }
  return false;
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pagetitle: "Manage your todo list"
  });
});

app.get("/todos", (req, res) => {
  res.render("todos.hbs", {
    pagetitle: "Todo list",
    todos: [
      {
        _id: "59c2137d36ac4900129f556c",
        text: "from postmane",
        __v: 0,
        completedAt: null,
        completed: true
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports.app = app;
