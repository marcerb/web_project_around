export class Section {
  constructor({ items, renderer }, containerSelector) {
<<<<<<< HEAD
=======
    // Prepara una sección para mostrar una lista de cosas
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Crea y muestra todos los elementos de la lista
    this._items.forEach((item) => {
<<<<<<< HEAD
      const element = this._renderer(item);
      this.addItem(element);
=======
      this._renderer(item);
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
    });
  }

  addItem(element) {
    // Agrega un nuevo elemento al inicio
    this._container.prepend(element);
  }
}
