export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    { handleCardClick, handleDeleteClick, handleLikeClick }
  ) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes || []; // Guarda los likes, si no existen usa array vacío
    this._isLiked = data.isLiked || false;
    this._id = data._id;
    this._ownerId = data.owner?._id || data.owner;
    this._userId = userId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // Saber si el usuario actual dio like
  isLiked() {
    return this._isLiked;
  }

  // Obtener ID de la tarjeta
  getId() {
    return this._id;
  }

  // Actualizar visualmente los likes
  setLikes(isLiked) {
    this._isLiked = isLiked;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like--active");
    } else {
      this._likeButton.classList.remove("card__like--active");
    }
  }

  _getTemplate() {
    // Busca el template en el DOM usando el selector CSS
    // Clona el elemento .card para crear una nueva instancia
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Botón eliminar (si es dueño de la tarjeta)
    if (this._ownerId === this._userId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    } else {
      this._deleteButton.style.display = "none";
    }

    // Botón me gusta
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    // Click en imagen
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._title, this._image);
    });
  }

  // Método para eliminar la tarjeta del DOM
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    // Crea una nueva instancia de tarjeta usando el template
    this._element = this._getTemplate();

    // Obtiene referencias a los elementos de imagen y título
    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");

    // Asigna los datos a los elementos correspondientes
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;

    // Configura el estado inicial de los likes
    this.setLikes(this._isLiked);

    // Configura todos los event listeners
    this._setEventListeners();

    // Retorna la tarjeta completa y funcional
    return this._element;
  }
}
