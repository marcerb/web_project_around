import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // Prepara un popup que tiene formulario
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form =
      this._popupElement.querySelector(".modal__form") ||
      this._popupElement.querySelector(".form");
    this._inputList = Array.from(
      this._form
        ? this._form.querySelectorAll(".modal__input, .form__input")
        : []
    );
    this._submitButton = this._form
      ? this._form.querySelector(".modal__submit, .form__submit")
      : null;
  }

  _getInputValues() {
    // Se obtiene lo que escribió el usuario en cada campo
    const data = {};
    this._inputList.forEach((input) => {
      if (input.id === "modalInputName") {
        data.name = input.value;
      } else if (input.id === "modalInputText") {
        data.about = input.value;
      } else if (input.id === "modalInputTitle") {
        data.name = input.value;
      } else if (input.id === "modalInputUrl") {
        data.link = input.value;
      } else if (input.id === "avatarInput") {
        data.avatar = input.value;
      } else {
        data[input.name || input.id] = input.value;
      }
    });
    return data;
  }

  // Método para cambiar el texto del botón durante la carga
  renderLoading(isLoading, loadingText = "Guardando...") {
    if (!this._submitButton) return;

    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      // Restaura el texto original
      const originalText = this._submitButton.dataset.originalText || "Guardar";
      this._submitButton.textContent = originalText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  close() {
    // Cierra el popup y limpia el formulario
    super.close();
    if (this._form) {
      this._form.reset();
    }
    // Restaura el texto del botón
    this.renderLoading(false);
  }
}
