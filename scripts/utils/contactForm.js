//DOM element selector
const body = document.body;
const main = document.getElementById("main")
const modal = document.getElementById("contact_modal")
const form = document.querySelector("form")
const formData = document.querySelectorAll(".formData")
const openBtn = document.getElementById("open_btn")
const closeIcon = document.getElementById("close_icon")
const submitBtn = document.getElementById("submit_btn")

// Form Elements
const firstName = document.getElementById("first")
const lastName = document.getElementById("last")
const email = document.getElementById("email")
const message = document.querySelector("textarea")

// Regex
const nameRegExp = /[^0-9<>()\[\]\\.,;:\s@"][A-Za-z]{1,}/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/

//Event listener
closeIcon.addEventListener("keydown", keyboardCloseModal); 
//Open contact modal
function displayModal() {
    main.setAttribute('aria-hidden', 'true');
	  modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    closeIcon.focus();
}
//Close contact modal
function closeModal() {
    main.setAttribute('aria-hidden', 'false');
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    openBtn.focus();
}
//Keyboard closing contact modal
function keyboardCloseModal(event) {
    if (event.key === "Escape") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        closeModal();
      }
}

// verify firstname
formData[0].addEventListener("input", firstNameIsValid); // verify entry on type
function firstNameIsValid() {
  if (!firstName.value.match(nameRegExp)) {
    formData[0].setAttribute("data-error-visible", "true");
    formData[0].setAttribute("data-error", "Entrez un prénom valide.");
    return false;
  } else {
    formData[0].setAttribute("data-error-visible", "false");
    formData[0].setAttribute("data-error", "");
    return true;
  }
}

// verify lastname
formData[1].addEventListener("input", lastNameIsValid); // verify entry on type
function lastNameIsValid() {
  if (!lastName.value.match(nameRegExp)) {
    formData[1].setAttribute("data-error-visible", "true");
    formData[1].setAttribute("data-error", "Entrez un nom valide.");
    return false;
  } else {
    formData[1].setAttribute("data-error-visible", "false");
    formData[1].setAttribute("data-error", "");
    return true;
  }
}

// verify email
formData[2].addEventListener("input", emailIsValid); // verify entry on type
function emailIsValid() {
  if (!email.value.match(emailRegExp)) {
    formData[2].setAttribute("data-error-visible", "true");
    formData[2].setAttribute("data-error", "Entrez un email valide.");
    return false;
  } else {
    formData[2].setAttribute("data-error-visible", "false");
    formData[2].setAttribute("data-error", "");
    return true;
  }
}

// verify email
formData[3].addEventListener("input", messageIsValid); // verify entry on type
function messageIsValid() {
  if (message.value == "") {
    formData[3].setAttribute("data-error-visible", "true");
    formData[3].setAttribute("data-error", "Votre message ne peut-être vide.");
    return false;
  } else {
    formData[3].setAttribute("data-error-visible", "false");
    formData[3].setAttribute("data-error", "");
    return true;
  }
}

// validate modal form
submitBtn.addEventListener("click", validate);

// validate contact form
function validate(e) {
  // prevent closing modal & erasing user input data
  e.preventDefault();
  if (
  firstNameIsValid() &&
  lastNameIsValid() &&
  emailIsValid() &&
  messageIsValid()
  ) { 
    console.log(
        "Prénom:"+firstName.value+
        ", Nom:"+lastName.value+
        ", Email:"+email.value+
        ", Message:"+message.value);
    form.reset();
  } 
  else {
    firstNameIsValid(),
    lastNameIsValid(),
    emailIsValid(),
    messageIsValid()
  }
}
