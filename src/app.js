const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express Config
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebar and view engine
const publicDirectoryPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vince",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Fullstack",
    name: "React+NodeJS",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Centre",
    name: "FullStack",
  });
});

app.get("/weathers", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  if (req.query.address) {
    return res.send({
      forecast: "Hot as hell",
      location: "HCM",
      address: req.query.address,
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help not found",
    name: "Vince Nguyen",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Vince Nguyen",
  });
});

app.listen(3000, () => {
  console.log("listening");
});
