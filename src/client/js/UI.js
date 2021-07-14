const UI_userLocation = document.getElementById("user-location");
const UI_userDate = document.getElementById("user-date");
const UI_submitBtn = document.querySelector(".input_button");
const UI_error = document.querySelector(".input_error");
const UI_picture = document.querySelector(".output_image");
const UI_location = document.querySelector(".output_location");
const UI_icon = document.querySelector(".output_icon");
const UI_temp = document.querySelector(".output_temp");
const UI_desc = document.querySelector(".output_desc");

// Fills the UI with weather information
function paintUI(data) {
  UI_picture.src = data.picture;
  UI_location.textContent = UI_userLocation.value;
  UI_icon.src = data.icon;
  UI_temp.textContent = `${data.temp}°F`;
  UI_desc.textContent = data.desc;

  UI_userLocation.value = "";
  UI_userDate.value = "";
}

// Presents an error message if weather info can't be retreived
function paintError(err) {
  if (err == "noLocation") {
    UI_error.textContent = "Please choose a location.";
  } else if (err == "past") {
    UI_error.textContent = "Please choose a date not in the past.";
  } else if (err == "noDate") {
    UI_error.textContent = "Please choose a date.";
  } else if (err == "noData") {
    UI_error.textContent = "Could not find any information for that location.";
  }
  UI_error.classList.remove("hide");
}

// Removes any existing error message
function removeError() {
  UI_error.textContent = "";
  UI_error.classList.add("hide");
}

export {
  UI_userLocation,
  UI_userDate,
  UI_submitBtn,
  paintUI,
  paintError,
  removeError,
};
