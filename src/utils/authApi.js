const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, { headers: this._headers, method: "POST", body: JSON.stringify(dataUser) }).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
  }
}

export const authApi = new Api(config);

// апи в виде функции, а не класса

export const register = (data) => {
  return fetch(`${config.baseUrl}/signup`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(onResponse);
}