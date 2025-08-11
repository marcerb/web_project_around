export class Section {
  constructor({ items, renderer }, containerSelector) {
    // Prepara una sección para mostrar una lista de cosas
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Crea y muestra todos los elementos de la lista
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // Agrega un nuevo elemento al inicio
    this._container.prepend(element);
  }
}
