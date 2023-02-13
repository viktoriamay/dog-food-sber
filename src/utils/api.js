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

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, { headers: this._headers }).then(onResponce);
  }

  deleteProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, { headers: this._headers, method: "DELETE" }).then(onResponce);
  }  

  search(searchQuery) {
    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, { headers: this._headers }).then(onResponce);
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers, method: "PATCH", body: JSON.stringify(dataUser) }).then(onResponce);
  }

  changeLikeProduct(productId, isLike ) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, { headers: this._headers, method: isLike ? "DELETE" : "PUT"}).then(onResponce);
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