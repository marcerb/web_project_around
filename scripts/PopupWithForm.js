import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // Prepara un popup que tiene formulario
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = Array.from(
      this._form ? this._form.querySelectorAll(".modal__input") : []
    );
  }

  _getInputValues() {
    // Obtiene lo que escribió el usuario en cada campo
    const data = {};
    this._inputList.forEach((input) => {
      if (input.id === "modalInputName") {
        data.name = input.value;
      } else if (input.id === "modalInputText") {
        data.about = input.value;
      } else if (input.id === "modalInputTitle") {
        data.title = input.value;
      } else if (input.id === "modalInputUrl") {
        data.link = input.value;
      } else {
        data[input.name || input.id] = input.value;
      }
    });
    return data;
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
  }
}
