import { userDataApiConfig } from "./constants";

export default class API {
  constructor() {
    this._baseUrl = userDataApiConfig.baseUrl;
    this._headers = userDataApiConfig.headers;
  }

  signUp({ name, avatar, email, password }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, avatar, email, password }),
    });
  }

  signIn({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    });
  }

  getUserData(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserData({ name, avatar, token }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        avatar,
      }),
    });
  }

  deleteClothingItem(itemID, token) {
    return this._request(`${this._baseUrl}/items/${itemID}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  postClothingItem(obj, token) {
    return this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: obj.name,
        imageUrl: obj.imageUrl,
        weather: obj.weather,
      }),
    });
  }

  getClothingItems() {
    return this._request(`${this._baseUrl}/items`, {
      method: "GET",
      headers: this._headers,
    });
  }

  likeClothingItem(itemID, token) {
    return this._request(`${this._baseUrl}/items/${itemID}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  unlikeClothingItem(itemID, token) {
    return this._request(`${this._baseUrl}/items/${itemID}/likes`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  _request(url, options) {
    return fetch(url, options).then(this._validateResults);
  }

  _validateResults(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}
