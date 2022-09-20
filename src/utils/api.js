class Api {
  constructor({ baseUrl}) {
    this._baseUrl = baseUrl;
  }

  getUsersData() {
    return fetch(
      `${this._baseUrl}/api/users`
    ).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка загрузки: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "http://localhost:8080",
});

export default api;