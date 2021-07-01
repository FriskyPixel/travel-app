/* Global Variables */
const baseURL = ['https://api.openweathermap.org/data/2.5/weather?zip=', ',&us&appid=', '&units=imperial'];
const apiKey = '54d7dc4c7e490c55ecf1d1c66e2cb51a';

let d = new Date();
let currentDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

const UI_entry = document.querySelector('.holder.entry');
const UI_generateBtn = document.getElementById('generate');
const UI_date = document.getElementById('date');
const UI_temp = document.getElementById('temp');
const UI_content = document.getElementById('content');


// 'Generate' button event listener
UI_generateBtn.addEventListener('click', (e) => {
  e.preventDefault;
 
  let UI_zip = document.getElementById('zip').value;
  let UI_feeling = document.getElementById('feelings').value;

  getWeather(UI_zip) // retrieve weather
    .then((weather) => postData('/send', {date: currentDate, feeling: UI_feeling, temp: weather.main.temp})) // send weather info to the server
    .then(() => updateUI()); // retrieve the server weather info and update the UI
});



// Get weather info from Open Weather Map
async function getWeather(zip) {
  const weather = await fetch(`${baseURL[0]}${zip}${baseURL[1]}${apiKey}${baseURL[2]}`);
  const data = await weather.json();
  return data;
}


// Retrieve weather info from the server and update the UI with it
async function updateUI() {
  const data = await getData('/receive');

  UI_date.innerHTML = `Date: ${data.date}`;
  UI_temp.innerHTML = `Temperature: ${data.temp}°F`;
  UI_content.innerHTML = `How I'm Feeling: ${data.feeling}`;
  UI_entry.classList.remove('hide');
}


// Sends data to the server asynchronously
async function postData(url = '', data = {date: '', feeling: '', temp: ''}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)       
  });

  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log("error", error);
  }  
}


// Retreives data from the server asynchronously
async function getData(url = '') {
  const response = await fetch(url);

  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log("error", error);
  }  
}