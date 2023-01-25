const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProductsList() {
    return fetch(`${this._baseUrl}/products`, { headers: this._headers }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(onResponce);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2QxYmM1ODU5Yjk4YjAzOGY3N2FiZTQiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzQ2ODk3MTYsImV4cCI6MTcwNjIyNTcxNn0.YKS2a1JKrwMQCKYO0JczXp5De0YebqHAh8AfpcrJKDE'
  }
}

const api = new Api(config);

export default api;