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

// Setup Server
const port = 8000;
const server = app.listen(port, function () {
  console.log(`Server running on local host: ${port}`);
});

// retreive API keys
dotenv.config();
const geonamesUsername = process.env.GEONAMES_USERNAME;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

// Get location data from user and use to retrieve weather and picture to send back
app.post("/getData", async function (req, res) {
  const { location, date } = req.body;
  const coordinates = await getCoordinates(location);
  const { temp, icon, desc } = await getWeather(coordinates);
  const picture = await getPicture(location);
  res.send({ temp, icon, desc, picture });
});

// Retrieves coordinates of a location
async function getCoordinates(location) {
  const loc = await fetch(
    `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUsername}`
  );
  const data = await loc.json();
  return { lat: data.geonames[0].lat, lng: data.geonames[0].lng };
}

// Retrieves weather for specific coordinates
async function getWeather(coordinates) {
  const location = await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${coordinates.lat}&lon=${coordinates.lng}&units=I&key=${weatherbitKey}`
  );
  // const location = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.lat}&lon=${location.lng}&unites=I&key=${key}`);
  const data = await location.json();
  const icon = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
  return {
    temp: data.data[0].temp,
    icon: icon,
    desc: data.data[0].weather.description,
  };
}

// Retrieves the URL of a picture of a location
async function getPicture(location) {
  const loc = await fetch(
    `https://pixabay.com/api/?key=${pixabayKey}&q=${location}&orientation=horizontal`
  );
  const data = await loc.json();
  return data.hits[0].webformatURL;
}
