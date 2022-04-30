//DOM element selector
const body = document.body;
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const openBtn = document.querySelector("contact_button");
const closeBtn = document.getElementById("close_modal-icon");
//Event listener
closeBtn.addEventListener("keydown", keyboardCloseModal); 
//Open contact modal
function displayModal() {
    body.style.overflow = "hidden";
    main.setAttribute('aria-hidden', 'true');
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
}
//Close contact modal
function closeModal() {
    body.style.overflow = "scroll";
    main.setAttribute('aria-hidden', 'true');
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
