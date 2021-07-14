import "./styles/styles.scss";
import { UI_userDate, UI_submitBtn } from "./js/UI";
import { formHandler } from "./js/formHandler";

// Restrict date picker to exclude past dates
UI_userDate.setAttribute("min", new Date().toISOString().split("T")[0]);

// Handle submit button
UI_submitBtn.addEventListener("click", formHandler);
