import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // Prepara un popup para mostrar imágenes grandes
    super(popupSelector);
    this._image = this._popupElement.querySelector("#popupImage");
    this._title = this._popupElement.querySelector("#popupTitle");
  }

  open(name, link) {
    // Muestra la imagen y título que le pase
    if (this._image) {
      this._image.src = link;
      this._image.alt = name;
    }
    if (this._title) {
      this._title.textContent = name;
    }
    super.open();
  }
}
