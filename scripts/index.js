import Card from "./Card.js";
<<<<<<< HEAD
import { FormValidator } from "./FormValidator.js";
import Api from "./Api.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

// CONFIGURACIÓN DEL API

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "9b95e5cc-a43f-42d7-9499-e75631b3f9d1",
    "Content-Type": "application/json",
  },
});

// CONFIGURACIÓN DE VALIDACIÓN

const validationConfig = {
  formSelector: ".form, .modal__form",
  inputSelector: ".form__input, .modal__input",
  submitButtonSelector: ".form__submit, .modal__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// VARIABLES GLOBALES
let userId;
let cardsSection;

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: "#profileName",
  jobSelector: "#profileText",
  avatarSelector: ".profile__avatar",
});

// Popup para mostrar imágenes
const imagePopup = new PopupWithImage("#imagePopup");

// Popup para editar perfil
const editProfilePopup = new PopupWithForm("#modal", (data) => {
  editProfilePopup.renderLoading(true, "Guardando...");

  api
    .setUserInfo({ name: data.name, about: data.about })
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log("Error al actualizar perfil:", err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});

// Popup para agregar tarjetas
const addCardPopup = new PopupWithForm("#modal-add", (data) => {
  addCardPopup.renderLoading(true, "Creando...");

  api
    .addCard({ name: data.name, link: data.link })
    .then((cardData) => {
      const card = createCard(cardData);
      cardsSection.addItem(card);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log("Error al agregar tarjeta:", err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

// Popup para actualizar avatar
const avatarPopup = new PopupWithForm("#avatarPopup", (data) => {
  avatarPopup.renderLoading(true, "Guardando...");

  api
    .setUserAvatar({ avatar: data.avatar })
    .then((result) => {
      userInfo.setAvatar(result.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log("Error al actualizar avatar:", err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

// Popup de confirmación para eliminar
const deleteConfirmPopup = new PopupWithConfirmation("#confirmDeletePopup");

// FUNCIONES DE VALIDACIÓN

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();

    // Almacena el validador para poder resetearlo después
    formElement.validator = validator;
  });
}

// FUNCIONES PRINCIPALES

// Función para crear una tarjeta
function createCard(cardData) {
  const card = new Card(cardData, userId, "#card-template", {
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },
    handleDeleteClick: (cardInstance) => {
      deleteConfirmPopup.setSubmitAction(() => {
        deleteConfirmPopup.renderLoading(true);

        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.removeCard();
            deleteConfirmPopup.close();
          })
          .catch((err) => {
            console.log("Error al eliminar tarjeta:", err);
          })
          .finally(() => {
            deleteConfirmPopup.renderLoading(false);
          });
      });
      deleteConfirmPopup.open();
    },
    handleLikeClick: (cardInstance) => {
      const likeMethod = cardInstance.isLiked()
        ? api.removeLike(cardInstance.getId())
        : api.addLike(cardInstance.getId());

      likeMethod
        .then((updatedCard) => {
          cardInstance.setLikes(updatedCard.isLiked);
        })
        .catch((err) => {
          console.log("Error al manejar like:", err);
        });
    },
  });

  return card.generateCard();
}

// EVENT LISTENERS

// Botón editar perfil
document.getElementById("openModal").addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  const nameInput = document.getElementById("modalInputName");
  const textInput = document.getElementById("modalInputText");

  nameInput.value = currentUserInfo.name;
  textInput.value = currentUserInfo.job;

  // Resetear validación del formulario
  const form = document.querySelector("#modal .modal__form");
  if (form && form.validator) {
    form.validator.resetValidation();
  }

  editProfilePopup.open();
});

// Botón agregar tarjeta
document.getElementById("addModal").addEventListener("click", () => {
  // Resetear validación del formulario
  const form = document.querySelector("#modal-add .modal__form");
  if (form && form.validator) {
    form.validator.resetValidation();
  }

  addCardPopup.open();
});

// Click en el avatar para cambiar
document.querySelector(".profile__avatar").addEventListener("click", () => {
  // Resetear validación del formulario
  const form = document.querySelector("#avatarPopup .form");
  if (form && form.validator) {
    form.validator.resetValidation();
  }

  avatarPopup.open();
});

// INICIALIZACIÓN

// Configura todos los event listeners de los popups
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
deleteConfirmPopup.setEventListeners();

// Habilita la validación en todos los formularios
enableValidation(validationConfig);

// Carga inicial de datos
api
  .getInitialData()
  .then(([userData, cardsData]) => {
    console.log("Datos del usuario:", userData);
    console.log("Datos de tarjetas:", cardsData);

    // Configura la información del usuario
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    // Configura la sección de tarjetas
    cardsSection = new Section(
      {
        items: cardsData,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          return cardElement;
        },
      },
      ".elements"
    );

    // Renderiza las tarjetas iniciales
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log("Error al cargar datos iniciales:", err);
  });
=======
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
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
