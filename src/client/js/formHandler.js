import {
  UI_userLocation,
  UI_userDate,
  paintUI,
  paintError,
  removeError,
} from "./UI";
import { getDate, getData } from "./data";

export async function formHandler(e) {
  e.preventDefault();
  removeError();

  // Error if no location entered
  if (UI_userLocation.value == "") {
    paintError("noLocation");
    return;
  }

  // Retreive weather info if date selected is from today or onward
  const date = getDate(UI_userDate.value);
  if (date == "present" || date == "future") {
    const data = await getData({
      location: UI_userLocation.value,
      date: date,
    });
    data.temp == "" ? paintError("noData") : paintUI(data); // Error if no acceptable data
  } else {
    paintError(date); // Error if no acceptable date
  }
}
