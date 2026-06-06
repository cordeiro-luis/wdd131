
const form = document.querySelector("#fsy-form");
const travelRange = document.querySelector("#travel-range");
const notesContainer = document.querySelector("#notes-container");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const value = travelRange.value;

  // Show the travel notes on the form if they are choosing many campuses and require it

  if (value === "many") {
    notesContainer.hidden = false;

    // The video instructs to make the notes field required,
    // but this prevents to show a message on the output if the user
    // submits the form without a note. I decided to comment this line.

    // notes.required = true;

  } else {
    
    notesContainer.hidden = true;
    // notes.required = false;
  }

}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();


// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);
  return chosen < today;
}

function getSelectedCampuses() {
  //.from converts a NodeList into a real array, so then you can use .filter and .map
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  // Validate the input

  // Let the user know if they choose many campuses but didn't put a note that they need to add a note
  if (type === "many" && note === "") {
    output.textContent = "Please add a travel note.";
    return;
  }

  //Let the user know if they choose many campus but only had one campus selected that they need to choose at least two campuses
  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "Please select at least two campuses.";
    return;
  }

  // I swaped this validation to be the last one instead of the first (as in the video),
  // because if the user choosed many campuses but zero campuses are selected,
  // it would show a message to add "one campus" instead of at least two campuses;
  // which is a bit confusingm connsidering the select was "many"

  // Let the user know to select at least one campus
  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus.";
    return;
  }

  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a later date.";
    return;
  }

  output.innerHTML = `
  <h2>Preference Submitted</h2>
  <p>${firstName} ${lastName}</p>
  <p>Email: ${email}</p>
  <p>Availability: ${availableDate}</p>
  <p>Campuses: ${selectedCampuses.join(", ")}</p>
  <p>Preference Level: ${type}</p>
  `;

  form.reset();
  updateNotesField();
});
