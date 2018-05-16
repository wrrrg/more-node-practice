const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const PORT = process.env.PORT || 3500;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// middleware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} ${res.statusCode}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to log to server.log");
    }
  });
  next();
});

// middleware for page maintenance
// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("index.hbs", {
    pageTitle: "Home Page",
    message: {
      welcome: "This is the welcome message!"
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Me",
    name: "Bill"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Project Page",
    links: "Links will go here I guess"
  });
});

app.get("/bad", (req, res) => {
  res.json({
    errorMessage: "You fucked up"
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
