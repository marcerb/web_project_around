export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    // Seleccionamos elementos en el DOM
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Devuelve la info del usuario (nombre, about, avatar)
  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      job: this._jobElement ? this._jobElement.textContent : "",
      avatar: this._avatarElement ? this._avatarElement.src : "",
    };
  }

  // Actualiza la info del usuario en la página
  setUserInfo({ name, job, avatar }) {
    if (this._nameElement && name !== undefined) {
      this._nameElement.textContent = name;
    }
    if (this._jobElement && job !== undefined) {
      this._jobElement.textContent = job;
    }
    if (this._avatarElement && avatar !== undefined) {
      this._avatarElement.src = avatar;
    }
  }

  // Método cambiar solo avatar
  setAvatar(avatar) {
    if (this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}
