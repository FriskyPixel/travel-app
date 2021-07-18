var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

const app = express();
app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Retreive API keys
dotenv.config();
const geonamesUsername = process.env.GEONAMES_USERNAME;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

// Object to hold all data;
const weatherInfo = { temp: "", icon: "", desc: "", picture: "" };

// Get location and date data from user and use to retrieve weather info to send back
app.post("/getData", getData);

async function getData(req, res) {
  const { location, date } = req.body;
  try {
    const coordinates = await getCoordinates(location);
    await getWeather(coordinates, date);
    await getPicture(location);
    res.send(weatherInfo);
  } catch {
    res.send({ temp: "", icon: "", desc: "", picture: "" });
  }
}

// Retrieves coordinates of a location
async function getCoordinates(location) {
  const loc = await fetch(
    `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUsername}`
  );
  const data = await loc.json();
  return { lat: data.geonames[0].lat, lng: data.geonames[0].lng };
}

// Retrieves weather for specific coordinates
async function getWeather(coordinates, date) {
  let location;
  if (date == "present") {
    location = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${coordinates.lat}&lon=${coordinates.lng}&units=I&key=${weatherbitKey}`
    );
  } else if (date == "future") {
    location = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&unites=I&key=${weatherbitKey}`
    );
  }
  const data = await location.json();

  weatherInfo.temp = data.data[0].temp;
  weatherInfo.icon = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
  weatherInfo.desc = data.data[0].weather.description;
}

// Retrieves the URL of a picture of a location
async function getPicture(location) {
  const loc = await fetch(
    `https://pixabay.com/api/?key=${pixabayKey}&q=${location}&orientation=horizontal`
  );
  const data = await loc.json();
  weatherInfo.picture = data.hits[0].webformatURL;
}

module.exports = app;
