let modal = document.getElementById("modal");
let openButton = document.getElementById("openModal");
let closeButton = document.querySelector(".modal__close");
let inputName = document.getElementById("modalInputName");
let inputText = document.getElementById("modalInputText");
let nameResult = document.getElementById("profileName");
let textResult = document.getElementById("profileText");
let form = document.querySelector(".modal__form");
let submitButton = document.getElementById("modalSubmit");

let modalAdd = document.getElementById("modal-add");
let addOpenButton = document.getElementById("addModal");
let addCloseButton = modalAdd.querySelector(".modal__close");
let inputTitle = document.getElementById("modalInputTitle");
let inputUrl = document.getElementById("modalInputUrl");
let addForm = modalAdd.querySelector(".modal__form");

let popup = document.getElementById("imagePopup");
let popupImage = document.getElementById("popupImage");
let popupTitle = document.getElementById("popupTitle");
let closePopup = document.querySelector(".popup-close");

let elementsContainer = document.querySelector(".elements");

const initialCards = [
  { title: "Valle de Yosemite", imageUrl: "./images/vanois_national.png" },
  { title: "Lago Louise", imageUrl: "./images/Lago_Louise.png" },
  { title: "Montañas Calvas", imageUrl: "./images/Montanas_calvas.png" },
  { title: "Latemar", imageUrl: "./images/Latemar.png" },
  { title: "Vanois National", imageUrl: "./images/vanois_national.png" },
  { title: "Lago di Braies", imageUrl: "./images/Lago_di_Braies.png" },
];

// ======================
// FUNCIÓN PARA CERRAR CON TECLA ESC
// ======================

function handleEscapeKey(event) {
  // Verifica si la tecla presionada es Escape
  if (event.key === "Escape") {
    // Cerrar modal de editar perfil si está abierto
    if (modal.style.display === "block") {
      closeModal();
    }
    // Cerrar modal de crear tarjeta si está abierto
    if (modalAdd.style.display === "block") {
      closeModalAdd();
    }
    // Cerrar popup de imagen si está abierto
    if (popup.classList.contains("popup_opened")) {
      popup.classList.remove("popup_opened");
    }
  }
}
document.addEventListener("keydown", handleEscapeKey);

// ======================
// MODAL - EDITAR PERFIL
// ======================

//Abrir modal:
function openModal() {
  inputName.value = nameResult.textContent;
  inputText.value = textResult.textContent;
  modal.style.display = "block";

  // Limpiar errores al abrir el modal
  const config = {
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
    inactiveButtonClass: "modal__submit_disabled",
  };
  hideInputError(form, inputName, config);
  hideInputError(form, inputText, config);

  // Verificar estado del botón al abrir
  const inputList = Array.from(form.querySelectorAll(".modal__input"));
  toggleButtonState(inputList, submitButton, config);
}

//Cerrar modal:
function closeModal() {
  modal.style.display = "none";
}

// Evento para abrir y cerrar el modal:
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// Evento para guardar cambios:
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Solo ejecutar si el botón no está deshabilitado
  if (!submitButton.disabled) {
    nameResult.textContent = inputName.value;
    textResult.textContent = inputText.value;
    closeModal();
  }
});

// Evitar cierre si se hace clic dentro del modal:
document
  .querySelector(".modal__content")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

// Cierre si se hace clic fuera del modal:
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// ======================
// FUNCION CREAR UNA TARJETA
// ======================

function createNewCard(title, imageUrl) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  cardElement.innerHTML = `
    <img
      src="./images/Trash_svg.png"
      alt="Icono de eliminar tarjeta"
      class="card__delete"
    />
    <img
      src="${imageUrl}"
      alt="${title}"
      class="card__image"
    />
    <div class="card__description">
      <h2 class="card__title">${title}</h2>
      <img
        src="./images/Vector_Corazon.png"
        alt="Icono de Corazón"
        class="card__like"
      />
    </div>
  `;
  // Botón "Me gusta"
  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener("click", function () {
    this.classList.toggle("card__like--active");
  });

  // Eliminar una tarjeta
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  // Abrir la ventana emergente de las imágenes
  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", function () {
    popup.classList.add("popup_opened");
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupTitle.textContent = image.alt;
  });

  return cardElement;
}

// ======================
// TARJETAS PREDEFINIDAS:
// ======================

initialCards.forEach((card) => {
  const cardElement = createNewCard(card.title, card.imageUrl);
  elementsContainer.appendChild(cardElement);
});

// ======================
// MODAL - AÑADIR TARJETA
// ======================

//Abrir modal:
function openModalAdd() {
  modalAdd.style.display = "block";
}

//Cerrar modal:
function closeModalAdd() {
  modalAdd.style.display = "none";
}

// Evento para abrir y cerrar el modal:
addOpenButton.addEventListener("click", openModalAdd);
addCloseButton.addEventListener("click", closeModalAdd);

// Evento para guardar cambios:
addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = inputTitle.value.trim();
  const imageUrl = inputUrl.value.trim();

  if (title && imageUrl) {
    const newCard = createNewCard(title, imageUrl);
    elementsContainer.prepend(newCard);

    inputTitle.value = ""; //Limpiar campos
    inputUrl.value = ""; //Limpiar campos
    closeModalAdd();

    console.log("Tarjeta creada");
  } else {
    alert("Completa los campos");
  }
});

modalAdd
  .querySelector(".modal__content")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

window.addEventListener("click", function (event) {
  if (event.target === modalAdd) {
    closeModalAdd();
  }
});

// ======================
// CERRAR VENTANA EMERGENTE DE IMAGEN
// ======================

closePopup.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

window.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.classList.remove("popup_opened");
  }
});

// Evitar que se cierre al hacer clic dentro del contenido:
document
  .querySelector(".popup-content")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
