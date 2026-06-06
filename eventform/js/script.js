const form = document.querySelector("#event-form");
const eventDateInput = document.querySelector("#event-date");
const participantTypeSelect = document.querySelector("#participant-type");
const studentContainer = document.getElementById("student-number-container");
const guestContainer = document.getElementById("guest-type-container");
const studentInput = document.getElementById("student-number");
const guestInput = document.getElementById("guest-code");



// Listen for when the user selects a different dropdown option
function updateParticipantTypeField() {
  const value = participantTypeSelect.value;

  if (value === "student") {
    studentContainer.hidden = false;
    guestContainer.hidden = true;
  } else if (value === "guest") {
    studentContainer.hidden = true;
    guestContainer.hidden = false;
  }
  else {
    studentContainer.hidden = true;
    guestContainer.hidden = true;
  }
}

// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Sets time to midnight of the current day.

  // Appending local midnight time eliminates UTC translation errors
  const chosen = new Date(value + "T00:00:00");
  return chosen < today;
}


//
// Event Listners and form submission handling
//

// Monitor dropdown choices
participantTypeSelect.addEventListener("change", updateParticipantTypeField);


// Handle form dispatch
form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.participantType.value;
  const eventDate = form.eventDate.value;
  const studentID = form.studentNumber.value.trim();
  const guestCode = form.guestCode.value.trim();


  // Core Form Validations

  // Let the user know to select a participant type
  if (participantTypeSelect.value === "") {
    output.innerHTML = `
    <p class="error-message"> 
       <strong>Error:</strong> Please select a participant type.
    </p>
  `;
    participantTypeSelect.focus();
    return;
  }

  // Validate the student ID format
  if (participantTypeSelect.value === "student" && !/^\d{9}$/.test(studentID)) {
    output.innerHTML = `
    <p class="error-message">
       <strong>Error:</strong> Please enter a valid student ID (9 digits).
    </p>
  `;
    studentInput.focus();
    return;
  }

  // Validate the guest and access code value
  if (participantTypeSelect.value === "guest" && guestCode != "EVENT131") {
    output.innerHTML = `
    <p class="error-message">
       <strong>Error:</strong> Please enter a valid guest access code.
    </p>
  `;
    guestInput.focus();
    return;
  }

  // Validate the event date is not in the past
  if (isPastDate(eventDate)) {
    // Wrap the message in a paragraph with an error class, or use a strong semantic marker
    output.innerHTML = `
    <p class="error-message">
       <strong>Error:</strong> Event date not valid. Past dates are not allowed.
    </p>
  `;
    eventDateInput.focus();
    return;
  }

  // Generate a validation message
  output.innerHTML = `
  <h2>Ticket Created</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Ticket Type: ${type}</p>
    <p>Event Date: ${eventDate}</p>
  `;

  output.innerHTML += type === "student" ? `<p>Student ID: ${studentID}</p>` : `<p>Guest Access Code: ${guestCode}</p>`;

  form.reset();
  updateParticipantTypeField(); // Reset the participant type fields visibility after form reset

});
