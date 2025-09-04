import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup-form");
    this._submitButton = this._form
      ? this._form.querySelector(".popup-save")
      : null;
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  // Método para cambiar el texto del botón durante la carga
  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (!this._submitButton) return;

    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      // Restaura el texto original
      const originalText =
        this._submitButton.dataset.originalText || "Sí, eliminar";
      this._submitButton.textContent = originalText;
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (this._handleSubmit) {
          this._handleSubmit();
        }
      });
    }
  }

  close() {
    super.close();
    // Restaura el texto del botón
    this.renderLoading(false);
  }
}
