// Determines whether user selected date is within 7 days of current date, further into the future, or in the past
export function getDate(userDate) {
  if (userDate == "") {
    return "noDate";
  }
  const date = new Date(userDate);
  date.setDate(date.getDate() + 1);
  const today = new Date();
  const diffDays = Math.floor((date - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return "past";
  } else if (diffDays <= 7) {
    return "present";
  } else {
    return "future";
  }
}

// Retrieves weather information from the server
export async function getData(data) {
  const response = await fetch("http://localhost:8000/getData", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}
