export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    return this._element;
  }
}
