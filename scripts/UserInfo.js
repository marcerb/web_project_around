export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    // Prepara para manejar la información del usuario en la página
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Devuelve un objeto con información sobre el usuario.
  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      job: this._jobElement ? this._jobElement.textContent : "",
    };
  }

  // Toma los datos del nuevo usuario y los agrega en la página.
  setUserInfo({ name, job }) {
    if (this._nameElement && name !== undefined) {
      this._nameElement.textContent = name;
    }
    if (this._jobElement && job !== undefined) {
      this._jobElement.textContent = job;
    }
  }
}
