const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

  register(dataUser) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

  resetPass(dataUser) {
    return fetch(`${this._baseUrl}/forgot-password`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

  resetPassToken(dataUser, userId, token) {
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
  },
};

export const authApi = new Api(config);

// апи в виде функции, а не класса

export const registration = (data) => {
  return fetch(`${config.baseUrl}/signup`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(onResponse);
};

export const resetPass = (data) => {
  return fetch(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(onResponse);
};
