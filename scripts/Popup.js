export class Popup {
  constructor(popupSelector) {
    // Encuentra el elemento popup en el DOM
    this._popupElement = document.querySelector(popupSelector);
    // Vincula los métodos al contexto de la clase
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    // Verifica que el elemento existe
    if (!this._popupElement) return;

    // Aplica estilos según el tipo de popup (popup o modal)
    if (this._popupElement.classList.contains("popup")) {
      this._popupElement.classList.add("popup_opened");
    } else {
      this._popupElement.style.display = "flex";
      this._popupElement.classList.add("modal_opened");
    }
    // Activa el cierre con tecla Escape
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // Verifica que el elemento existe
    if (!this._popupElement) return;
    // Remueve estilos según el tipo de popup
    if (this._popupElement.classList.contains("popup")) {
      this._popupElement.classList.remove("popup_opened");
    } else {
      this._popupElement.style.display = "none";
      this._popupElement.classList.remove("modal_opened");
    }
    // Desactiva el listener de tecla Escape
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    // Verifica que el elemento exists
    if (!this._popupElement) return;

    // Busca y configura el botón de cierre
    const closeBtn =
      this._popupElement.querySelector(".modal__close") ||
      this._popupElement.querySelector(".popup-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Cierra haciendo clic fuera del contenido
    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }
}
