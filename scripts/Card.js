export class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name; // Título de la tarjeta
    this._link = link; // Enlace de la imagen
    this._templateSelector = templateSelector; // templateSelector le dice al código dónde encontrar la plantilla HTML para clonar.
  }

  // Clona el template de la tarjeta del HTML
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  // Agrega 3 eventos a la tarjeta
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => this._handlePreview());
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._deleteButton.addEventListener("click", () => this._deleteCard());
  }

  // Evento: abrir vista previa de la imagen
  _handlePreview() {
    const imagePopup = document.querySelector("#imagePopup");
    const popupImage = document.querySelector("#popupImage");
    const popupTitle = document.querySelector("#popupTitle");

    // Configurar imagen y título
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;

    // Mostrar modal
    imagePopup.classList.add("popup_opened");

    // Agregar event listener para cerrar
    this._setCloseListener(imagePopup);
  }
  // Configura el evento para cerrar el modal
  _setCloseListener(imagePopup) {
    const closeButton = imagePopup.querySelector(".popup-close");

    // Función para cerrar el modal
    const closeModal = () => {
      imagePopup.classList.remove("popup_opened");
    };

    // Cerrar con botón X
    closeButton.removeEventListener("click", closeModal);
    closeButton.addEventListener("click", closeModal);

    // Cerrar al hacer clic fuera del contenido
    const closeOnOverlay = (e) => {
      if (e.target === imagePopup) {
        closeModal();
        imagePopup.removeEventListener("click", closeOnOverlay);
      }
    };
    imagePopup.addEventListener("click", closeOnOverlay);

    // Cerrar con tecla Escape
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", closeOnEscape);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
  }

  // Evento: toggle de "me gusta"
  _toggleLike() {
    this._likeButton.classList.toggle("card__like--active");
  }

  // Evento: eliminar tarjeta del DOM
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Devuelve una tarjeta lista para insertar en el DOM
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");
    this._setEventListeners();
    return this._element;
  }
}
