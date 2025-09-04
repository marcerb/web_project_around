export default class Card {
<<<<<<< HEAD
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
=======
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // Busca el template en el DOM usando el selector CSS
    // Clona el elemento .card para crear una nueva instancia
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
<<<<<<< HEAD
    // Botón eliminar (solo si es dueño de la tarjeta)
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
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");

    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;

    this.setLikes(this._isLiked);
    this._setEventListeners();

=======
    // Botón eliminar
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._element.remove();
      });

    // Botón me gusta
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like--active");
      });

    // Click en imagen y abre popup
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._title, this._image);
      });
  }

  generateCard() {
    // Crea una nueva instancia de tarjeta usando el template
    this._element = this._getTemplate();

    // Obtiene referencias a los elementos de imagen y título
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    // Asigna los datos a los elementos correspondientes
    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    // Configura todos los event listener
    this._setEventListeners();

    // Retorna la tarjeta completa y funcional
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
    return this._element;
  }
}
