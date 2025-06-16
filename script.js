let modal = document.getElementById("modal");
let openButton = document.getElementById("openModal");
let closeButton = document.querySelector(".modal__close");
let inputName = document.getElementById("modalInputName");
let inputText = document.getElementById("modalInputText");
let nameResult = document.getElementById("profileName");
let textResult = document.getElementById("profileText");
let form = document.querySelector(".modal__form");

// Abrir modal y cargar valores actuales
function openModal() {
  inputName.value = nameResult.textContent;
  inputText.value = textResult.textContent;
  modal.style.display = "block";
}

// Cerrar modal
function closeModal() {
  modal.style.display = "none";
}

// Evento para abrir y cerrar el modal
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// Evento para guardar cambios
form.addEventListener("submit", function (event) {
  event.preventDefault();
  nameResult.textContent = inputName.value;
  textResult.textContent = inputText.value;
  closeModal();
});

// Evitar cierre si clic dentro del modal
document
  .querySelector(".modal-content")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

// Cierre si se hace clic fuera del modal
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
