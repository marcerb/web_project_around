import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

// Configuración de validación
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// DOM Elements
const modal = document.getElementById("modal");
const openButton = document.getElementById("openModal");
const closeButton = modal.querySelector(".modal__close");
const form = modal.querySelector(".modal__form");
const inputName = document.getElementById("modalInputName");
const inputText = document.getElementById("modalInputText");
const submitButton = document.getElementById("modalSubmit");
const nameResult = document.getElementById("profileName");
const textResult = document.getElementById("profileText");

const modalAdd = document.getElementById("modal-add");
const addOpenButton = document.getElementById("addModal");
const addCloseButton = modalAdd.querySelector(".modal__close");
const addForm = modalAdd.querySelector(".modal__form");
const inputTitle = document.getElementById("modalInputTitle");
const inputUrl = document.getElementById("modalInputUrl");

const popup = document.getElementById("imagePopup");
const popupImage = document.getElementById("popupImage");
const popupTitle = document.getElementById("popupTitle");
const closePopup = document.querySelector(".popup-close");

const elementsContainer = document.querySelector(".elements");
const cardTemplateSelector = "#card-template";

// Instancias de validación
const editProfileValidator = new FormValidator(validationConfig, form);
const addCardValidator = new FormValidator(validationConfig, addForm);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Crear tarjeta con clase Card
function createCard({ name, link }) {
  const card = new Card({ name, link }, cardTemplateSelector);
  return card.generateCard();
}

// Tarjetas iniciales
const initialCards = [
  { name: "Valle de Yosemite", link: "./images/vanois_national.png" },
  { name: "Lago Louise", link: "./images/Lago_Louise.png" },
  { name: "Montañas Calvas", link: "./images/Montanas_calvas.png" },
  { name: "Latemar", link: "./images/Latemar.png" },
  { name: "Vanois National", link: "./images/vanois_national.png" },
  { name: "Lago di Braies", link: "./images/Lago_di_Braies.png" },
];

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  elementsContainer.appendChild(cardElement);
});

// Modal editar perfil
openButton.addEventListener("click", () => {
  inputName.value = nameResult.textContent;
  inputText.value = textResult.textContent;
  openModal(modal);
});

closeButton.addEventListener("click", () => closeModal(modal));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  nameResult.textContent = inputName.value;
  textResult.textContent = inputText.value;
  closeModal(modal);
});

// Modal agregar tarjeta
addOpenButton.addEventListener("click", () => {
  addForm.reset();
  openModal(modalAdd);
});

addCloseButton.addEventListener("click", () => closeModal(modalAdd));

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = inputTitle.value;
  const link = inputUrl.value;
  const cardElement = createCard({ name, link });
  elementsContainer.prepend(cardElement);
  closeModal(modalAdd);
});

// Cerrar imagen emergente
closePopup.addEventListener("click", () => closeModal(popup));
window.addEventListener("click", function (event) {
  if (event.target === modal) closeModal(modal);
  if (event.target === modalAdd) closeModal(modalAdd);
  if (event.target === popup) closeModal(popup);
});
