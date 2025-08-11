import Card from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";

// Configuración de validación
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: "#profileName",
  jobSelector: "#profileText",
});

// Instancia de PopupWithImage
const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

// Función para crear tarjetas
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

// Instancia de Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

// Renderizar tarjetas iniciales
cardSection.renderItems();

// Crear validadores para cada formulario
const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#modal .modal__form")
);

const addFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#modal-add .modal__form")
);

// Habilitar validación
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Crear popup para editar perfil
const editProfilePopup = new PopupWithForm("#modal", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.about,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Crear popup para agregar lugar
const addPlacePopup = new PopupWithForm("#modal-add", (data) => {
  const cardElement = createCard({ name: data.title, link: data.link });
  cardSection.addItem(cardElement);
  addPlacePopup.close();
});
addPlacePopup.setEventListeners();

// Event listeners para abrir modales
document.addEventListener("DOMContentLoaded", () => {
  // Botón editar perfil
  const editButton = document.querySelector("#openModal");
  if (editButton) {
    editButton.addEventListener("click", () => {
      // Pre-llenar formulario
      const currentUserInfo = userInfo.getUserInfo();
      const nameInput = document.querySelector("#modalInputName");
      const aboutInput = document.querySelector("#modalInputText");

      if (nameInput) nameInput.value = currentUserInfo.name;
      if (aboutInput) aboutInput.value = currentUserInfo.job;

      // Resetear validación antes de abrir
      editFormValidator.resetValidation();
      editProfilePopup.open();

      setTimeout(() => {
        editFormValidator._toggleButtonState();
      }, 0);
    });
  }

  // Botón agregar lugar
  const addButton = document.querySelector("#addModal");
  if (addButton) {
    addButton.addEventListener("click", () => {
      // Resetear validación antes de abrir
      addFormValidator.resetValidation();
      addPlacePopup.open();
    });
  }
});
