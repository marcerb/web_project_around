export class UserInfo {
<<<<<<< HEAD
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    // Seleccionamos elementos en el DOM
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Devuelve la info del usuario (nombre, about, avatar)
=======
  constructor({ nameSelector, jobSelector }) {
    // Prepara para manejar la información del usuario en la página
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Devuelve un objeto con información sobre el usuario.
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      job: this._jobElement ? this._jobElement.textContent : "",
<<<<<<< HEAD
      avatar: this._avatarElement ? this._avatarElement.src : "",
    };
  }

  // Actualiza la info del usuario en la página
  setUserInfo({ name, job, avatar }) {
=======
    };
  }

  // Toma los datos del nuevo usuario y los agrega en la página.
  setUserInfo({ name, job }) {
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
    if (this._nameElement && name !== undefined) {
      this._nameElement.textContent = name;
    }
    if (this._jobElement && job !== undefined) {
      this._jobElement.textContent = job;
    }
<<<<<<< HEAD
    if (this._avatarElement && avatar !== undefined) {
      this._avatarElement.src = avatar;
    }
  }
  // Método cambiar solo avatar
  setAvatar(avatar) {
    if (this._avatarElement) {
      this._avatarElement.src = avatar;
    }
=======
>>>>>>> 33cec8ab6844eede6d70fa5d2a18502b48456505
  }
}
