const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
//app.use(express.static(__dirname + '/public'));

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
  axios.get("https://pure-temple-17860.herokuapp.com/todos").then(response => {
    if (response !== "ZERO_RESULTS") {
      res.render("todos.hbs", {
        pagetitle: "Todo list",
        todos: response.data.todos
      });
    }
  });
});

app.get("/todos/:text", (req, res)=>{
  axios.get(`https://pure-temple-17860.herokuapp.com/todos/${req.params.text}`).then(response =>{
    if(response !== "ZERO_RESULTS"){
      res.render("/view", {
        pagetitle:req.params.text,
        todos:response
      })
    }
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports.app = app;
