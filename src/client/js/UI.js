import { getData } from "./data";

const UI_userLocation = document.getElementById("user-location");
const UI_userDate = document.getElementById("user-date");
const UI_submitBtn = document.querySelector(".input_button");
const UI_picture = document.querySelector(".output_image");
const UI_location = document.querySelector(".output_location");
const UI_icon = document.querySelector(".output_icon");
const UI_temp = document.querySelector(".output_temp");
const UI_desc = document.querySelector(".output_desc");

async function submitInfo(e) {
  e.preventDefault();

  const data = await getData({
    location: UI_userLocation.value,
    date: UI_userDate.value,
  });
  paintUI(data);
}

function paintUI(data) {
  UI_picture.src = data.picture;
  UI_location.textContent = UI_userLocation.value;
  UI_icon.src = data.icon;
  UI_temp.textContent = `${data.temp}°F`;
  UI_desc.textContent = data.desc;

  UI_userLocation.value = "";
  UI_userDate.value = "";
}

export { UI_submitBtn, submitInfo };
